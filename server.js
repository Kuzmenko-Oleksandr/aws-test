const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.json());

// health-check open
app.get('/ping', (req, res) => {
    res.json({ status: 'ok' });
});

// 🔐 middleware
function apiKeyMiddleware(req, res, next) {
    // берём ключ из заголовка
    const key = req.header('x-api-key');

    if (!API_KEY) {
        console.warn('API_KEY env is not set');
        return res.status(500).json({ error: 'Server misconfigured' });
    }

    if (!key || key !== API_KEY) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    next();
}


app.use('/api', apiKeyMiddleware);


app.get('/api/secret', (req, res) => {
    res.json({ data: 'Secret data for Denis‍️' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});