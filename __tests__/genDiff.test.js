import colors from 'colors';
import genDiff from '../src';

const simpleResult = `{
  host: hexlet.io
${colors.green('+ timeout: 20')}
${colors.red('- timeout: 50')}
${colors.red('- proxy: 123.234.53.22')}
${colors.green('+ verbose: true')}
}`;

/* const recursiveResult = `{
  common: {
      setting1: Value 1
${colors.red('    - setting2: 200')}
      setting3: true
${colors.red(`    - setting6: {
          key: value
      }`)}
${colors.green(`    + setting4: blah blah
    + setting5: {
          key5: value5
      }
  }`)}
  group1: {
${colors.green('    + baz: bars')}
${colors.red('    - baz: bas')}
      foo: bar
  }
${colors.red(`- group2: {
      abc: 12345
  }`)}
${colors.green(`+ group3: {
      fee: 100500
  }
`)}}`; */

const jsonResult = '[{"common":[{"type":"same","newValue":"Value 1"},{"type":"removed","oldValue":"200"},{"type":"same","newValue":true},{"type":"removed","oldValue":{"key":"value"}},{"type":"added","newValue":"blah blah"},{"type":"added","newValue":{"key5":"value5"}}]},{"group1":[{"type":"updated","oldValue":"bas","newValue":"bars"},{"type":"same","newValue":"bar"}]},{"type":"removed","oldValue":{"abc":"12345"}},{"type":"added","newValue":{"fee":"100500"}}]';

const plainFormatResult = `{
    Property 'common.setting2' was removed
    Property 'common.setting6' was removed
    Property 'common.setting4' was added with value: blah blah
    Property 'common.setting5' was added with complex value
    Property 'group1.baz' was updated. From 'bas' to 'bars'
    Property 'group2' was removed
    Property 'group3' was added with complex value
}`;

test('.json diff', () => {
  expect(genDiff('__tests__/__fixtures__/first.json', '__tests__/__fixtures__/second.json')).toBe(simpleResult);
});

test('.yml diff', () => {
  expect(genDiff('__tests__/__fixtures__/first.yml', '__tests__/__fixtures__/second.yml')).toBe(simpleResult);
});

test('.ini diff', () => {
  expect(genDiff('__tests__/__fixtures__/first.ini', '__tests__/__fixtures__/second.ini')).toBe(simpleResult);
});

/* test('.json diff recursive', () => {
  expect(genDiff('__tests__/__fixtures__/recursiveFirst.json',
  '__tests__/__fixtures__/recursiveSecond.json')).toBe(recursiveResult);
});

test('.yml diff recursive', () => {
  expect(genDiff('__tests__/__fixtures__/recursiveFirst.yml',
   '__tests__/__fixtures__/recursiveSecond.yml')).toBe(recursiveResult);
});

test('.ini diff recursive', () => {
  expect(genDiff('__tests__/__fixtures__/recursiveFirst.ini',
  '__tests__/__fixtures__/recursiveSecond.ini')).toBe(recursiveResult);
}); */

test('.json recursive diff in plain format', () => {
  expect(genDiff('__tests__/__fixtures__/recursiveFirst.json', '__tests__/__fixtures__/recursiveSecond.json', 'plain')).toBe(plainFormatResult);
});

test('.yml recursive diff in plain format', () => {
  expect(genDiff('__tests__/__fixtures__/recursiveFirst.json', '__tests__/__fixtures__/recursiveSecond.json', 'plain')).toBe(plainFormatResult);
});

test('.ini recursive diff in plain format', () => {
  expect(genDiff('__tests__/__fixtures__/recursiveFirst.ini', '__tests__/__fixtures__/recursiveSecond.ini', 'plain')).toBe(plainFormatResult);
});

test('json format test', () => {
  expect(genDiff(
    '__tests__/__fixtures__/recursiveFirst.ini',
    '__tests__/__fixtures__/recursiveSecond.ini', 'json',
  ))
    .toBe(jsonResult);
});

