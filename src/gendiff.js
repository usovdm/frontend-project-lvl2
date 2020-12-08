import fs from 'fs';
import _ from 'lodash';

const getDiffBetweenJsonFiles = (filepath1, filepath2) => {
  const firstFileContent = fs.readFileSync(filepath1);
  const secondFileContent = fs.readFileSync(filepath2);

  const firstJson = JSON.parse(firstFileContent);
  const secondJson = JSON.parse(secondFileContent);

  const keys = _.concat(
    Object.getOwnPropertyNames(firstJson),
    Object.getOwnPropertyNames(secondJson),
  );

  const sortedKeys = _.sortBy(_.uniq(keys));

  const diffObject = sortedKeys.map((key) => ({
    key,
    changed: firstJson[key] !== secondJson[key],
    left: firstJson[key],
    right: secondJson[key],
  }));

  return diffObject;
};

const getDiffString = (diffObject) => {
  const result = [];
  result.push('{');
  diffObject
    .forEach(({
      key, changed, left, right,
    }) => {
      if (changed === false) {
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

const gendiff = (filepath1, filepath2) => getDiffString(
  getDiffBetweenJsonFiles(filepath1, filepath2),
);

export default gendiff;
