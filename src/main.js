import {loadWASM} from "./load-wasm";

let cachedModule;
const imports = {
  index: {
    printFactorialToDOM(value) {
      document.getElementById('factorial-result').value = value.toLocaleString()
    }
  }
}

async function loadMainWasmModule () {
  if (cachedModule) {
    return cachedModule;
  }

  cachedModule = await loadWASM('/build/optimized.wasm', imports);

  return cachedModule;
}


async function addFromWASM() {
  const wasmModule = await loadMainWasmModule();

  const a = document.getElementById('add-a').value;
  const b = document.getElementById('add-b').value;

  const result = wasmModule.instance.exports.add(a, b);

  document.getElementById('add-result').value = result.toLocaleString();
}

async function printUsingWASM() {
  const wasmModule = await loadMainWasmModule();
  const inputValue = document.getElementById('factorial-input').value;

  wasmModule.instance.exports.printFactorial(inputValue);
}

async function sayHelloUsingWASM() {
  const wasmModule = await loadMainWasmModule();
  const resultPtr = wasmModule.instance.exports.sayHello();

  const { __getString } = wasmModule.exports;

  // noinspection UnnecessaryLocalVariableJS
  const actualResult = __getString(resultPtr);

  document.getElementById('hello-response').value = actualResult;
}

function setup() {
  document.getElementById('add-button').addEventListener('click', addFromWASM)
  document.getElementById('factorial-button').addEventListener('click', printUsingWASM)
  document.getElementById('hello-button').addEventListener('click', sayHelloUsingWASM)
}

setup();

