const { addHook } = require("pirates");
const compileSync = require('./compile-sync');

if (global.__REQUIRE_TERSER__) {
  throw new Error("@terser/require-terser imported twice");
}

global.__REQUIRE_TERSER__ = true;

module.exports = config => {
  const compile = (inputCode, filename) =>
    compileSync(inputCode, config)

  addHook(compile, {
    exts: [".js"],
    ignoreNodeModules: false
  });
};
