module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'domain',
    },
    binary: {
      version: '4.4.1', // Version of MongoDB
      skipMD5: true,
    },
    autoStart: false,
  },
};
