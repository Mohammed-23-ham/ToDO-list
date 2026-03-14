import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../../src/supabase'

export default function LogIn() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email.trim() === '' || password.trim() === '') {
            setError('Please fill in all fields');
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (data) {
            alert('Logged in successfully!')
            setEmail('');
            setPassword('');
            setError('');
            navigate('/')
        }

        if (error) {
            setError(error.message);
        }
    }
    return (
        <>
            <div className='navbar p-1'>
                <button onClick={() => navigate('/')} className='user-btn btn btn-dark'>Main</button>
                <button onClick={() => navigate('/sign-up')} className='user-btn btn btn-dark'>Signup</button>
            </div>
            <h1 className='text-center mt-5'>LogIn</h1>
            <div className="d-flex justify-content-center align-items-center h-100 mt-5">
                <form className='w-50' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    {error && <p className='text-danger'>{error}</p>}
                    <button type="submit" className="btn btn-dark">Submit</button>
                </form>
            </div>
        </>
    )
}
