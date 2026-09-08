const express = require('express');
const app = express();
const Corrosion = require('corrosion');

const proxy = new Corrosion({
    prefix: '/proxy/',
    codec: 'xor'
});

app.use((req, res, next) => {
    if (req.url.startsWith('/proxy/')) {
        return proxy.request(req, res);
    }
    res.send('<h1>Your Proxy Server is Live!</h1><p>Add <b>/proxy/https://spotify.com</b> to the end of the URL to browse.</p>');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
