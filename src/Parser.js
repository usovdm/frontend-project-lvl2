import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

class Parser {
  constructor(filepath) {
    this.filepath = filepath;

    this.extension = this.getPathExtension();
    this.parse = this.getParseFn();
  }

  getPathExtension() {
    return path.extname(this.filepath);
  }

  getParseFn() {
    const extensionsFn = {
      '': JSON.parse, // default
      '.json': JSON.parse,
      '.yaml': yaml.safeLoad,
    };
    if (!{}.hasOwnProperty.call(extensionsFn, this.extension)) {
      throw new Error(`unexpected extension ${this.extension}`);
    }

    return extensionsFn[this.extension];
  }

  getContent() {
    return fs.readFileSync(this.filepath);
  }

  getContentAsJson() {
    return this.parse(this.getContent());
  }
}

export default Parser;
