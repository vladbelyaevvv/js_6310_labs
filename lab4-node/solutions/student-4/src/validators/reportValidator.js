// Допустимые типы проблем
export const TYPES = ['водоснабжение', 'отопление', 'электроснабжение'];

/** Валиден ли тип проблемы */
export function isValidType(text) {
  const v = String(text || '').trim().toLowerCase();
  return TYPES.includes(v);
}

/** Валидное ли описание (минимум 5 символов) */
export function isValidDescription(text) {
  return typeof text === 'string' && text.trim().length >= 5;
}

/** Валиден ли адрес (минимум 3 символа) */
export function isValidAddress(text) {
  return typeof text === 'string' && text.trim().length >= 3;
}

/** Валидный ли контакт: телефон (≥7 цифр) или базовый email */
export function isValidContact(text) {
  const s = String(text || '').trim();
  const phoneOk = s.replace(/\D/g, '').length >= 7;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  return phoneOk || emailOk;
}