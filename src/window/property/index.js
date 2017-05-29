
// Use React
import React from 'react'
import ReactDOM from 'react-dom'

// Import Pallet Main Layout
import PropertyMainLayout from './view/layout.js'

// import style sheet
require('../../style/property/base.less')

ReactDOM.render(
  <PropertyMainLayout />,
  document.getElementById('property')
);
