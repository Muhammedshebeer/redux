import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Features/auth/authSlice';
import "./Admin.css";

function AdminPage() {
    const dispatch = useDispatch();
    const username = useSelector((state) => state.auth.username);

    return (
        <div className='fullpage'>
            <div className='header'>
                <div>
                    <h2>Welcome to Admin Home</h2>
                </div>
                <div>
                    <h2 className='bg-white text-black'>Admin Name: {username}</h2>
                    <button className='logout' onClick={() => dispatch(logout())}>Logout</button>
                </div>
            </div><hr />
            <label>Lorem ipsum dolor sit amet consectetur adipisicing elit...</label>
        </div>
    );
}

export default AdminPage;

