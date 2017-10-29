import _ from 'lodash';
import colors from 'colors';

const spread = (value, indent) => {
  if (_.isObject(value)) {
    const spreadValue = Object.keys(value).reduce((acc, key) =>
      (_.isObject(value[key]) ? [...acc, spread(value[key], indent + 2)] :
        [...acc, `${'  '.repeat(indent)}  ${key}: ${value[key]}`]), []);
    return ['{', spreadValue, `${'  '.repeat(indent).slice(2)}}`].join('\n');
  }
  return value;
};

export default (tree) => {
  const processAst = (ast, indent) => {
    const processedAst = _.flatten(ast.map((obj) => {
      switch (obj.type) {
        case 'same':
          return `${'  '.repeat(indent)}  ${obj.key}: ${obj.newValue}`;
        case 'sameWithChild':
          return `${'  '.repeat(indent)}  ${obj.key}: ${processAst(obj.children, indent + 2)}`;
        case 'removed':
          return colors.red(`${'  '.repeat(indent)}- ${obj.key}: ${spread(obj.oldValue, indent + 2)}`);
        case 'added':
          return colors.green(`${'  '.repeat(indent)}+ ${obj.key}: ${spread(obj.newValue, indent + 2)}`);
        default:
          return [colors.green(`${'  '.repeat(indent)}+ ${obj.key}: ${spread(obj.newValue, indent + 2)}`),
            colors.red(`${'  '.repeat(indent)}- ${obj.key}: ${spread(obj.oldValue, indent + 2)}`)];
      }
    }));
    return ['{', ...processedAst, `${'  '.repeat(indent).slice(2)}}`].join('\n');
  };
  return processAst(tree, 0);
};
