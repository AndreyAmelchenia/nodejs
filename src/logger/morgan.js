const morgan = require('morgan');

morgan.token('body', req => JSON.stringify(req.body));
morgan.token('params', req => JSON.stringify(req.params));
morgan.token('query', req => JSON.stringify(req.query));

const optionMorgan = `
  remote-addr: :remote-addr
  method: :method 
  Url: :url
  http-version: HTTP/:http-version" 
  status response: :status
  params: :params
  query: :query
  body: :body 
`;

module.exports = { morgan, optionMorgan };
