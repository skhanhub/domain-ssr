const { ObjectId } = require('mongoose').Types;

const userDbServices = require('../services/userDbServices');

module.exports = {
  async submit(req, res) {
    try {
      const { reqId } = req.session;
      const filter = {
        _id: ObjectId(reqId),
      };

      const dbModel = await userDbServices.save(filter, { ...req.body });

      req.session.reqId = dbModel._id;

      res.json(dbModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  async update(req, res) {
    try {
      const { reqId } = req.session;
      const filter = {
        _id: ObjectId(reqId),
      };

      const dbModel = await userDbServices.save(filter, { ...req.body });
      req.session.reqId = dbModel._id;
      res.json(dbModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
};
