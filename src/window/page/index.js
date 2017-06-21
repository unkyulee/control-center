
// Use React
import React from 'react'
import ReactDOM from 'react-dom'

// Import Pallet Main Layout
import PageMainLayout from './view/layout.js'

// import style sheet
require('../../style/page/base.less')

ReactDOM.render(
  <PageMainLayout />,
  document.getElementById('data')
);
