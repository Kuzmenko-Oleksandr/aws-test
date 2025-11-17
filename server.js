const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is working');
});

app.get('/ping', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.post('/test', (req, res) => {
    res.json({ body: req.body });
});