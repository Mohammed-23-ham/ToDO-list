import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../../src/supabase'

export default function AccountManager() {

  const navigate = useNavigate();

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
    if (confirmation) { LogOut() }
    if (!confirmation) { navigate('/') }
  }

  return (
    <>
      <div className='navbar b-1'>
        <button onClick={() => navigate('/')} className='user-btn btn btn-primary'><i className='fas fa-house'></i></button>
        <button onClick={logOutFun} className='user-btn btn btn-danger'><i className='fas fa-door-open'></i></button>
      </div>
      <div className='td-app justify-content-center align-items-center d-flex flex-column align-items-center gap-5'>
        <button onClick={() => navigate('/sign-up')} className='user-btn btn btn-dark w-25'>Signup</button>
        <button onClick={() => navigate('/log-in')} className='user-btn btn btn-dark w-25'>login</button>
      </div>
    </>
  )
}
