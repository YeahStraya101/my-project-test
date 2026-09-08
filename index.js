const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/proxy', createProxyMiddleware({
    router: (req) => {
        // Automatically reads the target from the URL query
        return req.query.url;
    },
    changeOrigin: true,
    pathRewrite: (path, req) => {
        // Cleans up the path before sending the request
        return '';
    },
    logger: console
}));

app.get('/', (req, res) => {
    res.send('<h1>Your Proxy Server is Live!</h1><p>To browse, add <b>/proxy?url=https://spotify.com</b> to the end of your link.</p>');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
