/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
  // your solution goes here
  if (typeof bytes !== 'number' || bytes < 0 || !isFinite(bytes)){
    return false;
  }
  var n = 1024;
  var sizes = ['байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];
  var index = 0;
  while (bytes >= n){
    bytes = bytes/n;
    index++;
  }
  
  return Number.isInteger(bytes) ? bytes + ' ' + sizes[index] : bytes.toFixed(2) + ' ' + sizes[index];
 
}
