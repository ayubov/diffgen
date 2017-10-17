
import jsonDiff from '../src';

test('jsonDiff', () => {
  expect(jsonDiff('__tests__/__stuff__/first.json', '__tests__/__stuff__/second.json')).toBe(`{
+ verbose: true
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
}`);
});
