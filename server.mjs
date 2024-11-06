import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
const app = express();
const port = 3000;

app.use(cors());

// mi api key
const API_KEY = 'ab0bb4820922da6d82c1869f3f8112d3';
app.get('/weather', async (req, res) => {
    const ciudad = req.query.ciudad;
    if (!ciudad) {
        return res.status(400).json({ error: 'Ciudad no proporcionada' });
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`);
        const data = await response.json();
        if (response.ok) {
            res.json(data);
        } else {
            res.status(404).json({ error: 'Ciudad no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});