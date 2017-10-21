import _ from 'lodash';

export const parse = (first, second, parentPath = '') => {
  const unionKeys = _.union(Object.keys(first), Object.keys(second));
  const ast = unionKeys.reduce((acc, key) => {
    if (_.isEqual(first[key], second[key])) {
      return [...acc, {
        name: 'same',
        key,
        path: [...parentPath, key],
        value: first[key],
      }];
    }
    if (_.isObject(first[key]) && _.isObject(second[key])) {
      return [...acc, {
        name: 'sameWithChild',
        key,
        path: [parentPath, key],
        children: parse(first[key], second[key], [...parentPath, key]),
      }];
    }
    if (_.isUndefined(first[key])) {
      return [...acc, {
        name: 'added',
        key,
        path: [...parentPath, key],
        value: second[key],
      }];
    }
    if (_.isUndefined(second[key])) {
      return [...acc, {
        name: 'removed',
        key,
        path: [...parentPath, key],
        value: first[key],
      }];
    }
    return [...acc, {
      name: 'updated',
      key,
      path: [parentPath, key],
      firstValue: first[key],
      secondValue: second[key],
    }];
  }, []);
  return ast;
};

const spread = (value, indent) => {
  if (_.isObject(value)) {
    const spreadValue = Object.keys(value).reduce((acc, key) =>
      (_.isObject(value[key]) ? [...acc, spread(value[key], indent + 2)] :
        [...acc, `${'  '.repeat(indent)}  ${key}: ${value[key]}`]), []);
    return ['{', spreadValue, `${'  '.repeat(indent).slice(2)}}`].join('\n');
  }
  return value;
};

export const render = (tree) => {
  const processAst = (ast, indent) => {
    const processedAst = ast.reduce((acc, obj) => {
      switch (obj.name) {
        case 'same':
          return [...acc, `${'  '.repeat(indent)}  ${obj.key}: ${obj.value}`];
        case 'sameWithChild':
          return [...acc, `${'  '.repeat(indent)}  ${obj.key}: ${processAst(obj.children, indent + 2)}`];
        case 'removed':
          return [...acc, `${'  '.repeat(indent)}- ${obj.key}: ${spread(obj.value, indent + 2)}`];
        case 'added':
          return [...acc, `${'  '.repeat(indent)}+ ${obj.key}: ${spread(obj.value, indent + 2)}`];
        default:
          return [...acc, `${'  '.repeat(indent)}+ ${obj.key}: ${spread(obj.secondValue, indent + 2)}`,
            `${'  '.repeat(indent)}- ${obj.key}: ${spread(obj.firstValue, indent + 2)}`];
      }
    }, []);
    return ['{', ...processedAst, `${'  '.repeat(indent).slice(2)}}`].join('\n');
  };
  return processAst(tree, 0);
};

