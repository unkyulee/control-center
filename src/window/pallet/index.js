
// Use React
import React from 'react'
import ReactDOM from 'react-dom'

// Import Pallet Main Layout
import PalletMainLayout from './layout/main.js'

// import style sheet
require('../../less/pallet/main.less')

ReactDOM.render(
  <PalletMainLayout />,
  document.getElementById('content')
);