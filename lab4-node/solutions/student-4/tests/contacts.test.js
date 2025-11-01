import { contactsByType } from '../src/bot/repo/contacts.js';

test('contactsByType contains required services', () => {
  expect(contactsByType['водоснабжение']).toBeDefined();
  expect(contactsByType['отопление']).toBeDefined();
  expect(contactsByType['электроснабжение']).toBeDefined();

  const e = contactsByType['электроснабжение'];
  expect(typeof e.name).toBe('string');
  expect(typeof e.phone).toBe('string');
});
