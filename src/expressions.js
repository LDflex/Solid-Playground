import data from '@solid/query-ldflex';

export function isSafe(expression) {
  // An expression is assumed to have no side-effects
  // when it does not contain method calls,
  // which we conservatively identify by a parenthesis
  return !expression.includes('(');
}

export function evaluate(expression) {
  try {
    return data.resolve(expression);
  }
  catch (error) {
    return Promise.reject(error);
  }
}
