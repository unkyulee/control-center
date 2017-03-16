require('../less/main.less');
import Layout from './layout/Layout.js';

var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <Layout />,
  document.getElementById('content')
);
