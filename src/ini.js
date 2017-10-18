import ini from 'ini';

export default (...configs) => configs.map(config => ini.parse(config));
