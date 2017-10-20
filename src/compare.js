import _ from 'lodash';

const compare = (first, second, indent = '') => {
  const unionKeys = _.union(Object.keys(first), Object.keys(second));
  const totalDiffObj = unionKeys.reduce((acc, key) => {
    if (first[key] instanceof Object && second[key] instanceof Object) {
      return [...acc, `${indent}  ${key}: ${compare(first[key], second[key], `${`${indent}    `}`)}`];
    } else if (first[key] instanceof Object) {
      return [...acc, `${indent}- ${key}: ${compare(first[key], first[key], `${`${indent}    `}`)}`];
    } else if (second[key] instanceof Object) {
      return [...acc, `${indent}+ ${key}: ${compare(second[key], second[key], `${`${indent}    `}`)}`];
    } else if (first[key] === second[key]) {
      return [...acc, `${indent}  ${key}: ${first[key]}`];
    } else if (!first[key]) {
      return [...acc, `${indent}+ ${key}: ${second[key]}`];
    } else if (!second[key]) {
      return [...acc, `${indent}- ${key}: ${first[key]}`];
    }
    return [...acc, `${indent}+ ${key}: ${second[key]}`, `${indent}- ${key}: ${first[key]}`];
  }, []);
  const totalDiffStr = ['{', ...totalDiffObj, `${indent === '' ? '' : indent.slice(2)}}`].join('\n');
  return totalDiffStr;
};

export default compare;
