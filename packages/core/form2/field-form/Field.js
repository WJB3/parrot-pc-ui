import toChildrenArray from 'rc-util/lib/Children/toArray';
import warning from 'rc-util/lib/warning';
import * as React from 'react';
import {
  FieldEntity,
  FormInstance,
  InternalNamePath,
  Meta,
  NamePath,
  NotifyInfo,
  Rule,
  Store,
  ValidateOptions,
  InternalFormInstance,
  RuleObject,
  StoreValue,
  EventArgs,
} from './interface';
import FieldContext, { HOOK_MARK } from './FieldContext';
import { toArray } from './utils/typeUtil';
import { validateRules } from './utils/validateUtil';
import {
  containsNamePath,
  defaultGetValueFromEvent,
  getNamePath,
  getValue,
} from './utils/valueUtil';



function requireUpdate(
  shouldUpdate,
  prev,
  next,
  prevValue,
  nextValue,
  info:,
) {
  if (typeof shouldUpdate === 'function') {
    return shouldUpdate(prev, next, 'source' in info ? { source: info.source } : {});
  }
  return prevValue !== nextValue;
}





// We use Class instead of Hooks here since it will cost much code by using Hooks.
class Field extends React.Component {
  static contextType = FieldContext;

  static defaultProps = {
    trigger: 'onChange',
    valuePropName: 'value',
  };

  context;

  state = {
    resetCount: 0,
  };

  cancelRegisterFunc = null;

  destroy = false;

  /**
   * Follow state should not management in State since it will async update by React.
   * This makes first render of form can not get correct state value.
   */
  touched = false;

  /** Mark when touched & validated. Currently only used for `dependencies` */
  dirty = false;

  validatePromise = null;

  prevValidating;

  errors = [];

  // ============================== Subscriptions ==============================
  componentDidMount() {
    const { shouldUpdate } = this.props;
    const { getInternalHooks } = this.context;
    const { registerField } = getInternalHooks(HOOK_MARK);
    this.cancelRegisterFunc = registerField(this);
 
    if (shouldUpdate === true) {
      this.reRender();
    }
  }

  componentWillUnmount() {
    this.cancelRegister();
    this.destroy = true;
  }

  cancelRegister = () => {
    const { preserve, isListField } = this.props;

    if (this.cancelRegisterFunc) {
      this.cancelRegisterFunc(isListField, preserve);
    }
    this.cancelRegisterFunc = null;
  };

  // ================================== Utils ==================================
  getNamePath = () => {
    const { name } = this.props;
    const { prefixName = [] } = this.context;

    return name !== undefined ? [...prefixName, ...name] : [];
  };

  getRules = () => {
    const { rules = [] } = this.props;

    return rules.map(
      (rule) => {
        if (typeof rule === 'function') {
          return rule(this.context);
        }
        return rule;
      },
    );
  };

  reRender() {
    if (this.destroy) return;
    this.forceUpdate();
  }

  refresh = () => {
    if (this.destroy) return;

    /**
     * Clean up current node.
     */
    this.setState(({ resetCount }) => ({
      resetCount: resetCount + 1,
    }));
  };

  // ========================= Field Entity Interfaces =========================
  // Trigger by store update. Check if need update the component
  onStoreChange = (prevStore, namePathList, info) => {
    const { shouldUpdate, dependencies = [], onReset } = this.props;
    const { store } = info;
    const namePath = this.getNamePath();
    const prevValue = this.getValue(prevStore);
    const curValue = this.getValue(store);

    const namePathMatch = namePathList && containsNamePath(namePathList, namePath);

    // `setFieldsValue` is a quick access to update related status
    if (info.type === 'valueUpdate' && info.source === 'external' && prevValue !== curValue) {
      this.touched = true;
      this.dirty = true;
      this.validatePromise = null;
      this.errors = [];
    }

    switch (info.type) {
      case 'reset':
        if (!namePathList || namePathMatch) {
          // Clean up state
          this.touched = false;
          this.dirty = false;
          this.validatePromise = null;
          this.errors = [];

          if (onReset) {
            onReset();
          }

          this.refresh();
          return;
        }
        break;

      case 'setField': {
        if (namePathMatch) {
          const { data } = info;
          if ('touched' in data) {
            this.touched = data.touched;
          }
          if ('validating' in data && !('originRCField' in data)) {
            this.validatePromise = data.validating ? Promise.resolve([]) : null;
          }
          if ('errors' in data) {
            this.errors = data.errors || [];
          }
          this.dirty = true;

          this.reRender();
          return;
        }

        // Handle update by `setField` with `shouldUpdate`
        if (
          shouldUpdate &&
          !namePath.length &&
          requireUpdate(shouldUpdate, prevStore, store, prevValue, curValue, info)
        ) {
          this.reRender();
          return;
        }
        break;
      }

      case 'dependenciesUpdate': {
       
        const dependencyList = dependencies.map(getNamePath);
        // No need for `namePathMath` check and `shouldUpdate` check, since `valueUpdate` will be
        // emitted earlier and they will work there
        // If set it may cause unnecessary twice rerendering
        if (dependencyList.some(dependency => containsNamePath(info.relatedFields, dependency))) {
          this.reRender();
          return;
        }
        break;
      }

      default:
        // 1. If `namePath` exists in `namePathList`, means it's related value and should update
        //      For example <List name="list"><Field name={['list', 0]}></List>
        //      If `namePathList` is [['list']] (List value update), Field should be updated
        //      If `namePathList` is [['list', 0]] (Field value update), List shouldn't be updated
        // 2.
        //   2.1 If `dependencies` is set, `name` is not set and `shouldUpdate` is not set,
        //       don't use `shouldUpdate`. `dependencies` is view as a shortcut if `shouldUpdate`
        //       is not provided
        //   2.2 If `shouldUpdate` provided, use customize logic to update the field
        //       else to check if value changed
        if (
          namePathMatch ||
          ((!dependencies.length || namePath.length || shouldUpdate) &&
            requireUpdate(shouldUpdate, prevStore, store, prevValue, curValue, info))
        ) {
          this.reRender();
          return;
        }
        break;
    }

    if (shouldUpdate === true) {
      this.reRender();
    }
  };

  validateRules = (options) => {
    const { validateFirst = false, messageVariables } = this.props;
    const { triggerName } = (options || {});
    const namePath = this.getNamePath();

    let filteredRules = this.getRules();
    if (triggerName) {
      filteredRules = filteredRules.filter((rule) => {
        const { validateTrigger } = rule;
        if (!validateTrigger) {
          return true;
        }
        const triggerList = toArray(validateTrigger);
        return triggerList.includes(triggerName);
      });
    }

    const promise = validateRules(
      namePath,
      this.getValue(),
      filteredRules,
      options,
      validateFirst,
      messageVariables,
    );
    this.dirty = true;
    this.validatePromise = promise;
    this.errors = [];

    promise
      .catch(e => e)
      .then((errors = []) => {
        if (this.validatePromise === promise) {
          this.validatePromise = null;
          this.errors = errors;
          this.reRender();
        }
      });

    return promise;
  };

  isFieldValidating = () => !!this.validatePromise;

  isFieldTouched = () => this.touched;

  isFieldDirty = () => this.dirty;

  getErrors = () => this.errors;

  // ============================= Child Component =============================
  getMeta = () => {
    // Make error & validating in cache to save perf
    this.prevValidating = this.isFieldValidating();

    const meta = {
      touched: this.isFieldTouched(),
      validating: this.prevValidating,
      errors: this.errors,
      name: this.getNamePath(),
    };

    return meta;
  };

  // Only return validate child node. If invalidate, will do nothing about field.
  getOnlyChild = (
    children
  ) => {
    // Support render props
    if (typeof children === 'function') {
      const meta = this.getMeta();

      return {
        ...this.getOnlyChild(children(this.getControlled(), meta, this.context)),
        isFunction: true,
      };
    }

    // Filed element only
    const childList = toChildrenArray(children);
    if (childList.length !== 1 || !React.isValidElement(childList[0])) {
      return { child: childList, isFunction: false };
    }

    return { child: childList[0], isFunction: false };
  };

  // ============================== Field Control ==============================
  getValue = (store) => {
    const { getFieldsValue } = this.context;
    const namePath = this.getNamePath();
    return getValue(store || getFieldsValue(true), namePath);
  };

  getControlled = (childProps = {}) => {
    const {
      trigger,
      validateTrigger,
      getValueFromEvent,
      normalize,
      valuePropName,
      getValueProps,
    } = this.props;

    const mergedValidateTrigger =
      validateTrigger !== undefined ? validateTrigger : this.context.validateTrigger;

    const namePath = this.getNamePath();
    const { getInternalHooks, getFieldsValue } = this.context;
    const { dispatch } = getInternalHooks(HOOK_MARK);
    const value = this.getValue();
    const mergedGetValueProps = getValueProps || ((val) => ({ [valuePropName]: val }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originTriggerFunc = childProps[trigger];

    const control = {
      ...childProps,
      ...mergedGetValueProps(value),
    };

    // Add trigger
    control[trigger] = (...args) => {
      // Mark as touched
      this.touched = true;
      this.dirty = true;

      let newValue;
      if (getValueFromEvent) {
        newValue = getValueFromEvent(...args);
      } else {
        newValue = defaultGetValueFromEvent(valuePropName, ...args);
      }

      if (normalize) {
        newValue = normalize(newValue, value, getFieldsValue(true));
      }

      dispatch({
        type: 'updateValue',
        namePath,
        value: newValue,
      });

      if (originTriggerFunc) {
        originTriggerFunc(...args);
      }
    };

    // Add validateTrigger
    const validateTriggerList = toArray(mergedValidateTrigger || []);

    validateTriggerList.forEach((triggerName) => {
      // Wrap additional function of component, so that we can get latest value from store
      const originTrigger = control[triggerName];
      control[triggerName] = (...args) => {
        if (originTrigger) {
          originTrigger(...args);
        }

        // Always use latest rules
        const { rules } = this.props;
        if (rules && rules.length) {
          // We dispatch validate to root,
          // since it will update related data with other field with same name
          dispatch({
            type: 'validateField',
            namePath,
            triggerName,
          });
        }
      };
    });

    return control;
  };

  render() {
    const { resetCount } = this.state;
    const { children } = this.props;

    const { child, isFunction } = this.getOnlyChild(children);

    // Not need to `cloneElement` since user can handle this in render function self
    let returnChildNode
    if (isFunction) {
      returnChildNode = child;
    } else if (React.isValidElement(child)) {
      returnChildNode = React.cloneElement(
        child,
        this.getControlled(child.props),
      );
    } else {
      warning(!child, '`children` of Field is not validate ReactElement.');
      returnChildNode = child;
    }

    return <React.Fragment key={resetCount}>{returnChildNode}</React.Fragment>;
  }
}

const WrapperField = ({ name, ...restProps }) => {
  const namePath = name !== undefined ? getNamePath(name) : undefined;

  let key = 'keep';
  if (!restProps.isListField) {
    key = `_${(namePath || []).join('_')}`;
  }



  return <Field key={key} name={namePath} {...restProps} />;
};

export default WrapperField;
