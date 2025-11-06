import { useState } from 'react'

import { Routes, Route } from 'react-router'

import { Home } from './components/pages/Home'

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  )
}

export default App
