const fetch = require('node-fetch');
const useful = require('useful');
const config = require('./config.js');


function notify(txt, callback) {
  const response = fetch(config.notify_url, {
    method: 'POST',
    body: JSON.stringify({ txt: useful.textify(txt, false) }),
    headers: { 'Content-Type': 'application/json' }
  }).then(response => response.text())
  .then(data => {
    if (callback) callback(data)
  });

  // if (callback) return callback(response);
}


module.exports = notify;
