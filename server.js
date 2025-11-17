const express = require('express');
const cors = require('cors');
const pool = require('./db'); // наш Postgres пул

const app = express();
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.json());

// health-check
app.get('/ping', (req, res) => {
    res.json({ status: 'ok' });
});

// middleware
function apiKeyMiddleware(req, res, next) {
    const key = req.header('x-api-key');

    if (!API_KEY) {
        console.error('API_KEY env is not set');
        return res.status(500).json({ error: 'Server misconfigured' });
    }

    if (!key || key !== API_KEY) {
        return res.status(403).json({ error: 'Forbidden: invalid API key' });
    }

    next();
}

//
app.use('/api', apiKeyMiddleware);

// test to Postgres
app.get('/api/db-test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW() AS now');
        res.json({ ok: true, now: result.rows[0].now });
    } catch (err) {
        console.error('DB error:', err);
        res.status(500).json({ error: 'DB error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name FROM users ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error('DB error:', err);
        res.status(500).json({ error: 'DB error' });
    }
});