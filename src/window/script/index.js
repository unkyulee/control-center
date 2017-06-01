
// Use React
import React from 'react'
import ReactDOM from 'react-dom'

// Import Pallet Main Layout
import ScriptMainLayout from './view/layout.js'

// import style sheet
require('../../style/script/base.less')

ReactDOM.render(
  <ScriptMainLayout />,
  document.getElementById('script')
);
