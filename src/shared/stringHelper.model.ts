/**Metodo che consente di sostituire un carattere presente ad un certo indice
 * @word parola in cui sostituire il carattere
 * @index indice a cui è presente il carattere da sostituire
 * @chr carattere da sostituire
 */
export function setCharAt(word: string, index: number, chr: string): string {
  if (index > word.length - 1) return word;
  return word.substring(0, index) + chr + word.substring(index + 1);
}

/**Metodo che permette la sostituzione di tutte le occorrenze di una sottostirnga all'interno di una stringa
 * @substrToSostitute tag da sostituire
 * @substrSostitution elemento con cui sostituire il tag
 * @str stringa restituita */
export function replaceAll(substrToSostitute: string, substrSostitution: string, str: string): string {
  str = str.split(substrToSostitute).join(substrSostitution);
  return str;
}

/**Metodo che permette di ottenere una stirnga con le lettere invertite rispetto alla stringa originale */
export function reverseWord(word: string) {
  const asArr: string[] = word.split('').reverse();
  const reverse: string = arrayAsStringNoComma(asArr);
  return reverse;
}

/**Metodo che permette la conversione di un array a stringa senza che al suo interno vi siano le virgole */
export function arrayAsStringNoComma(array: string[]): string {
  let arrAsStr = '';
  array.forEach((element) => {
    arrAsStr += element;
  });
  return arrAsStr;
}

/**Funzione che rende maiuscola la prima lettera della parola passata come parametro
 * @param word parola la cui prima lettera è da rendere maiuscola
 */
export function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// #region string Split words my multiple splitters

export function SplitWordsBy(words: string[], splitters: string[]): string[][] {
  const matrix: string[][] = [];
  words.forEach((logicCond) => {
    const splitted = SplitBy(logicCond, splitters);
    matrix.push(splitted);
  });

  return matrix;
}

/// <summary>
/// Method to split the given word by the
/// specified substrings array.
/// </summary>
/// <param name="where">Word to split</param>
/// <param name="splitters">Splitter tokens</param>
/// <returns></returns>
export function SplitBy(where: string, splitters: string[]): string[] {
  let splitted: string[] = [];

  for (const split of splitters) {
    splitted = where.split(split);
    if (splitted.length > 1) break;
  }

  return splitted;
}

/// <summary>
/// Method splitting the specified string using the specified token.
/// It will split the given word when it's not been splitted already.
/// (splitted == null)
/// </summary>
/// <param name="where">Word to split</param>
/// <param name="splitter">splitter token</param>
/// <param name="splitted"></param>
/// <returns></returns>
export function Split(where: string, splitter: string, splitted: string[]): string[] {
  const splittedHere: string[] = [];
  if (splitted == null) {
    return where.split(splitter);
  } else if (splitted.length === 0) {
    return where.split(splitter);
  } else {
    splitted.forEach((split) => {
      const temp = split.split(splitter);

      temp.forEach((item) => {
        let el = item;
        if (item[0] === ' ') {
          el = ReplaceFirst(item, ' ', '');
        }
        splittedHere.push(el);
      });
    });

    return splittedHere;
  }
}

/// <summary>
/// Method replacing only the first occurance
/// of a specified substring into a given string.
/// </summary>
/// <param name="text"></param>
/// <param name="search"></param>
/// <param name="replace"></param>
/// <returns></returns>
export function ReplaceFirst(text: string, search: string, replace: string): string {
  const pos = text.indexOf(search);
  if (pos < 0) {
    return text;
  }
  return text.substring(0, pos) + replace + text.substring(pos + search.length);
}

// #endregion

export function generateUUID() {
  // Public Domain/MIT
  let d = new Date().getTime(); //Timestamp
  let d2 = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// #region checks on string

/**Function checking if the given string only contains spaces */
export function containsOnlySpaces(word: string): boolean {
  if (word === '') return false;
  for (let index = 0; index < word.length; index++) {
    if (word[index] !== ' ') return false;
  }
  return true;
}

// #endregion

// #region helpers methods

/**Metodo che ritorna il numero di volte che una sottostringa è contneuta in una stringa
 * @param word contente le sottostringhe da contare
 * @param subword sottostringa da contare
 */
export function substringOccurrencesNumber(word: string, subword: string) {
  let num = -1;
  const arr = word.split(subword);
  num = arr.length - 1;
  return num;
}

/**Funzione che trova tutti i tokens nella stringa che cominciano e finiscono con una stessa lettera. */
export function findTokensIn(word: string, firstLastChar: string) {
  const tokens = [];
  const initIndexes = getAllIndexes(word, firstLastChar);
  if (initIndexes.length % 2 !== 0) return null;
  // Separo gli indici a coppie di due per comodità
  const couples = [];
  for (let i = 0; i < initIndexes.length; i++) {
    const couple = {
      first: initIndexes[i],
      second: initIndexes[++i] + 1,
    };
    couples.push(couple);
  }
  // Estraggo i tokens usando le coppie di indici del carattere specificato
  for (const couple of couples) {
    tokens.push(getWordByIndexes(word, couple.first, couple.second));
  }

  return tokens;
}

export function getAllIndexes(word: string, val: string) {
  const indexes: number[] = [];
  let i = -1;
  while ((i = word.indexOf(val, i + 1)) !== -1) {
    indexes.push(i);
  }
  return indexes;
}

/**Method getting the subword included between the given indexes AGGIUNGERE AGLI HELPERS */
export function getWordByIndexes(input: string, start: number, end: number) {
  return input.substring(start, end);
}

// #endregion

export function addHexColor(c1: string, c2: string) {
  if (c1 == null) return null;
  if (c2 == null) return null;
  c1 = c1.includes('#') ? c1.replace('#', '') : c1;
  c2 = c2.includes('#') ? c2.replace('#', '') : c2;
  var hexStr = (parseInt(c1, 16) + parseInt(c2, 16)).toString(16);
  while (hexStr.length < 6) {
    hexStr = '0' + hexStr;
  } // Zero pad.
  return hexStr;
}
