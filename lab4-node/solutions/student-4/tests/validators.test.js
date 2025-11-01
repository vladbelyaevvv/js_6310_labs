import {
  TYPES,
  isValidType,
  isValidDescription,
  isValidAddress,
  isValidContact
} from '../src/validators/reportValidator.js';

test('types list has required items', () => {
  expect(TYPES).toEqual(expect.arrayContaining(['водоснабжение', 'отопление', 'электроснабжение']));
});

test('type validator', () => {
  expect(isValidType('вОдОсНаБжЕнИе')).toBe(true);
  expect(isValidType('мусор')).toBe(false);
});

test('description validator', () => {
  expect(isValidDescription('есть проблема')).toBe(true);
  expect(isValidDescription(' ок ')).toBe(false);
});

test('address validator', () => {
  expect(isValidAddress('ул. Тест, 1')).toBe(true);
  expect(isValidAddress('  ')).toBe(false);
});

test('contact validator', () => {
  expect(isValidContact('test@mail.com')).toBe(true);
  expect(isValidContact('+7 (999) 123-45-67')).toBe(true);
  expect(isValidContact('abc')).toBe(false);
});
