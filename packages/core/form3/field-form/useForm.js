import * as React from 'react';
import { HOOK_MARK } from './FieldContext';
import { allPromiseFinish } from './utils/asyncUtil';
import NameMap from './utils/NameMap';
import { defaultValidateMessages } from './utils/messages';
import {
  cloneByNamePathList,
  containsNamePath,
  getNamePath,
  getValue,
  setValue,
  setValues,
} from './utils/valueUtil';

 
export class FormStore {
  formHooked = false;

  forceRootUpdate;

  subscribable = true;
  store = {};

  fieldEntities = [];
  initialValues = {};

  callbacks = {};

  validateMessages = null;

  preserve = null;

  lastValidatePromise = null;

  constructor(forceRootUpdate) {
    this.forceRootUpdate = forceRootUpdate;
  }

  getForm = () => ({
    getFieldValue: this.getFieldValue,
    getFieldsValue: this.getFieldsValue,
    getFieldError: this.getFieldError,
    getFieldsError: this.getFieldsError,
    isFieldsTouched: this.isFieldsTouched,
    isFieldTouched: this.isFieldTouched,
    isFieldValidating: this.isFieldValidating,
    isFieldsValidating: this.isFieldsValidating,
    resetFields: this.resetFields,
    setFields: this.setFields,
    setFieldsValue: this.setFieldsValue,
    validateFields: this.validateFields,
    submit: this.submit,

    getInternalHooks: this.getInternalHooks,
  });

  // ======================== Internal Hooks ========================
  getInternalHooks = (key) => {
    if (key === HOOK_MARK) {
      this.formHooked = true;

      return {
        dispatch: this.dispatch,
        registerField: this.registerField,
        useSubscribe: this.useSubscribe,
        setInitialValues: this.setInitialValues,
        setCallbacks: this.setCallbacks,
        setValidateMessages: this.setValidateMessages,
        getFields: this.getFields,
        setPreserve: this.setPreserve,
      };
    }


    return null;
  };

  useSubscribe = (subscribable) => {
    this.subscribable = subscribable;
  };

  /**
   * First time `setInitialValues` should update store with initial value
   */
  setInitialValues = (initialValues, init) => {
    this.initialValues = initialValues || {};
    if (init) {
      this.store = setValues({}, initialValues, this.store);
    }
  };

  getInitialValue = (namePath) => getValue(this.initialValues, namePath);

  setCallbacks = (callbacks) => {
    this.callbacks = callbacks;
  };

  setValidateMessages = (validateMessages) => {
    this.validateMessages = validateMessages;
  };

  setPreserve = (preserve) => {
    this.preserve = preserve;
  };

  // ========================== Dev Warning =========================
  timeoutId = null;

  

  // ============================ Fields ============================
  /**
   * Get registered field entities.
   * @param pure Only return field which has a `name`. Default: false
   */
  getFieldEntities = (pure = false) => {
    if (!pure) {
      return this.fieldEntities;
    }

    return this.fieldEntities.filter(field => field.getNamePath().length);
  };

  getFieldsMap = (pure = false) => {
    const cache = new NameMap();
    this.getFieldEntities(pure).forEach(field => {
      const namePath = field.getNamePath();
      cache.set(namePath, field);
    });
    return cache;
  };

  getFieldEntitiesForNamePathList = (
    nameList,
  ) => {
    if (!nameList) {
      return this.getFieldEntities(true);
    }
    const cache = this.getFieldsMap(true);
    return nameList.map(name => {
      const namePath = getNamePath(name);
      return cache.get(namePath) || { INVALIDATE_NAME_PATH: getNamePath(name) };
    });
  };

  getFieldsValue = (nameList, filterFunc) => {
  

    if (nameList === true && !filterFunc) {
      return this.store;
    }

    const fieldEntities = this.getFieldEntitiesForNamePathList(
      Array.isArray(nameList) ? nameList : null,
    );

    const filteredNameList = [];
    fieldEntities.forEach((entity) => {
      const namePath =
        'INVALIDATE_NAME_PATH' in entity ? entity.INVALIDATE_NAME_PATH : entity.getNamePath();

      if (!filterFunc) {
        filteredNameList.push(namePath);
      } else {
        const meta = 'getMeta' in entity ? entity.getMeta() : null;
        if (filterFunc(meta)) {
          filteredNameList.push(namePath);
        }
      }
    });

    return cloneByNamePathList(this.store, filteredNameList.map(getNamePath));
  };

  getFieldValue = (name) => { 

    const namePath = getNamePath(name);
    return getValue(this.store, namePath);
  };

  getFieldsError = (nameList) => { 

    const fieldEntities = this.getFieldEntitiesForNamePathList(nameList);

    return fieldEntities.map((entity, index) => {
      if (entity && !('INVALIDATE_NAME_PATH' in entity)) {
        return {
          name: entity.getNamePath(),
          errors: entity.getErrors(),
        };
      }

      return {
        name: getNamePath(nameList[index]),
        errors: [],
      };
    });
  };

  getFieldError = (name) => { 

    const namePath = getNamePath(name);
    const fieldError = this.getFieldsError([namePath])[0];
    return fieldError.errors;
  };

  isFieldsTouched = (...args) => { 

    const [arg0, arg1] = args;
    let namePathList;
    let isAllFieldsTouched = false;

    if (args.length === 0) {
      namePathList = null;
    } else if (args.length === 1) {
      if (Array.isArray(arg0)) {
        namePathList = arg0.map(getNamePath);
        isAllFieldsTouched = false;
      } else {
        namePathList = null;
        isAllFieldsTouched = arg0;
      }
    } else {
      namePathList = arg0.map(getNamePath);
      isAllFieldsTouched = arg1;
    }

    const testTouched = (field) => {
      // Not provide `nameList` will check all the fields
      if (!namePathList) {
        return field.isFieldTouched();
      }

      const fieldNamePath = field.getNamePath();
      if (containsNamePath(namePathList, fieldNamePath)) {
        return field.isFieldTouched();
      }
      return isAllFieldsTouched;
    };

    return isAllFieldsTouched
      ? this.getFieldEntities(true).every(testTouched)
      : this.getFieldEntities(true).some(testTouched);
  };

  isFieldTouched = (name) => { 
    return this.isFieldsTouched([name]);
  };

  isFieldsValidating = (nameList) => { 

    const fieldEntities = this.getFieldEntities();
    if (!nameList) {
      return fieldEntities.some(testField => testField.isFieldValidating());
    }

    const namePathList = nameList.map(getNamePath);
    return fieldEntities.some(testField => {
      const fieldNamePath = testField.getNamePath();
      return containsNamePath(namePathList, fieldNamePath) && testField.isFieldValidating();
    });
  };

  isFieldValidating = (name) => { 

    return this.isFieldsValidating([name]);
  };

  /**
   * Reset Field with field `initialValue` prop.
   * Can pass `entities` or `namePathList` or just nothing.
   */
  resetWithFieldInitialValue = (
    info = {},
  ) => {
    // Create cache
    const cache = new NameMap();

    const fieldEntities = this.getFieldEntities(true);
    fieldEntities.forEach(field => {
      const { initialValue } = field.props;
      const namePath = field.getNamePath();

      // Record only if has `initialValue`
      if (initialValue !== undefined) {
        const records = cache.get(namePath) || new Set();
        records.add({ entity: field, value: initialValue });

        cache.set(namePath, records);
      }
    });

    // Reset
    const resetWithFields = (entities) => {
      entities.forEach(field => {
        const { initialValue } = field.props;

        if (initialValue !== undefined) {
          const namePath = field.getNamePath();
          const formInitialValue = this.getInitialValue(namePath);

          if (formInitialValue !== undefined) {

          } else {
            const records = cache.get(namePath);
            if (records && records.size > 1) {


            } else if (records) {
              const originValue = this.getFieldValue(namePath);
              // Set `initialValue`
              if (!info.skipExist || originValue === undefined) {
                this.store = setValue(this.store, namePath, [...records][0].value);
              }
            }
          }
        }
      });
    };

    let requiredFieldEntities;
    if (info.entities) {
      requiredFieldEntities = info.entities;
    } else if (info.namePathList) {
      requiredFieldEntities = [];

      info.namePathList.forEach(namePath => {
        const records = cache.get(namePath);
        if (records) {
          requiredFieldEntities.push(...[...records].map(r => r.entity));
        }
      });
    } else {
      requiredFieldEntities = fieldEntities;
    }

    resetWithFields(requiredFieldEntities);
  };

  resetFields = (nameList) => { 

    const prevStore = this.store;
    if (!nameList) {
      this.store = setValues({}, this.initialValues);
      this.resetWithFieldInitialValue();
      this.notifyObservers(prevStore, null, { type: 'reset' });
      return;
    }

    // Reset by `nameList`
    const namePathList = nameList.map(getNamePath);
    namePathList.forEach(namePath => {
      const initialValue = this.getInitialValue(namePath);
      this.store = setValue(this.store, namePath, initialValue);
    });
    this.resetWithFieldInitialValue({ namePathList });
    this.notifyObservers(prevStore, namePathList, { type: 'reset' });
  };

  setFields = (fields) => { 

    const prevStore = this.store;

    fields.forEach((fieldData) => {
      const { name, errors, ...data } = fieldData;
      const namePath = getNamePath(name);

      // Value
      if ('value' in data) {
        this.store = setValue(this.store, namePath, data.value);
      }

      this.notifyObservers(prevStore, [namePath], {
        type: 'setField',
        data: fieldData,
      });
    });
  };

  getFields = () => {
    const entities = this.getFieldEntities(true);

    const fields = entities.map(
      (field) => {
        const namePath = field.getNamePath();
        const meta = field.getMeta();
        const fieldData = {
          ...meta,
          name: namePath,
          value: this.getFieldValue(namePath),
        };

        Object.defineProperty(fieldData, 'originRCField', {
          value: true,
        });

        return fieldData;
      },
    );

    return fields;
  };

  // =========================== Observer ===========================
  registerField = (entity) => {
    this.fieldEntities.push(entity);

    // Set initial values
    if (entity.props.initialValue !== undefined) {
      const prevStore = this.store;
      this.resetWithFieldInitialValue({ entities: [entity], skipExist: true });
      this.notifyObservers(prevStore, [entity.getNamePath()], {
        type: 'valueUpdate',
        source: 'internal',
      });
    }

    // un-register field callback
    return (isListField, preserve) => {
      this.fieldEntities = this.fieldEntities.filter(item => item !== entity);

      // Clean up store value if preserve
      const mergedPreserve = preserve !== undefined ? preserve : this.preserve;
      if (mergedPreserve === false && !isListField) {
        const namePath = entity.getNamePath();
        if (this.getFieldValue(namePath) !== undefined) {
          this.store = setValue(this.store, namePath, undefined);
        }
      }
    };
  };

  dispatch = (action) => {
    switch (action.type) {
      case 'updateValue': {
        const { namePath, value } = action;
        this.updateValue(namePath, value);
        break;
      }
      case 'validateField': {
        const { namePath, triggerName } = action;
        this.validateFields([namePath], { triggerName });
        break;
      }
      default:
      // Currently we don't have other action. Do nothing.
    }
  };

  notifyObservers = (
    prevStore,
    namePathList,
    info,
  ) => {
    if (this.subscribable) {
      const mergedInfo = {
        ...info,
        store: this.getFieldsValue(true),
      };
      this.getFieldEntities().forEach(({ onStoreChange }) => {
        onStoreChange(prevStore, namePathList, mergedInfo);
      });
    } else {
      this.forceRootUpdate();
    }
  };

  updateValue = (name, value) => {
    const namePath = getNamePath(name);
    const prevStore = this.store;
    this.store = setValue(this.store, namePath, value);

    this.notifyObservers(prevStore, [namePath], {
      type: 'valueUpdate',
      source: 'internal',
    });

    // Notify dependencies children with parent update
    const childrenFields = this.getDependencyChildrenFields(namePath);
    this.validateFields(childrenFields);

    this.notifyObservers(prevStore, childrenFields, {
      type: 'dependenciesUpdate',
      relatedFields: [namePath, ...childrenFields],
    });

    // trigger callback function
    const { onValuesChange } = this.callbacks;

    if (onValuesChange) {
      const changedValues = cloneByNamePathList(this.store, [namePath]);
      onValuesChange(changedValues, this.store);
    }

    this.triggerOnFieldsChange([namePath, ...childrenFields]);
  };

  // Let all child Field get update.
  setFieldsValue = (store) => { 

    const prevStore = this.store;

    if (store) {
      this.store = setValues(this.store, store);
    }

    this.notifyObservers(prevStore, null, {
      type: 'valueUpdate',
      source: 'external',
    });
  };

  getDependencyChildrenFields = (rootNamePath) => {
    const children = new Set();
    const childrenFields = [];

    const dependencies2fields = new NameMap();

    /**
     * Generate maps
     * Can use cache to save perf if user report performance issue with this
     */
    this.getFieldEntities().forEach(field => {
      const { dependencies } = field.props;
      (dependencies || []).forEach(dependency => {
        const dependencyNamePath = getNamePath(dependency);
        dependencies2fields.update(dependencyNamePath, (fields = new Set()) => {
          fields.add(field);
          return fields;
        });
      });
    });

    const fillChildren = (namePath) => {
      const fields = dependencies2fields.get(namePath) || new Set();
      fields.forEach(field => {
        if (!children.has(field)) {
          children.add(field);

          const fieldNamePath = field.getNamePath();
          if (field.isFieldDirty() && fieldNamePath.length) {
            childrenFields.push(fieldNamePath);
            fillChildren(fieldNamePath);
          }
        }
      });
    };

    fillChildren(rootNamePath);

    return childrenFields;
  };

  triggerOnFieldsChange = (
    namePathList,
    filedErrors,
  ) => {
    const { onFieldsChange } = this.callbacks;

    if (onFieldsChange) {
      const fields = this.getFields();

      /**
       * Fill errors since `fields` may be replaced by controlled fields
       */
      if (filedErrors) {
        const cache = new NameMap();
        filedErrors.forEach(({ name, errors }) => {
          cache.set(name, errors);
        });

        fields.forEach(field => {
          // eslint-disable-next-line no-param-reassign
          field.errors = cache.get(field.name) || field.errors;
        });
      }

      const changedFields = fields.filter(({ name: fieldName }) =>
        containsNamePath(namePathList, fieldName),
      );
      onFieldsChange(changedFields, fields);
    }
  };

  // =========================== Validate ===========================
  validateFields = (
    nameList,
    options,
  ) => { 

    const provideNameList = !!nameList;
    const namePathList = provideNameList
      ? nameList.map(getNamePath)
      : [];

    // Collect result in promise list
    const promiseList = [];

    this.getFieldEntities(true).forEach((field) => {
      // Add field if not provide `nameList`
      if (!provideNameList) {
        namePathList.push(field.getNamePath());
      }

      // Skip if without rule
      if (!field.props.rules || !field.props.rules.length) {
        return;
      }

      const fieldNamePath = field.getNamePath();

      // Add field validate rule in to promise list
      if (!provideNameList || containsNamePath(namePathList, fieldNamePath)) {
        const promise = field.validateRules({
          validateMessages: {
            ...defaultValidateMessages,
            ...this.validateMessages,
          },
          ...options,
        });

        // Wrap promise with field
        promiseList.push(
          promise
            .then(() => ({ name: fieldNamePath, errors: [] }))
            .catch(errors =>
              Promise.reject({
                name: fieldNamePath,
                errors,
              }),
            ),
        );
      }
    });

    const summaryPromise = allPromiseFinish(promiseList);
    this.lastValidatePromise = summaryPromise;

    // Notify fields with rule that validate has finished and need update
    summaryPromise
      .catch(results => results)
      .then((results) => {
        const resultNamePathList = results.map(({ name }) => name);
        this.notifyObservers(this.store, resultNamePathList, {
          type: 'validateFinish',
        });
        this.triggerOnFieldsChange(resultNamePathList, results);
      });

    const returnPromise = summaryPromise
      .then(
        () => {
          if (this.lastValidatePromise === summaryPromise) {
            return Promise.resolve(this.getFieldsValue(namePathList));
          }
          return Promise.reject([]);
        },
      )
      .catch((results) => {
        const errorList = results.filter(result => result && result.errors.length);
        return Promise.reject({
          values: this.getFieldsValue(namePathList),
          errorFields: errorList,
          outOfDate: this.lastValidatePromise !== summaryPromise,
        });
      });

    // Do not throw in console
    returnPromise.catch(e => e);

    return returnPromise;
  };

  // ============================ Submit ============================
  submit = () => { 

    this.validateFields()
      .then(values => {
        const { onFinish } = this.callbacks;
        if (onFinish) {
          try {
            onFinish(values);
          } catch (err) {
            // Should print error if user `onFinish` callback failed
            console.error(err);
          }
        }
      })
      .catch(e => {
        const { onFinishFailed } = this.callbacks;
        if (onFinishFailed) {
          onFinishFailed(e);
        }
      });
  };
}

function useForm(form) {
  const formRef = React.useRef();
  const [, forceUpdate] = React.useState();

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      // Create a new FormStore if not provided
      const forceReRender = () => {
        forceUpdate({});
      };

      const formStore = new FormStore(forceReRender);

      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}

export default useForm;
