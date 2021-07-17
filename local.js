const fs = require("fs");
const loader = require("@assemblyscript/loader");
const imports = { /* imports go here */
  index: {
    printFactorialToDOM(value) {
      console.log("Assume we are printing to DOM: " + value.toLocaleString());
    }
  }
};

const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), imports);
module.exports = wasmModule.exports;

// node --experimental-wasm-bigint
