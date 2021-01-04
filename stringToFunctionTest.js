const str = '({ a, b }) => { const c = a + b; return 10*c }';

const paramsArray = str.split('=>').map(string => string.trim());
const params = paramsArray[0].slice(2, paramsArray[0].length - 2).split(',');
const fun = new Function(params, paramsArray[1]);

console.log(fun(2, 4))