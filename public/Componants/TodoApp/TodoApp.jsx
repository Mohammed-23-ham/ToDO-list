import InPut from '../InPut/InPut'
import List from '../List/List'
import { useRef, useState, useEffect } from 'react'

export default function TodoApp() {

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })
  const inText = useRef()

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
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
  )
}
