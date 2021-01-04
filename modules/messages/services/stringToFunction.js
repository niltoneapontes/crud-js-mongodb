function StringToFunction(string) {
  const [params, body] = string.split('=>').map(stringItem => stringItem.trim());
  const parsedParams = params.slice(2, params.length - 2).split(',');
  const response = new Function(parsedParams, body);
  return response;
}

module.exports = StringToFunction;