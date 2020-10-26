
//将值转化成数组
export default function toArray(value)  {
    if (value === undefined || value === null) {
      return [];
    }
  
    return Array.isArray(value) ? value : [value];
}
  