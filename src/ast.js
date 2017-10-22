import _ from 'lodash';

export default (firstConfig, secondConfig) => {
  const parse = (first, second, parentPath = []) => {
    const unionKeys = _.union(Object.keys(first), Object.keys(second));
    const ast = unionKeys.reduce((acc, key) => {
      if (_.isEqual(first[key], second[key])) {
        return [...acc, {
          type: 'same',
          key,
          path: [...parentPath, key],
          newValue: first[key],
        }];
      }
      if (_.isObject(first[key]) && _.isObject(second[key])) {
        return [...acc, {
          type: 'sameWithChild',
          key,
          path: [parentPath, key],
          children: parse(first[key], second[key], [...parentPath, key]),
        }];
      }
      if (_.isUndefined(first[key])) {
        return [...acc, {
          type: 'added',
          key,
          path: [...parentPath, key],
          newValue: second[key],
        }];
      }
      if (_.isUndefined(second[key])) {
        return [...acc, {
          type: 'removed',
          key,
          path: [...parentPath, key],
          oldValue: first[key],
        }];
      }
      return [...acc, {
        type: 'updated',
        key,
        path: [...parentPath, key],
        oldValue: first[key],
        newValue: second[key],
      }];
    }, []);
    return ast;
  };
  return parse(firstConfig, secondConfig);
};
