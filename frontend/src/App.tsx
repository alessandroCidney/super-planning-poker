import { Routes, Route } from 'react-router'

import { Home } from './app/routes/Home'
import { Room } from './app/routes/Room'
import { Error404 } from './app/routes/Error404'

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />

      <Route path='rooms/:roomId' element={<Room />} />

      <Route path='*' element={<Error404 />} />
    </Routes>
  )
}

export default App
