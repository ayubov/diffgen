import _ from 'lodash';

export const parse = (first, second, parentPath = '') => {
  const unionKeys = _.union(Object.keys(first), Object.keys(second));
  const ast = unionKeys.reduce((acc, key) => {
    if (_.isEqual(first, second)) {
      console.log(`key: ${key}`);
      return [...acc, {
        name: 'same',
        key,
        path: [parentPath, key],
        firstValue: first[key],
        children:
        _.isObject(first[key]) ? parse(first[key], first[key], [...parentPath, key]) : null,
      }];
    }
    if (first[key] === second[key]) {
      return [...acc, {
        name: 'same', key, path: [parentPath, key], firstValue: first[key], children: null,
      }];
    }

    if (!first[key]) {
      return [...acc, {
        name: 'added',
        key,
        path: [parentPath, key],
        secondValue: second[key],
        children:
        _.isObject(second[key]) ? parse(second[key], second[key], [...parentPath, key]) : null,
      }];
    }
    if (!second[key]) {
      return [...acc, {
        name: 'removed',
        key,
        path: [parentPath, key],
        firstValue: first[key],
        children:
        _.isObject(first[key]) ? parse(first[key], first[key], [...parentPath, key]) : null,
      }];
    }
    if (_.isObject(first[key]) && _.isObject(second[key])) {
      return [...acc, {
        name: 'same', key, path: [parentPath, key], children: parse(first[key], second[key], [...parentPath, key]),
      }];
    }
    return [...acc, {
      name: 'updated',
      key,
      path: [parentPath, key],
      firstValue: first[key],
      secondValue: second[key],
      firstChildren:
      _.isObject(first[key]) ? parse(first[key], first[key], [...parentPath, key]) : null,
      secondChildren:
      _.isObject(second[key]) ? parse(second[key], second[key], [...parentPath, key]) : null,
    }];
  }, []);
  return ast;
};

export const render = (tree) => {
  const processAst = (ast, indent) => {
    const processedAst = ast.reduce(
      (acc, obj) => {
        if (obj.name === 'same') {
          if (obj.children !== null) {
            return [...acc, `${'  '.repeat(indent)}  ${obj.key}: ${processAst(obj.children, indent + 2)}`];
          }
          console.log(`obj.key: ${obj.key}, obj.firstValue:${obj.firstValue} `);
          return [...acc, `${'  '.repeat(indent)}  ${obj.key}: ${obj.firstValue}`];
        }
        if (obj.name === 'removed') {
          console.log(`obj.key: ${obj.key}, 1st value:${obj.firstValue}, obj.children: ${obj.children}`);
          if (obj.children !== null) {
            return [...acc, `${'  '.repeat(indent)}- ${obj.key}: ${processAst(obj.children, indent + 2)}`];
          }
          return [...acc, `${'  '.repeat(indent)}- ${obj.key}: ${obj.firstValue}`];
        }
        if (obj.name === 'added') {
          console.log(`obj.children:${obj.children}, obj.key: ${obj.key}`);
          if (obj.children !== null) {
            return [...acc, `${'  '.repeat(indent)}+ ${obj.key}: ${processAst(obj.children, indent + 2)}`];
          }
          return [...acc, `${'  '.repeat(indent)}+ ${obj.key}: ${obj.secondValue}`];
        }
        if (obj.firstChildren !== null && obj.secondChildren !== null) {
          return [...acc, `${'  '.repeat(indent)}+ ${obj.key}: ${processAst(obj.secondchildren, indent + 2)}`,
            `${'  '.repeat(indent)}- ${obj.key}: ${processAst(obj.firstChildren, indent + 2)}`];
        }
        if (obj.firstChildren !== null) {
          return [...acc, `${'  '.repeat(indent)}+ ${obj.key}: ${obj.secondValue}`,
            `${'  '.repeat(indent)}- ${obj.key}: ${processAst(obj.firstChildren, indent + 2)}`];
        }
        if (obj.secondChildren !== null) {
          return [...acc, `${'  '.repeat(indent)}+ ${obj.key}: ${processAst(obj.secondchildren, indent + 2)}`,
            `${'  '.repeat(indent)}- ${obj.key}: ${obj.firstValue}`];
        }
        return [...acc, `${'  '.repeat(indent)}+ ${obj.key}: ${obj.secondValue}`, `${'  '.repeat(indent)}- ${obj.key}: ${obj.firstValue}`];
      }
      , [],
    );
    return ['{', ...processedAst, `${'  '.repeat(indent).slice(2)}}`].join('\n');
  };
  return processAst(tree, 0);
};
