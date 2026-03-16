import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../../src/supabase'

export default function LogIn() {

    const navigate = useNavigate();
    const LogOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            alert('Error logging out: ' + error.message);
        } else {
            alert('Logged out successfully!');
            navigate('/');
        }
    }
    return (
        <>
            <div className='navbar p-1'>
                <button onClick={() => navigate('/')} className='user-btn btn btn-dark'>Main</button>
                <button onClick={() => navigate('/sign-up')} className='user-btn btn btn-dark'>Signup</button>
                <button onClick={() => navigate('/log-in')} className='user-btn btn btn-dark'>login</button>
            </div>
            <button onClick={LogOut} className='btn btn-danger'>LogOut!</button>
        </>
    )
}
