import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InPut from '../InPut/InPut'
import List from '../List/List'
import { supabase } from '../../../src/supabase'

export default function TodoApp() {

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })
  const inText = useRef()

  useEffect(() => {
    const fechData = async () => {
      const { data, error } = await supabase.from("todos").select('*').order("id", { ascending: true });
      if (error) { alert(error.message) }

      if (data) {
        setTodos(data)
      }
    }
    fechData()
  }, [])

  const navigate = useNavigate();

  return (
    <>
      <div className='navbar p-1'>
        <button onClick={() => navigate('/sign-up')} className='user-btn btn btn-dark'>Signup</button>
        <button onClick={() => navigate('/log-in')} className='user-btn btn btn-dark'>Login</button>
      </div>
      <div className='td-app justify-content-center align-items-center d-flex flex-column align-items-center gap-5'>
        <InPut
          inText={inText}
          todos={todos}
          setTodos={setTodos}
        />
        <List
          todos={todos}
          setTodos={setTodos}
        />
      </div>
    </>
  )
}
