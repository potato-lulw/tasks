import { useTheme } from '@/components/ThemeContextProvider';
import { ModeToggle } from '@/components/Toggle';
import { Button } from '@/components/ui/button';
import Textbox from '@/components/ui/Textbox';
import { useLoginMutation } from '@/redux/slices/api/authApiSlice';
import { setCredentials } from '@/redux/slices/authSlice';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (data) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      navigate('/dashboard', { replace: true });
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed: " + (error.data?.message || error.message));
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);
  return (
    <div className={`bg-background w-full sm:w-[400px] pb-24 sm:pb-3 p-3 sm:p-6 fixed sm:static bottom-0 sm:bottom-auto rounded-tl-4xl  sm:rounded-md ${theme === 'dark' ? "" : 'shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] sm:shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06'} `}>
      <div className='flex items-center relative'>

        <p className="text-foreground flex-1 w-fit inline-block p-2 m-2 text-center font-bold text-2xl sm:text-3xl">Login</p>
        <div className='absolute right-0 '>
          <ModeToggle />
        </div>

      </div>
      {/* <p className='text-center text-accent-foreground text-sm'>Manage your tasks in one place</p> */}
      <div className='w-full flex justify-center '>

        <p className="text-center text-accent-foreground text-sm inline-block px-2 py-1 border-[2px] rounded-full mx-auto wave-particles">
          Welcome Back!
        </p>

      </div>
      <div className='w-full h-1 bg-accent mt-4 hidden sm:block'></div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <Textbox
            placeholder='email@example.com'
            type='email'
            name='email'
            label='Email Address'
            classNames="w-full rounded-full wave-particles "
            register={register('email', {
              required: 'Email ID is required'
            })}
            error={errors.email ? errors.email.message : ""}
          />
          <Textbox
            placeholder='Enter your password'
            type='password'
            name='password'
            label='Password'
            classNames="w-full rounded-full wave-particles "
            register={register('password', {
              required: 'Password is required'
            })}
            error={errors.password ? errors.password.message : ""}
          />
          <p className='text-sky-500 hover:underline hover:cursor-pointer mt-2 mb-4 text-right w-full'>Forgot Password?</p>
          {isLoading ? <p className='text-center text-xs dark:text-gray-400 text-gray-600'>Logging in...</p> : <Button type="submit" className="w-full my-2">Login</Button>}
        </div>


        <Link to="/register" >
          <p className='text-center text-xs dark:text-gray-400 text-gray-600 underline mb-2'>Dont have an account? Sign Up</p>
        </Link>
        <p className='text-center text-xs dark:text-gray-400 text-gray-600'>Please keep your credientials safe</p>
      </form>
    </div>
  )
}

export default Login