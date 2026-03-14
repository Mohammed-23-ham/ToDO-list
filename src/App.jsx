import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import TodoApp from '../public/Componants/TodoApp/TodoApp'
import Header from '../public/Componants/TodoApp/Account/Header'
import SignUp from '../public/Componants/TodoApp/Account/SignUp'
import LogIn from '../public/Componants/TodoApp/Account/LogIn'

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path="/" element={<TodoApp />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
