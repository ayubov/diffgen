import _ from 'lodash';

export default (tree) => {
  const processAst = ast => _.flatten(ast.map((obj) => {
    switch (obj.type) {
      case 'same':
        return '';
      case 'sameWithChild':
        return processAst(obj.children);
      case 'removed':
        return `    Property '${obj.path.join('.')}' was removed`;
      case 'added':
        return `    Property '${obj.path.join('.')}' was added with ${_.isObject(obj.newValue) ? 'complex value' : `value: ${obj.newValue}`}`;
      default:
        return `    Property '${obj.path.join('.')}' was updated. From '${obj.oldValue}' to '${obj.newValue}'`;
    }
  }));
  return ['{', ...processAst(tree).filter(e => e !== ''), '}'].join('\n');
};
