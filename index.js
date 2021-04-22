const fetch = require('node-fetch');
const useful = require('useful');
const config = require('./config.js');

module.exports = async function notify(txt) {
  const response = await fetch(config.notify_url, {
    method: 'POST',
    body: JSON.stringify({ txt: useful.textify(txt, false) }),
    headers: { 'Content-Type': 'application/json' }
  });

  return response;
}
