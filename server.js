const express = require('express');
const cors = require('cors');

const app = express();

// важно: слушаем порт из ENV, как любит AWS
const PORT = process.env.PORT || 3000;

app.use(cors());           // чтобы Flutter Web тоже мог ходить
app.use(express.json());   // чтобы читать JSON из body

// пример GET
app.get('/api/ping', (req, res) => {
    res.json({ ok: true });
});

// пример POST
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    // тут логика авторизации
    res.json({ token: 'fake-jwt-token', user: { email } });
});

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});