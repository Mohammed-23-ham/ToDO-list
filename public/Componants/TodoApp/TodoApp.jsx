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
  const [userId, setUserId] = useState(null)
  const inText = useRef()
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (!session) {
        alert('Please log in to access the app.');
        navigate('/log-in');
        return;
      }

      if (!session.user?.email_confirmed_at) {
        await supabase.auth.signOut();
        alert('Please verify your email before accessing the app. Check your inbox for the confirmation link.');
        navigate('/log-in');
        return;
      }

      const userId = session.user?.id;
      setUserId(userId);

      const { data: todosData, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', userId)
        .order('id', { ascending: true });
      if (error) {
        alert(error.message);
      }

      if (todosData) {
        setTodos(todosData);
      }
    }

    checkAuthAndFetch();
  }, [navigate])

  const logOutFun = async () => {
    const LogOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            alert('Error logging out: ' + error.message);
        } else {
            alert('Logged out successfully!');
            navigate('/');
        }
    }
    let confirmation = confirm("Are you sure to LogOut?");
    if(confirmation){ LogOut()}
    if(!confirmation){navigate('/')}
  }

  return (
    <>
      <div className='navbar b-1'>
        <button onClick={() => navigate('/account-manager')} className='user-btn btn btn-primary'><i className='fas fa-gear'></i></button>
        <button onClick={logOutFun} className='user-btn btn btn-danger'><i className='fas fa-door-open'></i></button>
      </div>
      <div className='td-app justify-content-center align-items-center d-flex flex-column align-items-center gap-5'>
        <InPut
          inText={inText}
          todos={todos}
          setTodos={setTodos}
          userId={userId}
        />
        <List
          todos={todos}
          setTodos={setTodos}
          userId={userId}
        />
      </div>
    </>
  )
}
