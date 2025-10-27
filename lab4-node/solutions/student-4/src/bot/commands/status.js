import { getLastReports } from '../repo/reports.js';
import { contactsByType } from '../repo/contacts.js';

export function registerStatusHandler(bot) {
  bot.command('status', async(ctx) => {
    const list = getLastReports(ctx.chat.id, 3);

    if(list.length === 0) {
      return ctx.reply('У вас пока нет заявок. Отправьте новую: /report');
    }

    let msg = 'Последние заявки:\n\n';
    for(const r of list) {
      const contact = contactsByType[r.type] || { name: 'Неизвестно', phone: '-' };
      msg +=
        `#${r.id}\n` +
        `Тип: ${r.type}\n` +
        `Адрес: ${r.address}\n` +
        `Статус: ${r.status}\n`;
      if (r.measures) msg += `Меры: ${r.measures}\n`;
      msg += `Ответственные: ${contact.name}, ${contact.phone}\n\n`;
    }

    return ctx.reply(msg.trim());
  });
}
