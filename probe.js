require('fetch-everywhere');

const INTERVAL = 1 * 1000;

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

async function step () {
    const code = await getCode();
    const buffer = Buffer.from(code, "base64");
    console.log(new Date() + " " + code + " " + buffer.toString("hex"));
    setTimeout(step, INTERVAL);
}

step();