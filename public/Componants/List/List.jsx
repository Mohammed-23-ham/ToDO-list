import { useState } from 'react'
import supabase from '../../../src/supabase'

export default function List({ todos, setTodos, userId }) {

  const handleDelAll = async () => {
    if (!userId) {
      alert('Unable to delete tasks: user is not authenticated.');
      return;
    }

    const { error } = await supabase.from("todos").delete().eq('user_id', userId);
    if (error) {
      alert(error.message);
      return;
    }
    setTodos([]);
  };
  const handleChAll = async () => {
    if (!userId) {
      alert('Unable to update tasks: user is not authenticated.');
      return;
    }

    const { error } = await supabase.from("todos").update({ completed: true }).eq('user_id', userId);
    if(error) {
      alert(error.message);
      return;
    }
    const updated = todos.map(todo => ({ ...todo, completed: true }));
    setTodos(updated);
  }

  const handleDel = async (index) => {
    if (!userId) {
      alert('Unable to delete task: user is not authenticated.');
      return;
    }

    const id = todos[index].id;
    const { error } = await supabase.from("todos").delete().eq('id', id).eq('user_id', userId);
    if (error) {
      alert(error.message);
      return;
    }
    const updated = [...todos];
    updated.splice(index, 1);
    setTodos(updated);
  }

  const handleCheck = async (index) => {
    if (!userId) {
      alert('Unable to update task: user is not authenticated.');
      return;
    }

    const id = todos[index].id;
    const { error } = await supabase.from("todos").update({ completed: !todos[index].completed }).eq('id', id).eq('user_id', userId);
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
    if (!userId) {
      alert('Unable to edit task: user is not authenticated.');
      return;
    }

    if (editIndex === index) {
      const id = todos[index].id;
      const { error } = await supabase.from("todos").update({ task: editText }).eq('id', id).eq('user_id', userId);
      if (error) {
        alert(error.message)
      }
    }

    setEditIndex(index);
    setEditText(todos[index].task);
  };

  const handleConfirmEdit = async () => {
    if (!userId) {
      alert('Unable to edit task: user is not authenticated.');
      return;
    }

    const id = todos[editIndex].id;
    const { error } = await supabase.from("todos").update({ task: editText }).eq('id', id).eq('user_id', userId);
    if (error) {
      alert(error.message);
      return;
    }
    const updated = [...todos];
    updated[editIndex].task = editText;
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
                    <p className='m-1 flex-grow-1' id={todo.completed ? 'completed' : 'text'}>{index + 1}. {todo.task}</p>
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
