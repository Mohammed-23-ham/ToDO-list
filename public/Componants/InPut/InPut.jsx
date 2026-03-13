import supabase from '../../../src/supabase'
import { useEffect } from 'react';

export default function InPut({todos, setTodos, inText}) {

  const handleAdd = async () => {
    const text = inText.current.value.trim();
    if (!text) {
      alert("Enter your tusk!")
      return
    }

    if (todos.some(todo => todo.tusk === text)) {
      alert("This tusk already exists")
      return
    }

    const { data, error } = await supabase.from("todos").insert({ tusk: text, completed: false }).select().single();
    if (error) {
      if (error.message?.includes("duplicate key") || error.code === "23505") {
        alert("This tusk already exists")
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
        <input ref={inText} className='inpout-form form-control col-10' type="text" placeholder='Enter your tusk...' />
        <button className='input-btn btn btn-dark col-2 d-flex justify-content-center align-items-center' onClick={handleAdd}><i className="fas fa-plus"></i></button>
    </div>
  )
}
