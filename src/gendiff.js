import _ from 'lodash';
import Parser from './Parser.js';

const convertDiffToString = (diffObject) => {
  const result = [];
  result.push('{');
  diffObject
    .forEach(({
      key, isDifferent, left, right,
    }) => {
      if (isDifferent === false) {
        result.push(`    ${key}: ${left}`);
        return;
      }
      if (left !== undefined) {
        result.push(`  - ${key}: ${left}`);
      }
      if (right !== undefined) {
        result.push(`  + ${key}: ${right}`);
      }
    });
  result.push('}');

  return result.join('\n');
};

const getDiffBetweenJsonObjects = (firstJson, secondJson) => {
  const keys = _.concat(
    Object.getOwnPropertyNames(firstJson),
    Object.getOwnPropertyNames(secondJson),
  );

  const sortedKeys = _.sortBy(_.uniq(keys));

  const diffObject = sortedKeys.map((key) => ({
    key,
    isDifferent: firstJson[key] !== secondJson[key],
    left: firstJson[key],
    right: secondJson[key],
  }));

  diffObject.toString = () => convertDiffToString(diffObject);

  return diffObject;
};

const getDiffBetweenFiles = (filepath1, filepath2) => {
  const firstJson = new Parser(filepath1).getContentAsJson();
  const secondJson = new Parser(filepath2).getContentAsJson();

  return getDiffBetweenJsonObjects(firstJson, secondJson);
};

const gendiff = (filepath1, filepath2) => convertDiffToString(
  getDiffBetweenFiles(filepath1, filepath2),
);

export default gendiff;
export {
  getDiffBetweenJsonObjects,
};
