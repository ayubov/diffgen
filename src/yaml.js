import yaml from 'js-yaml';

export default (firstConfig, secondConfig) => {
  const firstConfigContent = yaml.safeLoad(firstConfig);
  const secondConfigContent = yaml.safeLoad(secondConfig);
  return [firstConfigContent, secondConfigContent];
};
