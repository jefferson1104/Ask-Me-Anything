import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import CreateRoom from './pages/create-room'
import Room from './pages/room'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateRoom />
  },
  {
    path: '/room/:roomId',
    element: <Room />
  }
])

function App() {

  // Renders
  return <RouterProvider router={router} />
}

export default App
