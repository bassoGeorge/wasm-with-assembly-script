// 1. Addition
export function add(a: i32, b: i32): i32 {
    return a + b;
}


// 2. Factorial

declare function printFactorialToDOM(value: i64): void;

export function printFactorial(n: i32): void {
    const result: i64 = calcFactorial(1, i64(n));

    printFactorialToDOM(result);
}

function calcFactorial(acc: i64, n: i64): i64 {
    if (n == 0) {
        return acc;
    } else {
        return calcFactorial(acc * n, n - 1);
    }
}

