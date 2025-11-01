import { saveReport } from '../repo/reports.js';

import {
  TYPES,
  isValidType,
  isValidDescription,
  isValidAddress,
  isValidContact
} from '../../validators/reportValidator.js';

function resetSession(ctx) {
  ctx.session.state = 'idle';
  ctx.session.data = {};
}

// Удобные ответы
async function askType(ctx) {
  return ctx.reply(
    'Выберите тип проблемы: водоснабжение / отопление / электроснабжение'
  );
}
async function askDescribe(ctx) {
  return ctx.reply('Опишите проблему в нескольких предложениях:');
}
async function askPhotoOrSkip(ctx) {
  return ctx.reply('Прикрепите фото (если есть) или напишите "пропустить".');
}
async function askAddress(ctx) {
  return ctx.reply('Укажите адрес (улица, дом, подъезд/квартира при желании):');
}
async function askContact(ctx) {
  return ctx.reply('Оставьте контакт: телефон или email для обратной связи:');
}
async function askConfirm(ctx) {
  const d = ctx.session.data;
  const hasPhoto = d.photoFileId ? 'да' : 'нет';
  return ctx.reply(
    `Проверьте данные:\n` +
      `Тип: ${d.type}\n` +
      `Описание: ${d.description}\n` +
      `Фото приложено: ${hasPhoto}\n` +
      `Адрес: ${d.address}\n` +
      `Контакт: ${d.contact}\n\n` +
      `Напишите "подтвердить" чтобы отправить, или "исправить тип/описание/фото/адрес/контакт".`
  );
}

export function registerReportHandler(bot) {
  // Точка входа
  bot.command('report', async (ctx) => {
    ctx.session.state = 'chooseType';
    ctx.session.data = {};
    await ctx.reply('Запускаю сбор жалобы…');
    return askType(ctx);
  });

  // Приём фото (только в состоянии photoOrSkip)
  bot.on('photo', async (ctx, next) => {
    if (ctx.session.state !== 'photoOrSkip') return next();

    const photos = ctx.message.photo;
    const best = photos[photos.length - 1]; // самое крупное
    ctx.session.data.photoFileId = best.file_id;

    ctx.session.state = 'address';
    await ctx.reply('Фото сохранено.');
    return askAddress(ctx);
  });

  // Приём текста в разных состояниях
  bot.on('text', async (ctx, next) => {
    const state = ctx.session.state;
    const text = ctx.message.text.trim();

    // Игнор спец-команд: их ловит index.js (/cancel)
    if (text.startsWith('/')) return next();

    // Обрабатываем только "свои" состояния, иначе пропускаем дальше
    const handledStates = ['chooseType', 'describe', 'photoOrSkip', 'address', 'contact', 'confirm'];
    if (!handledStates.includes(state)) {
      return next(); // важно: отдаём управление, чтобы /rating мог поймать число
    }

    // FSM
    switch (state) {
    case 'chooseType': {
      if (!isValidType(text)) {
        return ctx.reply(
          `Некорректный тип. Допустимо: ${TYPES.join(' / ')}.`
        );
      }
      ctx.session.data.type = text.toLowerCase();
      ctx.session.state = 'describe';
      return askDescribe(ctx);
    }

    case 'describe': {
      if (!isValidDescription(text)) {
        return ctx.reply('Слишком коротко. Опишите проблему подробнее (≥ 5 символов).');
      }
      ctx.session.data.description = text;
      ctx.session.state = 'photoOrSkip';
      return askPhotoOrSkip(ctx);
    }

    case 'photoOrSkip': {
      // Пользователь решил пропустить фото
      if (text.toLowerCase() === 'пропустить') {
        ctx.session.data.photoFileId = null;
        ctx.session.state = 'address';
        return askAddress(ctx);
      }
      // Если это был текст (а не фото) — попросим фото или "пропустить"
      return ctx.reply('Пришлите фото или напишите "пропустить".');
    }

    case 'address': {
      if (!isValidAddress(text)) {
        return ctx.reply('Адрес слишком короткий. Укажите корректный адрес (≥ 3 символов).');
      }
      ctx.session.data.address = text;
      ctx.session.state = 'contact';
      return askContact(ctx);
    }

    case 'contact': {
      if (!isValidContact(text)) {
        return ctx.reply('Укажите телефон (7+ цифр) или валидный email.');
      }
      ctx.session.data.contact = text;
      ctx.session.state = 'confirm';
      return askConfirm(ctx);
    } 

    case 'confirm': {
      const v = text.toLowerCase();

      if (v === 'подтвердить') {
        // Здесь можно сохранить в БД/файл. Пока — просто сгенерим ID.
        const complaintId = Math.random().toString(36).slice(2, 8);
        ctx.session.data.id = complaintId;
        ctx.session.data.status = 'sent';
        saveReport(ctx.chat.id, {...ctx.session.data});
        await ctx.reply(
          `✅ Заявка отправлена! Номер: ${complaintId}\nПроверить: /status`
        );
        resetSession(ctx);
        return;
      }

      // Исправления по полям
      if (v === 'исправить тип') {
        ctx.session.state = 'chooseType';
        return askType(ctx);
      }
      if (v === 'исправить описание') {
        ctx.session.state = 'describe';
        return askDescribe(ctx);
      }
      if (v === 'исправить фото') {
        ctx.session.state = 'photoOrSkip';
        return askPhotoOrSkip(ctx);
      }
      if (v === 'исправить адрес') {
        ctx.session.state = 'address';
        return askAddress(ctx);
      }
      if (v === 'исправить контакт') {
        ctx.session.state = 'contact';
        return askContact(ctx);
      }

      return ctx.reply(
        'Напишите "подтвердить" или "исправить тип/описание/фото/адрес/контакт".'
      );
    }
    }
  });
}
