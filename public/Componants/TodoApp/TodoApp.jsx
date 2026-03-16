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
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      // Redirect if not logged in
      if (!session) {
        alert('Please log in to access the app.');
        navigate('/log-in');
        return;
      }

      // Ensure email is verified (if your Supabase project requires it)
      if (!session.user?.email_confirmed_at) {
        await supabase.auth.signOut();
        alert('Please verify your email before accessing the app. Check your inbox for the confirmation link.');
        navigate('/log-in');
        return;
      }

      const { data: todosData, error } = await supabase.from('todos').select('*').order('id', { ascending: true });
      if (error) {
        alert(error.message);
      }

      if (todosData) {
        setTodos(todosData);
      }
    }

    checkAuthAndFetch();
  }, [navigate])

  return (
    <>
      <div className='navbar p-1'>
        <button onClick={() => navigate('/sign-up')} className='user-btn btn btn-dark'>Signup</button>
        <button onClick={() => navigate('/log-in')} className='user-btn btn btn-dark'>Login</button>
        <button onClick={() => navigate('/log-out')} className='user-btn btn btn-danger'>Logout</button>
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
