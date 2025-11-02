import * as _ from 'lodash';

function changeNumberOfData(data) {
  if (Array.isArray(data)) {
    return data.map(changeNumberOfData);
  }

  if (typeof data === 'object') {
    return _.mapValues(data, (val) => {
      if (typeof val === 'number') {
        return Math.floor(val * Math.random() * 2);
      }

      return changeNumberOfData(val);
    });
  }

  return data;
}

export default changeNumberOfData;
