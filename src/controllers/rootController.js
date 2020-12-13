const path = require('path');

const renderer = require('../services/rendererService');

module.exports = {
  getHomePage: async (req, res) => {
    try {
      const reqId = req.session && req.session.reqId;
      const htmlString = await renderer(
        reqId,
        path.resolve(__dirname, '../public/index.html')
      );
      return res.status(200).send(htmlString);
    } catch (err) {
      return res.status(500).send('Some error happened');
    }
  },
};
