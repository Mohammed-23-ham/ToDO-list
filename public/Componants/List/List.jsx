import { useState } from 'react'
import supabase from '../../../src/supabase'

export default function List({ todos, setTodos }) {

  const handleDelAll = async () => {
    const { error } = await supabase.from("todos").delete().neq('id', 0);
    if (error) {
      alert(error.message);
      return;
    }
    setTodos([]);
  };
  const handleChAll = async () => {
    const { error } = await supabase.from("todos").update({ completed: true }).neq('id', 0);
    if(error) {
      alert(error.message);
    }
    const updated = todos.map(todo => ({ ...todo, completed: true }));
    setTodos(updated);
  }

  const handleDel = async (index) => {
    const id = todos[index].id;
    const { error } = await supabase.from("todos").delete().eq('id', id);
    if (error) {
      alert(error.message);
      return;
    }
    const updated = [...todos];
    updated.splice(index, 1);
    setTodos(updated);
  }

  const handleCheck = async (index) => {
    const id = todos[index].id;
    const { error } = await supabase.from("todos").update({ completed: !todos[index].completed }).eq('id', id);
    if (error) {
      alert(error.message);
      return;
    }
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);

  }

  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEdit = async (index) => {
    if (editIndex === index) {
      const id = todos[index].id;
      const { error } = await supabase.from("todos").update({ tusk: editText }).eq('id', id);
      if (error) {
        alert(error.message)
      }
    }

    setEditIndex(index);
    setEditText(todos[index].tusk);
  };

  const handleConfirmEdit = async () => {
    const id = todos[editIndex].id;
    const { error } = await supabase.from("todos").update({ tusk: editText }).eq('id', id);
    if (error) {
      alert(error.message);
      return;
    }
    const updated = [...todos];
    updated[editIndex].tusk = editText;
    setTodos(updated);
    setEditIndex(null);
  }

  return (
    <>
      <div className='list row-10 overflow-y-scroll d-flex flex-column g-5'>
        <div className="list-items">
          {todos.map((todo, index) => {
            const isEditing = index === editIndex;
            return (
              <div key={index} className='list-item d-flex justify-content-between align-items-center flex-row gap-1'>
                {isEditing ? (
                  <>
                    <input
                      className='flex-grow-1 m-1'
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                    />
                    <button
                      onClick={handleConfirmEdit}
                      className='btn-del btn btn-warning d-flex justify-content-center align-items-center h-100 py-1'
                    >
                      <i className="fas fa-check"></i>
                    </button>
                  </>
                ) : (
                  <>
                    <p className='m-1 flex-grow-1' id={todo.completed ? 'completed' : 'text'}>{index + 1}. {todo.tusk}</p>
                    <button onClick={() => handleDel(index)} className='btn-del btn btn-danger d-flex justify-content-center align-items-center h-100 py-1'>
                      <i className="fas fa-trash"></i>
                    </button>
                    <button onClick={() => handleCheck(index)} className='btn-del btn btn-success d-flex justify-content-center align-items-center h-100 py-1'>
                      <i className="fas fa-check"></i>
                    </button>
                    <button onClick={() => handleEdit(index)} className='btn-del btn btn-primary d-flex justify-content-center align-items-center h-100 py-1'>
                      <i className="fas fa-pencil"></i>
                    </button>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <div className="btns d-flex justify-content-center align-items-center flex-row gap-1">
        <button onClick={handleChAll} className='btn btn-dark d-flex justify-content-center align-items-center'><i className='fas fa-check-double'></i></button>
        <button onClick={handleDelAll} className='btn btn-dark d-flex justify-content-center align-items-center'><i className="fas fa-delete-left"></i></button>

      </div>
    </>
  )
}
