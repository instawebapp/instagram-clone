export function hasFunction(str) {
  // P and M
  let p = 31;
  let m = 1e9 + 9;
  let power_of_p = 1;
  let hash_val = 0;

  // Loop to calculate the hash value
  // by iterating over the elements of String
  for (let i = 0; i < str.length; i++) {
    hash_val =
      (hash_val + (str[i].charCodeAt() - "a".charCodeAt() + 1) * power_of_p) %
      m;
    power_of_p = (power_of_p * p) % m;
  }
  return hash_val;
}
