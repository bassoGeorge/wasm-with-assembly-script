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

function setup() {
  document.getElementById('add-button').addEventListener('click', addFromWASM)
  document.getElementById('factorial-button').addEventListener('click', printUsingWASM)
}

setup();

