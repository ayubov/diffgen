export default (tree) => {
  const renderToJson = ast => ast.reduce((acc, obj) => {
    switch (obj.type) {
      case 'same':
        return { ...acc, [obj.key]: obj.newValue };
      case 'sameWithChild':
        return { ...acc, [obj.key]: renderToJson(obj.children) };
      case 'removed':
        return { ...acc, [`- ${obj.key}`]: obj.oldValue };
      case 'added':
        return { ...acc, [`+ ${obj.key}`]: obj.newValue };
      default:
        return { ...acc, [`- ${obj.key}`]: obj.oldValue, [`+ ${obj.key}`]: obj.newValue };
    }
  }, {});
  return JSON.stringify(renderToJson(tree));
};
