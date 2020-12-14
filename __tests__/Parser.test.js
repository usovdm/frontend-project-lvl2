import Parser from '../src/Parser';

describe('Parser', () => {
  it('throws error of unavailable extension', () => {
    expect(() => new Parser('file.xml')).toThrow();
  });
});
