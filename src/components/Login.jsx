import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import app from '../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);
const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();

    const handleLogin = event =>{
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        // Validation
        setError('');
        setSuccess('');
        if(!/(?=.*[a-z].*[a-z])/.test(password)){
            setError('Please use at least 2 letter at your password')
            return;
        }
        else if(!/(?=.*[!@$*#&])/.test(password)){
            setError('Please use at least a special character at your password')
            return;
        }
        else if(password.length < 6){
            setError('password should be at least six characters')
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser)
            setSuccess('User logged In successfully')
            setError('')
            event.target.reset();
        })
        .catch(error =>{
            setError(error.message)
            console.log(error.message)
        })
    }  
    // if forget password
    const handleResetPassword = event =>{
        const email = emailRef.current.value;
        if(!email){
            alert('Please provide your email to reset password')
            return;
            
        }
        sendPasswordResetEmail(auth, email)
        .then(() =>{
            alert('Please check you email')
        })
        .catch(error =>{
            console.log(error)
            setError(error.message)
        })
    }
    return (
        <div className='my-container  text-center mt-4 '>
            <h3 className='text-3xl tracking-wide font-bold mb-5 text-zinc-700'>Please Login</h3>
            <form onSubmit={handleLogin} className='p-4'>
               <input className='border border-gray-500 px-2 w-96' type="email" ref={emailRef} name="email" id=" email" placeholder='Your Email' required />
               <br />
               <input className='border border-gray-500 px-2 mt-4 w-96' type="password" name="password" id="password" placeholder='Your Password' required />
               <br />
               <p className='text-red-500'>{error}</p>
               <p className='text-green-600'>{success}</p>
               <input className='border rounded font-medium bg-lime-600 hover:bg-lime-500 hover:text-white mt-5 border-gray-500 px-4 py-1' type="submit" value="Login" />
               <p><small>Forget password ? Please <button onClick={handleResetPassword} className='text-blue-600 underline'>Reset Password</button> </small></p>
               <p><small>New to this website? please <Link className='text-blue-600 underline' to="/register">Register</Link></small></p>
            </form>
        </div>
    );
};

export default Login;