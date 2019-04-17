import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'
import store from './store'



const App = () => {
  return (
    <div>
    <div>
      <Navbar />
      <Routes />
    </div>

    </div>
  )
}

export default App


