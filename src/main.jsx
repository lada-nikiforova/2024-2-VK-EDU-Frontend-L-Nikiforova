// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// // import './index.css'
// import ChatPage from './pages/PageChat/index.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <ChatPage />
//   </StrictMode>,
// )
import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)