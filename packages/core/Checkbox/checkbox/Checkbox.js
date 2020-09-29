import * as React from 'react';
import classNames from 'classnames';
import RcCheckbox from 'rc-checkbox';
import   { GroupContext } from './Group';
import { ConfigConsumer } from '../config-provider';
import devWarning from '../_util/devWarning';
   

class Checkbox extends React.PureComponent {
   Group 

    __ANT_CHECKBOX = true;

    defaultProps = {
    indeterminate: false,
  };

    contextType = GroupContext;

  context;

    rcCheckbox;

  componentDidMount() {
    const { value } = this.props;
    this.context?.registerValue(value);

    devWarning(
      'checked' in this.props || this.context || !('value' in this.props),
      'Checkbox',
      '`value` is not a valid prop, do you mean `checked`?',
    );
  }

  componentDidUpdate({ value: prevValue }) {
    const { value } = this.props;
    if (value !== prevValue) {
      this.context?.cancelValue(prevValue);
      this.context?.registerValue(value);
    }
  }

  componentWillUnmount() {
    const { value } = this.props;
    this.context?.cancelValue(value);
  }

  saveCheckbox = (node) => {
    this.rcCheckbox = node;
  };

  focus() {
    this.rcCheckbox.focus();
  }

  blur() {
    this.rcCheckbox.blur();
  }

  renderCheckbox = ({ getPrefixCls, direction }) => {
    const { props, context } = this;
    const {
      prefixCls: customizePrefixCls,
      className,
      children,
      indeterminate,
      style,
      onMouseEnter,
      onMouseLeave,
      ...restProps
    } = props;
    const checkboxGroup = context;
    const prefixCls = getPrefixCls('checkbox', customizePrefixCls);
    const checkboxProps = { ...restProps };
    if (checkboxGroup) {
      checkboxProps.onChange = (...args) => {
        if (restProps.onChange) {
          restProps.onChange(...args);
        }
        checkboxGroup.toggleOption({ label: children, value: props.value });
      };
      checkboxProps.name = checkboxGroup.name;
      checkboxProps.checked = checkboxGroup.value.indexOf(props.value) !== -1;
      checkboxProps.disabled = props.disabled || checkboxGroup.disabled;
    }
    const classString = classNames(className, {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-wrapper-checked`]: checkboxProps.checked,
      [`${prefixCls}-wrapper-disabled`]: checkboxProps.disabled,
    });
    const checkboxClass = classNames({
      [`${prefixCls}-indeterminate`]: indeterminate,
    });
    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label
        className={classString}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <RcCheckbox
          {...checkboxProps}
          prefixCls={prefixCls}
          className={checkboxClass}
          ref={this.saveCheckbox}
        />
        {children !== undefined && <span>{children}</span>}
      </label>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderCheckbox}</ConfigConsumer>;
  }
}

export default Checkbox;
