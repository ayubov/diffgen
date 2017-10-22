import renderDefault from './default';
import renderToJson from './toJson';
import renderToPlain from './toPlain';

const formats = {
  plain: renderToPlain,
  json: renderToJson,
  default: renderDefault,
};

export default (ast, format) => formats[format](ast);
