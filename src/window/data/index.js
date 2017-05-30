
// Use React
import React from 'react'
import ReactDOM from 'react-dom'

// Import Pallet Main Layout
import DataMainLayout from './view/layout.js'

// import style sheet
require('../../style/data/base.less')

ReactDOM.render(
  <DataMainLayout />,
  document.getElementById('data')
);
