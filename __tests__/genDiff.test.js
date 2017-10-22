import genDiff from '../src';

test('.json diff', () => {
  expect(genDiff('__tests__/__fixtures__/first.json', '__tests__/__fixtures__/second.json')).toBe(`{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
+ verbose: true
}`);
});

test('.yml diff', () => {
  expect(genDiff('__tests__/__fixtures__/first.yml', '__tests__/__fixtures__/second.yml')).toBe(`{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
+ verbose: true
}`);
});

test('.ini diff', () => {
  expect(genDiff('__tests__/__fixtures__/first.ini', '__tests__/__fixtures__/second.ini')).toBe(`{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
+ verbose: true
}`);
});

test('.json diff recursive', () => {
  expect(genDiff('__tests__/__fixtures__/recursiveFirst.json', '__tests__/__fixtures__/recursiveSecond.json')).toBe(`{
  common: {
      setting1: Value 1
    - setting2: 200
      setting3: true
    - setting6: {
          key: value
      }
    + setting4: blah blah
    + setting5: {
          key5: value5
      }
  }
  group1: {
    + baz: bars
    - baz: bas
      foo: bar
  }
- group2: {
      abc: 12345
  }
+ group3: {
      fee: 100500
  }
}`);
});

test('.yml diff recursive', () => {
  expect(genDiff('__tests__/__fixtures__/recursiveFirst.yml', '__tests__/__fixtures__/recursiveSecond.yml')).toBe(`{
  common: {
      setting1: Value 1
    - setting2: 200
      setting3: true
    - setting6: {
          key: value
      }
    + setting4: blah blah
    + setting5: {
          key5: value5
      }
  }
  group1: {
    + baz: bars
    - baz: bas
      foo: bar
  }
- group2: {
      abc: 12345
  }
+ group3: {
      fee: 100500
  }
}`);
});

test('.ini diff recursive', () => {
  expect(genDiff('__tests__/__fixtures__/recursiveFirst.ini', '__tests__/__fixtures__/recursiveSecond.ini')).toBe(`{
  common: {
      setting1: Value 1
    - setting2: 200
      setting3: true
    - setting6: {
          key: value
      }
    + setting4: blah blah
    + setting5: {
          key5: value5
      }
  }
  group1: {
    + baz: bars
    - baz: bas
      foo: bar
  }
- group2: {
      abc: 12345
  }
+ group3: {
      fee: 100500
  }
}`);
});

test('.json recursive diff in plain format', () => {
  expect(genDiff('__tests__/__fixtures__/recursiveFirst.json', '__tests__/__fixtures__/recursiveSecond.json', 'plain')).toBe(`{
    Property 'common.setting2' was removed
    Property 'common.setting6' was removed
    Property 'common.setting4' was added with value: blah blah
    Property 'common.setting5' was added with complex value
    Property 'group1.baz' was updated. From 'bas' to 'bars'
    Property 'group2' was removed
    Property 'group3' was added with complex value
}`);
});

test('.yml recursive diff in plain format', () => {
  expect(genDiff('__tests__/__fixtures__/recursiveFirst.json', '__tests__/__fixtures__/recursiveSecond.json', 'plain')).toBe(`{
    Property 'common.setting2' was removed
    Property 'common.setting6' was removed
    Property 'common.setting4' was added with value: blah blah
    Property 'common.setting5' was added with complex value
    Property 'group1.baz' was updated. From 'bas' to 'bars'
    Property 'group2' was removed
    Property 'group3' was added with complex value
}`);
});

test('.ini recursive diff in plain format', () => {
  expect(genDiff('__tests__/__fixtures__/recursiveFirst.ini', '__tests__/__fixtures__/recursiveSecond.ini', 'plain')).toBe(`{
    Property 'common.setting2' was removed
    Property 'common.setting6' was removed
    Property 'common.setting4' was added with value: blah blah
    Property 'common.setting5' was added with complex value
    Property 'group1.baz' was updated. From 'bas' to 'bars'
    Property 'group2' was removed
    Property 'group3' was added with complex value
}`);
});
