import loader from "@assemblyscript/loader"

const defaultWASMImports = {
  env: {
    abort() {
      console.error("WASM aborted!");
    }
  }
}

export async function loadWASM(url, imports = {}) {
  const httpPromise = fetch(url);
  const importObject = {
    ...defaultWASMImports,
    ...imports
  }

  if (loader.instantiateStreaming) {
    return loader.instantiateStreaming(httpPromise, importObject);
  } else {
    const response = await httpPromise;
    const bytes = await response.arrayBuffer();
    return loader.instantiate(bytes, importObject);
  }
}
