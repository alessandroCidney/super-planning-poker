import { Routes, Route } from 'react-router'

import { Home } from './components/pages/Home'
import { Room } from './components/pages/Room'

import { RoomContextProvider } from './contexts/RoomContext'

function App() {
  return (
    <RoomContextProvider>
      <Routes>
        <Route index element={<Home />} />

        <Route path='rooms/:roomId' element={<Room />} />
      </Routes>
    </RoomContextProvider>
  )
}

export default App
