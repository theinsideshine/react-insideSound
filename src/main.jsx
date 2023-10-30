import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'
import { SoundApp } from './soundApp'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
        <SoundApp />
    </BrowserRouter>
  // </React.StrictMode>
)
