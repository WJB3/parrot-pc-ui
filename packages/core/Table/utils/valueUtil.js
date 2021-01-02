
import toArray from '@packages/utils/toArray';


export function getColumnsKey(columns) {
    const columnKeys = [];
    const keys= {};
  
    columns.forEach(column => {
      const { key, dataIndex } = column || {};
  
      let mergedKey = key || toArray(dataIndex).join('-');

      while (keys[mergedKey]) {
        mergedKey = `${mergedKey}_next`;
      }
      keys[mergedKey] = true;
  
      columnKeys.push(mergedKey);
    });
  
    return columnKeys;
}