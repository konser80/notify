const fetch = require('node-fetch');
const tools = require('tools');
const config = require('./config');

const DEBUG = false;

let job = null;
let array = {};

// ==============================================
function onEvent(param) {
  if (DEBUG) console.debug(`onEvent: ${param}`);

  const txt = tools.textify(param, { colors: false });
  array[txt] = array[txt] +1 || 1;

  if (job) clearTimeout(job);
  job = setTimeout(onTimer, 1500);
}

// ==============================================
function onTimer() {

  if (DEBUG) console.debug('[+] notify: sending array');
  if (DEBUG) console.debug(array);

  Object.keys(array).forEach((key) => {
    let text = key;
    if (array[key] > 1) text += ` [count: ${array[key]}]`;

    if (DEBUG) console.debug(`[ ] sending text: ${text}`);

    // ready? send!
    fetch(config.notify_url, {
      method: 'POST',
      body: JSON.stringify({ txt: text }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.text())
      // .then((data) => {
      // if (callback) return callback(data);
      // console.debug(`[+] notify response: ${data}`);
      // })
      .catch((e) => {
        console.error(`[-] notify error: ${e.message}`);
      });

  });

  if (DEBUG) console.debug('[+] notify: clear array');
  array = {};
}


module.exports = onEvent;
