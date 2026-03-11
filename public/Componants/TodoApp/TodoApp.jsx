import InPut from '../InPut/InPut'
import List from '../List/List'
import { useRef, useState } from 'react'

export default function TodoApp() {

  const [todos, setTodos] = useState([])
  const inText = useRef()

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
