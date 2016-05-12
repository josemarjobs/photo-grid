var configFile = './' + (process.env.NODE_ENV || "development") + ".json"
module.exports = require(configFile)
