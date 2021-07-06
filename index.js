const fetch = require('node-fetch');
const tools = require('tools');
const config = require('./config');


function notify(txt, callback) {
  fetch(config.notify_url, {
    method: 'POST',
    body: JSON.stringify({ txt: tools.textify(txt, false) }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => response.text())
    .then((data) => {
      if (callback) return callback(data);
    })
    .catch((e) => {
      console.error(e);
    });

}


module.exports = notify;
