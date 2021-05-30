const fetch = require('node-fetch');
const useful = require('useful');
const config = require('./config');


function notify(txt, callback) {
  fetch(config.notify_url, {
    method: 'POST',
    body: JSON.stringify({ txt: useful.textify(txt, false) }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.text())
  .then(data => { return callback && callback(data) })
  .catch(e => { console.error(e) });

  // if (callback) return callback(response);
}


module.exports = notify;
