export function registerRatingHandler(bot) {
  bot.command('rating', async (ctx) => {
    ctx.session.state = 'awaitRating';
    await ctx.reply('Оцените работу служб по шкале 1–5 (числом).');
  });

  bot.on('text', async (ctx, next) => {
    if (ctx.session.state !== 'awaitRating') return next();
    const v = ctx.message.text.trim();

    const n = Number(v);
    const valid = Number.isInteger(n) && n >= 1 && n <= 5;
    if (!valid) {
      return ctx.reply('Введите целое число от 1 до 5.');
    }

    // Сохраним рейтинг в сессии (в реальности — в хранилище)
    ctx.session.rating = n;
    ctx.session.state = 'idle';
    return ctx.reply(`Спасибо! Ваша оценка: ${n}/5`);
  });
}
