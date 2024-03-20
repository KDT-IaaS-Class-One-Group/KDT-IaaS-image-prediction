/**
 * 배열에서 주어진 단어를 확인하는 함수입니다.
 * toLowerCase() 메서드를 사용하여 대소문자를 구분하지 않습니다.
 *
 * @param {string} word 확인할 단어
 * @param {string[]} array 확인할 배열
 * @returns {boolean} 배열에 단어가 포함되어 있는지 여부를 나타내는 boolean 값
 *
 * @example
 * const words = ['apple', 'banana', 'cherry'];
 * const result = wordChecker('banana', words);
 * console.log(result); // Output: true
 */
export function checkWordInArray(word: string, array: string[]): boolean {
  const lowerCaseWord = word.toLowerCase();
  const lowerCaseArray = array.map((item) => item.toLowerCase());

  return lowerCaseArray.includes(lowerCaseWord);
}
