
import validateValue from '@packages/utils/validateValue';
//将值转化成数组
export default function toArray(value)  {
    if (!validateValue(value)) {
      return [];
    }
  
    return Array.isArray(value) ? value : [value];
}
  