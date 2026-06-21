import {useState} from 'react';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from "../services/api";

export default function AuthPage()  
{
    const navigate = useNavigate();

// State to toggle between login and signup modes
    const [mode, setMode] = useState("Login");

// Using react-hook-form for form handling and validation 
// it provides a simple way to manage form state and validation rules.
    const {register, handleSubmit, formState: {errors}} = useForm();

// Function to handle form submission currently just shows an alert to check that the submission works
// but can be replaced with actual authentication logic later on when backend integration is done

    const onSubmit = async (d) => {
        const formData = new URLSearchParams();
        formData.append('username', d.email);
        formData.append('password', d.password);
        try {
            const response = await fetch('/api/token', {
                method: 'POST',
                credentials: 'include', // Keep this root parameter if required
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData // Pass the formatted URLSearchParams directly
            });
            
            const maxAge = 15 * 60 * 1000; // 15 min
            const expiryTime = Date.now() + maxAge;
            const data = await response.json();
            const sessionPayload = {
                token: data.access_token,
                expiresAt: expiryTime
            };
            sessionStorage.setItem('access_token', sessionPayload);

            if(response.status === 200) navigate('/dashboard');
        }
        catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='page'>
            <div className='auth-container'>
                <h1 className='auth-title'>
                    {mode === "Login" ? "Login" : "Sign Up"} {/* Displaying the title based on the current mode (Login or Sign Up) */}
                </h1>
                <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-group'>
                        <label className='form-label' htmlFor='email'>Email</label>
                        <input className='form-input' type='email' placeholder='Enter your email' id='email' 
                        {...register("email", { required: "Email is required" } )} /> {/* Registering the email input field with validation rules using react-hook-form */}
                        {errors.email && <span className='form-error'>{errors.email.message}</span>}

                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor='password'>Password</label>
                        <input className='form-input' type='password' placeholder='Enter your password' id='password' 
                        {...register("password", { required: "Password is required",
                         minLength: { value: 6, message: "Password must be at least 6 characters" } })} /> {/* Registering the password input field with validation rules using react-hook-form */}
                        {errors.password && <span className='form-error'>{errors.password.message}</span>}
                    </div>

                    <button className='btn-login' type='submit'>
                        {mode === "Login" ? "Login" : "Sign Up"} {/* Displaying the button text based on the current mode (Login or Sign Up) */}
                    </button>
                </form>
                <div className='auth-switch'>
                    {/* Providing a link to switch between login and signup modes. The text and the onClick handler change based on the current mode. */}
                    {mode === "Login" ? (
                        <p>
                             Don't have an account? <span className='auth-link' onClick={() => setMode("Signup")}>  
                                SignUp
                            </span>
                        </p>
                    ) : (
                        <p>
                            Already have an account? <span className='auth-link' onClick={() => setMode("Login")}>
                                login
                            </span>
                        </p>
                    )}
                </div>
            </div> 
        </div>
    )
}