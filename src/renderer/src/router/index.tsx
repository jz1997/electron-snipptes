import { createHashRouter } from 'react-router-dom'
import Home from '@renderer/pages/Home'
import Config from '@renderer/pages/Config'
import AddCategory from '@renderer/pages/config/AddCategory'

const router = createHashRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'config',
    children: [
      {
        path: '',
        element: <Config />
      },
      {
        path: 'category/add',
        element: <AddCategory />
      }
    ]
  }
])

export default router
