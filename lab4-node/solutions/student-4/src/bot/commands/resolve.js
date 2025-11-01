import { resolveReportById } from '../repo/reports.js';

export function registerResolveHandler(bot) {
  bot.command('resolve', async (ctx) => {
    const text = ctx.message.text || '';
    // матчим: /resolve [@bot] <id> <любой текст мер>
    const m = text.match(/^\/resolve(?:@\w+)?\s+(\S+)\s+([\s\S]+)$/i);

    if (!m) {
      return ctx.reply('Формат: /resolve id описание_мер\nПример: /resolve 94dv36 Бригада выехала');
    }

    // на всякий случай уберём случайные <> вокруг id
    const id = m[1].replace(/^<|>$/g, '');
    const measures = m[2].trim();

    if (!id || !measures) {
      return ctx.reply('Формат: /resolve id описание_мер\nПример: /resolve 94dv36 Бригада выехала');
    }

    const res = resolveReportById(id, measures);
    if (!res.ok) {
      return ctx.reply(`Заявка #${id} не найдена.`);
    }

    await ctx.reply(`Заявка #${id} отмечена как resolved. Меры: ${measures}`);

    // уведомим автора заявки, если команда пришла из другого чата
    if (res.chatId !== ctx.chat.id) {
      try {
        await ctx.telegram.sendMessage(
          res.chatId,
          `📢 Обновление по вашей заявке #${id}:\n${measures}`
        );
      } catch(err) {
        console.warn('Не смог отправить уведомление пользователю:', err?.message);
      }
    }
  });
}
