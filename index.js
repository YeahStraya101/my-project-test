javascriptconst express = require('express');
const Unblocker = require('unblocker');
const app = express();

const unblocker = new Unblocker({prefix: '/proxy/'});
app.use(unblocker);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
}).on('upgrade', unblocker.onUpgrade);
