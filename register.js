const { addHook } = require("pirates");
const terser = require(process.env.TERSER_PATH || "terser");
const cloneDeep = require("lodash/cloneDeep");

if (global.__REQUIRE_TERSER__) {
  throw new Error("@terser/require-terser imported twice");
}

global.__REQUIRE_TERSER__ = true;

module.exports = config => {
    const compile = (inputCode, filename) => {
      const { error, code } = terser.minify(inputCode, cloneDeep(config));
      if (error) throw error;
      return code;
    };

    addHook(compile, {
      exts: [".js"],
      ignoreNodeModules: false
    });
};
