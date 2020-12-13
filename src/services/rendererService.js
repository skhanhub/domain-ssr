const fs = require('fs');
const util = require('util');
const React = require('react');
const PropTypes = require('prop-types');
const { ObjectId } = require('mongoose').Types;
const ReactDOMServer = require('react-dom/server');

global.React = React;
global.React.PropTypes = PropTypes;
const app = require('../public/main').default;
const userDbServices = require('./userDbServices');

// promisify the async readfile function
const readFile = util.promisify(fs.readFile);

module.exports = async (reqId, path) => {
  let hCardProps = {
    givenName: 'Sam',
    surname: 'Fairfax',
    email: 'sam.fairfax@fairfaxmedia.com.au',
    phone: '0292822833',
    houseNumber: '100',
    street: 'Harris Street',
    suburb: 'Pyrmont',
    state: 'NSW',
    postcode: '2009',
    country: 'Australia',
  };

  const filter = {
    _id: ObjectId(reqId),
  };
  const dbModel = await userDbServices.find(filter);

  if (dbModel) {
    hCardProps = { ...hCardProps, ...dbModel.toObject() };
  }

  const data = await readFile(path, 'utf8');

  data.replace(
    '<div class="HcardApp"></div>',
    `<div class="HcardApp">
      ${ReactDOMServer.renderToString(React.createElement(app, hCardProps))}
    </div>`
  ); // end replace

  return data.replace('hCardProps', `${JSON.stringify(hCardProps)}`);
}; // end function
