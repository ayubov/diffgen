import _ from 'lodash';

export const parse = (first, second, parentPath = '') => {
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
      path: [parentPath, key],
      oldValue: first[key],
      newValue: second[key],
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
    const processedAst = _.flatten(ast.map((obj) => {
      switch (obj.type) {
        case 'same':
          return `${'  '.repeat(indent)}  ${obj.key}: ${obj.newValue}`;
        case 'sameWithChild':
          return `${'  '.repeat(indent)}  ${obj.key}: ${processAst(obj.children, indent + 2)}`;
        case 'removed':
          return `${'  '.repeat(indent)}- ${obj.key}: ${spread(obj.oldValue, indent + 2)}`;
        case 'added':
          return `${'  '.repeat(indent)}+ ${obj.key}: ${spread(obj.newValue, indent + 2)}`;
        default:
          return [`${'  '.repeat(indent)}+ ${obj.key}: ${spread(obj.newValue, indent + 2)}`,
            `${'  '.repeat(indent)}- ${obj.key}: ${spread(obj.oldValue, indent + 2)}`];
      }
    }));
    return ['{', ...processedAst, `${'  '.repeat(indent).slice(2)}}`].join('\n');
  };
  return processAst(tree, 0);
};
