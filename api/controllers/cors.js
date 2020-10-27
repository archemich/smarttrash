const whitelist = ['http://localhost:3000', 'https://trash.skbkit.com'];

module.exports = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 ||  !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}