import supabase from '../../../src/supabase'
import { useEffect } from 'react';

export default function InPut({ todos, setTodos, inText, userId }) {

  const handleAdd = async () => {
    const text = inText.current.value.trim();
    if (!text) {
      alert("Enter your task!")
      return
    }

    if (!userId) {
      alert('Unable to add task: user is not authenticated.')
      return
    }

    if (todos.some(todo => todo.task === text)) {
      alert("This task already exists")
      return
    }

    const { data, error } = await supabase.from("todos").insert({ task: text, completed: false, user_id: userId }).select().single();
    if (error) {
      if (error.message?.includes("duplicate key") || error.code === "23505") {
        alert("This task already exists")
      } else {
        alert(error.message)
      }
      return
    }

    if (data) {
      setTodos([...todos, data])
      inText.current.value = ''
    }
  }
  useEffect(() => {
    console.log(todos);
  }, [todos])

  return (
    <div className='inpout row gap-1'>
      <input ref={inText} className='inpout-form form-control col-10' type="text" placeholder='Enter your task...' />
      <button className='input-btn btn btn-dark col-2 d-flex justify-content-center align-items-center' onClick={handleAdd}><i className="fas fa-plus"></i></button>
    </div>
  )
}
