import { getLastReports } from '../repo/reports.js';

export function registerStatusHandler(bot) {
  bot.command('status', async(ctx) => {
    const list = getLastReports(ctx.chat.id, 3);
    if(list.length === 0) {
      return ctx.reply('У вас пока нет заявок. Отправьте новую: /report');
    }

    let msg = 'Последние заявки:\n\n';
    for(const r of list) {
      msg += `#${r.id}\nТип: ${r.type}\nАдрес: ${r.address}\nСтатус: ${r.status}\n\n`;
    }
    return ctx.reply(msg);
  });
}
