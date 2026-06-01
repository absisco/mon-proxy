const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 8080;

app.get('/playlist.m3u', async (req, res) => {
    try {
        const response = await axios.get(process.env.PORTAL_URL, {
            headers: { 'User-Agent': 'Mozilla/5.0', 'X-Mac': process.env.MAC_ADDRESS }
        });
        res.setHeader('Content-Type', 'audio/x-mpegurl');
        res.send(response.data);
    } catch (error) {
        res.status(500).send("Erreur de connexion au fournisseur IPTV");
    }
});

app.listen(port, () => console.log(`Proxy actif sur le port ${port}`));
