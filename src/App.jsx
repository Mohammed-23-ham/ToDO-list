import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './App.css'
import TodoApp from '../public/Componants/TodoApp/TodoApp'
import SignUp from '../public/Componants/TodoApp/Account/SignUp'
import LogIn from '../public/Componants/TodoApp/Account/LogIn'
import AccountManager from '../public/Componants/TodoApp/Account/AccountManager'

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path="/" element={<TodoApp />} />
          <Route path="/account-manager" element={<AccountManager />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn />} />
        </Routes>
        <Analytics />
      </div>
      <Analytics />
    </BrowserRouter>
  )
}

export default App
