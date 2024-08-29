import { createHashRouter } from 'react-router-dom'
import Home from '@renderer/pages/Home'
import Config from '@renderer/pages/Config'
import AddCategory from '@renderer/pages/config/AddCategory'
import AddContent from '@renderer/pages/config/AddContent'
import EditContent from '@renderer/pages/config/EditContent'
import EditCategory from '@renderer/pages/config/EditCategory'

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
      },
      {
        path: 'category/edit/:id',
        element: <EditCategory />
      },
      {
        path: 'content/add',
        element: <AddContent />
      },
      {
        path: 'content/edit/:id',
        element: <EditContent />
      }
    ]
  }
])

export default router
