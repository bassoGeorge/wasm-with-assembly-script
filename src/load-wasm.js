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

  if (WebAssembly.instantiateStreaming) {
    return WebAssembly.instantiateStreaming(httpPromise, importObject);
  } else {
    const response = await httpPromise;
    const bytes = await response.arrayBuffer();
    return WebAssembly.instantiate(bytes, importObject);
  }
}
