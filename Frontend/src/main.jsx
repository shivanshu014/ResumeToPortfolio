import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import UploadPdf from './components/UploadPdf.jsx'
import ContactPage from './pages/ContactPage.jsx'
import ResumeFromPage from './pages/ResumeFromPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children:[
      {
        path: '/',
        element: <Home/>
      },
      {
        path:'/create',
        element: <UploadPdf/>
      },
      {
        path:'/contact',
        element: <ContactPage/>
      },
      {
        path:'/create/resumefrom',
        element: <ResumeFromPage/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider >
  </StrictMode>,
)
