import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Card, CardGrid, Navbar} from './components'
import data from './data/places.json'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import CartPage from './pages/CartPage'

function App() {
  const [count, setCount] = useState(0)


  const router = createBrowserRouter([
    {
      path : '/',
      element:  <Navbar />,
      children:[
        {
          index: true,
          element: <CardGrid data={data} />,
        },
        {
          index: true,
          path:'cart',
          element: <CartPage />,
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  

   
    





      
   
    
  )
}

export default App
