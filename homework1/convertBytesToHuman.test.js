/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman('string')).toBe(false)
  expect(convertBytesToHuman('boolean')).toBe(false)
  expect(convertBytesToHuman(undefined)).toBe(false)
  expect(convertBytesToHuman(null)).toBe(false)
  expect(convertBytesToHuman(NaN)).toBe(false)
  expect(convertBytesToHuman([])).toBe(false)
  expect(convertBytesToHuman({})).toBe(false)
  expect(convertBytesToHuman(Infinity)).toBe(false)
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(30)).toBe('30 байт')
  expect(convertBytesToHuman(1024)).toBe('1 КБ')
  expect(convertBytesToHuman(1048576)).toBe('1 МБ')
  expect(convertBytesToHuman(1073741824)).toBe('1 ГБ')
  expect(convertBytesToHuman(1099511627776)).toBe('1 ТБ')
  expect(convertBytesToHuman(123123123)).toBe('117.42 МБ')
  expect(convertBytesToHuman(0)).toBe('0 байт');
  expect(convertBytesToHuman(1023)).toBe('1023 байт');
});

test('Возвращает false для отрицательных чисел', () => {
  expect(convertBytesToHuman(-1)).toBe(false)
});



// другая группа проверок
