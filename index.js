const fetch = require('node-fetch');
const tools = require('tools');
const config = require('./config');

let job = null;
let array = {};

function onEvent(param) {

  const txt = tools.textify(param, { colors: false });
  array[txt] = array[txt] +1 || 1;

  if (job) clearTimeout(job);
  job = setTimeout(onTimer, 1500);
}

// ==============================================
function onTimer() {

  // console.debug('[+] notify: sending array');
  // console.debug(array);

  Object.keys(array).forEach((key) => {
    let text = key;
    if (array[key] > 1) text += ` [count: ${array[key]}]`;

    // console.debug(`[ ] sending text: ${text}`);

    // ready? send!
    fetch(config.notify_url, {
      method: 'POST',
      body: JSON.stringify({ txt: text }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.text())
      .then((data) => {
        // if (callback) return callback(data);
        console.debug(`[+] notify response: ${data}`);
      })
      .catch((e) => {
        console.error(`[-] notify error: ${e.message}`);
      });

  });

  // console.debug('[+] notify: clear array');
  array = {};
}


module.exports = onEvent;
