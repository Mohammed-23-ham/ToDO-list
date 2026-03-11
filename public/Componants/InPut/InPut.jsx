import React from 'react'
import { useEffect } from 'react';

export default function InPut({todos, setTodos, inText}) {

  const handleAdd = () => {
    const text = inText.current.value;
    if(text !=='') {
      const newTodo = { completed: false, text}
    setTodos([...todos, newTodo]);
    inText.current.value = '';
  }
}
useEffect(() => {
  console.log(todos);
}, [todos])

  return (
    <div className='inpout row gap-1'>
        <input ref={inText} className='inpout-form col-10' type="text" />
        <button className='input-btn col-2 d-flex justify-content-center align-items-center' onClick={handleAdd}><i className="fas fa-plus"></i></button>
    </div>
  )
}
