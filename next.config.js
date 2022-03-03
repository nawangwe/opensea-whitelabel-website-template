var fs = require('fs');

module.exports = {
  images: {
    domains: [
      'storage.googleapis.com',
      'lh1.googleusercontent.com',
      'lh2.googleusercontent.com',
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh5.googleusercontent.com',
      'lh6.googleusercontent.com',
    ],
  },
  env: {
    noflash: fs.readFileSync('./noflash.js').toString(),
    OPEN_SEA_API_KEY: 'YOUR OPEN SEA API KEY', // replace with your API KEY make sure you don't commit this
  }
}