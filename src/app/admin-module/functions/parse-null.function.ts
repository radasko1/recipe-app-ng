/**
 * If value is 'null' or 'undefined' then return 'null', otherwise return string value of input value
 * @param value
 */
export function parseNull(value: unknown) {
  if (value === null) {
    return null;
  } else if (value === undefined) {
    return null;
  }

  return JSON.stringify(value);
}
