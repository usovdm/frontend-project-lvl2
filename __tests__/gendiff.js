/* eslint-disable jest/no-disabled-tests */
import genDiff, { getDiffBetweenJsonObjects } from '../src/gendiff';

describe('gendiff', () => {
  describe('files', () => {
    it('reads both files', () => {
      const filepath1 = './sample/file1.json';
      const filepath2 = './sample/file2.json';

      expect(genDiff(filepath1, filepath2)).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
    });
    it('reads by absolute path', () => {
      const filepath1 = new URL('../sample/file2.json', import.meta.url);
      const filepath2 = new URL('../sample/file1.json', import.meta.url);

      expect(genDiff(filepath1, filepath2)).toBe(`{
  + follow: false
    host: hexlet.io
  + proxy: 123.234.53.22
  - timeout: 20
  + timeout: 50
  - verbose: true
}`);
    });
    it.skip('fails if the first file has the wrong path', () => {
      const filepath1 = './sample/file1.json';
      const filepath2 = './sample/non-exist';

      expect(genDiff(filepath1, filepath2)).toThrow();
    });
    it.skip('fails if the second file has the wrong path', () => { });
  });
  describe('function', () => {
    it('returns unchanged property', () => {
      const json1 = { key: 'value' };
      const json2 = { key: 'value' };
      expect(getDiffBetweenJsonObjects(json1, json2).toString()).toBe(
        `{
    key: value
}`,
      );
    });

    it('returns added property', () => {
      const json1 = {};
      const json2 = { key: 'added value' };
      expect(getDiffBetweenJsonObjects(json1, json2).toString()).toBe(
        `{
  + key: ${json2.key}
}`,
      );
    });

    it('returns removed property', () => {
      const json1 = { key: 'removed value' };
      const json2 = {};
      expect(getDiffBetweenJsonObjects(json1, json2).toString()).toBe(
        `{
  - key: ${json1.key}
}`,
      );
    });

    it('returns changed changes', () => {
      const json1 = { key: 'value old' };
      const json2 = { key: 'value new' };
      expect(getDiffBetweenJsonObjects(json1, json2).toString()).toBe(
        `{
  - key: value old
  + key: value new
}`,
      );
    });

    it('returns changes where null is changed', () => {
      const json1 = { key: null };
      const json2 = { key: 'value new' };
      expect(getDiffBetweenJsonObjects(json1, json2).toString()).toBe(
        `{
  - key: null
  + key: value new
}`,
      );
    });

    it('returns changes where bool is changed', () => {
      const json1 = { key: true };
      const json2 = { key: false };
      expect(getDiffBetweenJsonObjects(json1, json2).toString()).toBe(
        `{
  - key: true
  + key: false
}`,
      );
    });
  });
});
