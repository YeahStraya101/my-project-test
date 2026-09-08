const express = require('express');
const http = require('http');
const { uvPath } = require('@titaniumnetwork-dev/ultraviolet');
const app = express();
const server = http.createServer(app);

// Serves the Ultraviolet encryption scripts
app.use('/uv/', express.static(uvPath));

app.get('/', (req, res) => {
    res.send(`
        <html>
        <body style="font-family:sans-serif; text-align:center; padding-top:50px; background:#121212; color:white;">
            <h1>Secure Portal Live</h1>
            <p>Type the URL below to visit encrypted:</p>
            <input type="text" id="url" value="https://spotify.com" style="padding:10px; width:300px;">
            <button onclick="go()" style="padding:10px;">Go</button>
            <script src="/uv/uv.bundle.js"></script>
            <script src="/uv/uv.config.js"></script>
            <script>
                function go() {
                    const url = document.getElementById('url').value;
                    // Scrambles the destination using basic Ultraviolet encoding
                    window.location.href = '/uv/service/' + __uv$config.encodeUrl(url);
                }
            </script>
        </body>
        </html>
    `);
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Encrypted proxy running on port ${port}`);
});
