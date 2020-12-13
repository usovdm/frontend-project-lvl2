import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import yaml from 'js-yaml';

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

export const getExt = (filepath) => {
  const extension = path.extname(filepath);
  return extension || '.json';
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
  const firstFileContent = fs.readFileSync(filepath1);
  const secondFileContent = fs.readFileSync(filepath2);

  let firstJson;
  let secondJson;

  const firstExtension = getExt(filepath1);
  if (firstExtension === '.json') {
    firstJson = JSON.parse(firstFileContent);
  } else if (firstExtension === '.yaml') {
    firstJson = yaml.safeLoad(firstFileContent);
  } else {
    throw new Error('unexpected extension of file1');
  }

  const secondExtension = getExt(filepath2);
  if (secondExtension === '.json') {
    secondJson = JSON.parse(secondFileContent);
  } else if (secondExtension === '.yaml') {
    secondJson = yaml.safeLoad(secondFileContent);
  } else {
    throw new Error('unexpected extension of file2');
  }

  return getDiffBetweenJsonObjects(firstJson, secondJson);
};

const gendiff = (filepath1, filepath2) => convertDiffToString(
  getDiffBetweenFiles(filepath1, filepath2),
);

export default gendiff;
export {
  getDiffBetweenJsonObjects,
};
