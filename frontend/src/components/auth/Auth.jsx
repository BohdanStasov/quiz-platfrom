import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../redux/userSlice';

const Auth = () => {
    const [haveAnAccount, setHaveAnAccount] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const handleRegisterClick = async (e) => {
        e.preventDefault();
        try {   
            await axios.post(
                "api/auth/register",
                { username, password },   
            ) 
            alert("User has been created successfully!")  
        } catch (error) {
            alert('Something went wrong, try again later');
        }
    }
    const handleLoginClick = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post("api/auth/login", { username, password });
            dispatch(loginSuccess(res.data));
            alert("Login successful!");
        } catch (error) {
            dispatch(loginFailure());
            alert('Something went wrong, try again later');
            console.log(error)
        }
    };
    return (
        <section className='px-6 sm:px-16 py-4 flex flex-col space-y-2 items-center justify-center'>
            {haveAnAccount ?
                <div className='mt-48 flex flex-col space-y-8'>        
                    <input 
                        type='username'
                        className='rounded-lg border p-3'
                        placeholder='Username'
                        value={username} 
                        onChange={(e)=>setUsername(e.target.value)}
                    />                 
                    <input 
                        type='password'
                        className='rounded-lg border p-3' 
                        placeholder='Password'
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <div className='items-center justify-center flex'>
                        <button onClick={handleLoginClick} className='px-4 py-3 rounded-lg hover:bg-[#0049B8] hover:text-white font-bold border border-[#0049B8] text-center text-[#0049B8]'>
                            Login
                        </button>
                    </div>
                </div>
            :
                <div className='mt-48 flex flex-col space-y-8'>        
                    <input 
                        type='username'
                        className='rounded-lg border p-3'
                        placeholder='Username'
                        value={username} 
                        onChange={(e)=>setUsername(e.target.value)}
                    />                 
                    <input 
                        type='password'
                        className='rounded-lg border p-3' 
                        placeholder='Password'
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <div className='items-center justify-center flex'>
                        <button onClick={handleRegisterClick} className='px-4 py-3 rounded-lg hover:bg-[#0049B8] hover:text-white font-bold border border-[#0049B8] text-center text-[#0049B8]'>
                            Register
                        </button>
                    </div>
                </div>
            }
            <div className='flex flex-col space-y-2 text-[#0049B8] hover:scale-110 duration-300'>
                {haveAnAccount ?
                    <button onClick={() => setHaveAnAccount((prev) => !prev)}>
                        dont have an account? <span className='font-bold'>register</span>
                    </button>
                :
                    <button onClick={() => setHaveAnAccount((prev) => !prev)}>
                        already have an account? <span className='font-bold'>login</span>
                    </button>
                }
            </div>
        </section>
    )
}

export default Auth