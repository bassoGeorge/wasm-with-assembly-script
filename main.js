const loadWasm = (
  () => {
    let loadedWasm;

    return async function () {
      if (loadedWasm) {
        return loadedWasm;
      }

      loadedWasm = await WebAssembly.instantiateStreaming(
        fetch('./build/optimized.wasm'),
        {
          env: {
            abort: () => console.log("Wasm aborted!")
          },
          index: {
            printFactorialToDOM: (value) => document.getElementById('factorial-result').value = value.toLocaleString()
          }
        }
      )

      return loadedWasm;
    }
  }
)()

async function addFromWASM() {
  const wasmModule = await loadWasm();
  const a = document.getElementById('add-a').value;
  const b = document.getElementById('add-b').value;

  const result = wasmModule.instance.exports.add(a, b);

  document.getElementById('add-result').value = result.toLocaleString();
}

async function printUsingWASM() {
  const wasmModule = await loadWasm();
  const inputValue = document.getElementById('factorial-input').value;

  wasmModule.instance.exports.printFactorial(inputValue);
}

function setup() {
  document.getElementById('add-button').addEventListener('click', addFromWASM)
  document.getElementById('factorial-button').addEventListener('click', printUsingWASM)
}

setup();

