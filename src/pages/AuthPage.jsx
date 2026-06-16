import {useState} from 'react';
import {useForm} from 'react-hook-form';

export default function AuthPage()  
{
    const [mode, setMode] = useState("signup");
    
    const {register, handleSubmit, formState: {errors}} = useForm();


    function onSubmit()
    {
        alert("Form submitted");
    }
    return (
        <div className='page'>
            <div className='auth-container'>
                <h1 className='auth-title'>
                    {mode === "Login" ? "Login" : "Sign Up"}
                </h1>
                <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-group'>
                        <label className='form-label' htmlFor='email'>Email</label>
                        <input className='form-input' type='email' placeholder='Enter your email' id='email' 
                        {...register("email", { required: "Email is required" } )} />
                        {errors.email && <span className='form-error'>{errors.email.message}</span>}

                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor='password'>Password</label>
                        <input className='form-input' type='password' placeholder='Enter your password' id='password' 
                        {...register("password", { required: "Password is required",
                         minLength: { value: 6, message: "Password must be at least 6 characters" } })} />
                        {errors.password && <span className='form-error'>{errors.password.message}</span>}
                    </div>

                    <button className='btn-login' type='submit'>
                        {mode === "Login" ? "Login" : "Sign Up"}
                    </button>
                </form>
                <div className='auth-switch'>
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