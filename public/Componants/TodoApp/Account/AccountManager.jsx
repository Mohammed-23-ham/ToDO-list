import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../../src/supabase'

export default function AccountManager() {
  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) console.error('Supabase session error:', error)
      setSession(data?.session ?? null)
      setLoading(false)
    }

    init()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    const confirmed = confirm('Are you sure you want to log out?')
    if (!confirmed) {
      navigate('/')
      return
    }

    const { error } = await supabase.auth.signOut()
    if (error) {
      alert('Error logging out: ' + error.message)
    } else {
      alert('Logged out successfully!')
      navigate('/')
    }
  }

  if (loading) {
    return (
      <div className='td-app justify-content-center align-items-center d-flex flex-column align-items-center gap-5'>
        <p>Loading...</p>
      </div>
    )
  }

  const isAuthenticated = Boolean(session)
  const isConfirmed = Boolean(session?.user?.email_confirmed_at)

  const authButtons = !isAuthenticated || !isConfirmed ? (
    <>
      <button onClick={() => navigate('/sign-up')} className='user-btn btn btn-dark w-25'>Signup</button>
      <button onClick={() => navigate('/log-in')} className='user-btn btn btn-dark w-25'>Login</button>
    </>
  ) : (
    <button onClick={handleLogout} className='user-btn btn btn-danger'>Logout</button>
  )

  return (
    <>
      <div className='navbar b-1'>
        <button onClick={() => navigate('/')} className='user-btn btn btn-primary'><i className='fas fa-house'></i></button>
        {isAuthenticated && isConfirmed && (
          <button onClick={handleLogout} className='user-btn btn btn-danger'><i className='fas fa-door-open'></i></button>
        )}
      </div>

      <div className='td-app justify-content-center align-items-center d-flex flex-column align-items-center gap-5'>
        {authButtons}
      </div>
    </>
  )
}
