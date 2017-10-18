export default (firstConfig, secondConfig) => {
  const firstConfigContent = JSON.parse(firstConfig);
  const secondConfigContent = JSON.parse(secondConfig);
  return [firstConfigContent, secondConfigContent];
};
