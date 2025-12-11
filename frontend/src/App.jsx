import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './commponents/Nav.jsx'
import Home from './pages/Home.jsx'
import Kolcsonzes from './pages/Kolcsonzes.jsx'
import KonyvTorles from './pages/KonyvTorles.jsx'
import UjKonyv from './pages/UjKonyv.jsx'
import './App.css'

function App() {
  return (
    <>
      <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kolcsonzes" element={<Kolcsonzes />} />
        <Route path="/torles" element={<KonyvTorles />} />
        <Route path='/ujkonyv'element={<UjKonyv />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
