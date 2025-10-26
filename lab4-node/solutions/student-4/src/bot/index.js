import 'dotenv/config';
import { Telegraf, session } from 'telegraf';

const BOT_TOKEN = process.env.BOT_TOKEN;
if(!BOT_TOKEN) {
    console.error('❌ bot token not found in env');
    process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

bot.use(session());

bot.use((ctx, next) => {
    if (!ctx.session) ctx.session = {};
  if (!ctx.session.state) ctx.session.state = 'idle';
  if (!ctx.session.data) ctx.session.data = {};
  return next();
});

//команда /start
bot.start((ctx) =>
    ctx.reply(
        'Привет! Я CityFeedback bot\nДоступные команды:\n/report — отправить жалобу\n/status — статус последних жалоб\n/rating — оценить работу (1–5)\n/cancel — отменить текущую команду'
    )
);

//команда /help
bot.help((ctx) =>
    ctx.reply(
        'Команды:\n/report — отправить жалобу\n/status — статус последних жалоб\n/rating — оценить работу (1–5)\n/cancel — отменить текущую команду'
    )
);

bot.command('cancel', async (ctx) => {
    ctx.session.state = 'idle';
    ctx.session.data = {};
    await ctx.reply('Ок, отменил. Можем начать заново: /report');
});

bot.catch((err, ctx) => {
    console.error('Bot error', ctx.update?.update_id, err);
});

//подключение команд
import { registerReportHandler } from './commands/report.js';
import { registerStatusHandler } from './commands/status.js';
import { registerRatingHandler } from './commands/rating.js';
registerReportHandler(bot);
registerStatusHandler(bot);
registerRatingHandler(bot);

//запуск бота
bot.launch();
console.log('Bot launched ✅');

//правильная остановка бота
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));