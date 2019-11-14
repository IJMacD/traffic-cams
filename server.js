require('fetch-everywhere');
const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, "build");
const port = process.env.port || 3000;

async function getCode () {
    const r = await fetch('https://traffic.td.gov.hk/ClickProcessor.do', {
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "dot_id=021105&area_id=kl"
    });

    const text = await r.text();
    const match = /time=([a-zA-Z0-9/+=]+)/.exec(text);
    if (match) {
        return match[1];
    }
}

app.use(express.static(publicPath));

app.get("/timecode", async (req, res) => {
    const code = await getCode();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.write(code);
    res.end();
});

app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});