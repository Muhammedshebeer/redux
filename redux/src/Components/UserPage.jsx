import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Features/auth/authSlice';
import "./User.css";

function UserPage() {
    const dispatch = useDispatch();
    const username = useSelector((state) => state.auth.username);

    return (
        <div>
            <div className='header'>
                <div>
                    <h2>Welcome to User Home</h2>
                </div>
                <div>
                    <h2 className='bg-white text-black'>User Name: {username}</h2>
                    <button className='logout' onClick={() => dispatch(logout())}>Logout</button>
                </div>
            </div><hr />
            <label>Lorem ipsum dolor sit amet consectetur adipisicing elit...</label>
        </div>
    );
}

export default UserPage;
