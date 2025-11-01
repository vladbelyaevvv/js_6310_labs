import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Проверка, что сервер жив
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'CityFeedback API',
    timestamp: new Date().toISOString()
  });
});

// Корневая страница с подсказкой
app.get('/', (req, res) => {
  res.send(`
    <h2>CityFeedback API 🚀</h2>
    <p>Добро пожаловать! Это сервер для Telegram-бота CityFeedback.</p>
    <p>Проверить состояние можно по адресу: <a href="/health">/health</a></p>
  `);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});
