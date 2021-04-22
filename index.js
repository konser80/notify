const fetch = require('node-fetch');
const config = require('./config.js');
const useful = require('../useful/useful.js');

module.exports = async function notify(txt) {
  const response = await fetch(config.notify_url, {
    method: 'POST',
    body: JSON.stringify({ txt: useful.textify(txt, false) }),
    headers: { 'Content-Type': 'application/json' }
  });

  return response;
}
