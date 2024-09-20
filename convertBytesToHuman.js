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
  if (typeof bytes !== 'number' | bytes < 0 | isNaN(bytes)){
    return false;
  }
  var n = 1024;
  var sizes = ['байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];
  var res;
  if (bytes < n){
    return bytes.toFixed(0) + ' ' + sizes[0];
  }
  else {
    res = bytes/n; 
  }

  if (res < n){
    return Number.isInteger(res) ? res + ' ' + sizes[1] : res.toFixed(2) + ' ' + sizes[1];
  }
  else if ((res >= n)&&(res < n*n)){
    return Number.isInteger(res/n) ? res/n + ' ' + sizes[2] : (res/n).toFixed(2) + ' ' + sizes[2];
  }
  else if ((res >= n*n)&&(res < n*n*n)){
    return Number.isInteger(res/(n*n)) ? res/(n*n) + ' ' + sizes[3] : (res/(n*n)).toFixed(2) + ' ' + sizes[3];
  }
  else if (res >= n*n*n){
    return Number.isInteger(res/(n*n*n)) ? res/(n*n*n) + ' ' + sizes[4] : (res/(n*n*n)).toFixed(2) + ' ' + sizes[4];
  }
 
}
