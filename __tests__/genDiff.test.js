
import genDiff from '../src';

test('jsonDiff', () => {
  expect(genDiff('__tests__/__fixtures__/first.json', '__tests__/__fixtures__/second.json')).toBe(`{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
+ verbose: true
}`);
});

test('yamlDiff', () => {
  expect(genDiff('__tests__/__fixtures__/first.yml', '__tests__/__fixtures__/second.yml')).toBe(`{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
+ verbose: true
}`);
});
