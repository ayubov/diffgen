import yaml from 'js-yaml';

export default (...configs) => configs.map(config => yaml.safeLoad(config));
