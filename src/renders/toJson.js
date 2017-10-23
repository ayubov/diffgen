export default (tree) => {
  const renderToJson = ast => ast.map((obj) => {
    switch (obj.type) {
      case 'sameWithChild':
        return { [obj.key]: renderToJson(obj.children) };
      default:
        return { type: obj.type, oldValue: obj.oldValue, newValue: obj.newValue };
    }
  });
  return JSON.stringify(renderToJson(tree));
};
