import { createHashRouter, Navigate } from 'react-router-dom'
import Home from '@renderer/pages/Home'
import Config from '@renderer/pages/Config'
import SnippetList from '@renderer/components/SnippetList'
import ContentDetail from '@renderer/pages/config/ContentDetail'
import Shortcut from '@renderer/pages/Shortcut'
import ContentTab from '@renderer/components/config/ContentTab'
import AddContent from '@renderer/pages/config/QuickSave'
import QuickSave from '@renderer/pages/config/QuickSave'

const router = createHashRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'quick-save',
    element: <QuickSave />
  },
  {
    path: 'config',
    element: <Config />,
    children: [
      {
        path: '',
        index: true,
        element: <Navigate to="content" />
      },
      {
        path: 'content',
        element: <ContentTab />,
        children: [
          {
            path: 'categories/:cid/contents',
            element: <SnippetList />,
            children: [
              {
                path: ':id',
                element: <ContentDetail />
              }
            ]
          }
        ]
      },
      {
        path: 'shortcut',
        element: <Shortcut />
      }
    ]
  }
])

export default router
