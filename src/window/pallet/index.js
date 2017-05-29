
// Use React
import React from 'react'
import ReactDOM from 'react-dom'

// Import Pallet Main Layout
import PalletMainLayout from './view/layout.js'

// import style sheet
require('../../style/pallet/base.less')

ReactDOM.render(
  <PalletMainLayout />,
  document.getElementById('pallet')
);
