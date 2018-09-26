import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import Springboard from './modules/Springboard'

render((
  <BrowserRouter>
    <Route path="/" component={Springboard} />
  </BrowserRouter>
), document.getElementById('root'));
