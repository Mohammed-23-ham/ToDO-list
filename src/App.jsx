import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import TodoApp from '../public/Componants/TodoApp/TodoApp'
import SignUp from '../public/Componants/TodoApp/Account/SignUp'
import LogIn from '../public/Componants/TodoApp/Account/LogIn'
import LogOut from '../public/Componants/TodoApp/Account/Logout'

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path="/" element={<TodoApp />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/log-out" element={<LogOut />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
