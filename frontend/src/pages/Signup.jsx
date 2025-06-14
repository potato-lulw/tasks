import { useTheme } from '@/components/ThemeContextProvider';
import { ModeToggle } from '@/components/Toggle';
import { Button } from '@/components/ui/button';
import Textbox from '@/components/ui/Textbox';
import { useRegisterMutation } from '@/redux/slices/api/authApiSlice';
import { setCredentials } from '@/redux/slices/authSlice';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Signup = () => {
  const user = null;
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [registerUser, {isLoading}] = useRegisterMutation();

  const submitHandler = async (data) => {
    try {
      console.log('Form Submitted:', data);
      const result = await registerUser(data).unwrap();
      dispatch(setCredentials(result));
      navigate('/dashboard', { replace: true });
      toast.success("Login successful!");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed: " + (error.data?.message || error.message));
      return;

    }

  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <div className={`bg-background w-full sm:w-[400px] pb-24 sm:pb-3 p-3 sm:p-6 fixed sm:static bottom-0 sm:bottom-auto rounded-tl-4xl  sm:rounded-md ${theme === 'dark' ? "" : 'shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] sm:shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06'} `}>
      <div className='flex items-center relative'>
        <p className="text-foreground flex-1 w-fit inline-block p-2 m-2 text-center font-bold text-2xl sm:text-3xl">Sign Up</p>
        <div className='absolute right-0 '>
          <ModeToggle />
        </div>
      </div>

      <div className='w-full flex justify-center '>
        <p className="text-center text-accent-foreground text-sm inline-block px-2 py-1 border-[2px] rounded-full mx-auto wave-particles">
          Manage your tasks in one place
        </p>
      </div>

      <div className='w-full h-1 bg-accent mt-4 hidden sm:block'></div>

      <form onSubmit={handleSubmit(submitHandler)}>
        <div className='grid '>
          <Textbox
            placeholder='Full Name'
            type='text'
            name='name'
            label='Name'
            classNames="w-full rounded-full wave-particles my-2"
            register={register('name', {
              required: 'Name is required'
            })}
            error={errors.name?.message}
          />

          <Textbox
            placeholder='email@example.com'
            type='email'
            name='email'
            label='Email Address'
            classNames="w-full rounded-full wave-particles"
            register={register('email', {
              required: 'Email is required'
            })}
            error={errors.email?.message}
          />

          <Textbox
            placeholder='Enter your password'
            type='password'
            name='password'
            label='Password'
            classNames="w-full rounded-full wave-particles"
            register={register('password', {
              required: 'Password is required'
            })}
            error={errors.password?.message}
          />

          <Textbox
            placeholder='eg. Frontend Developer'
            type='text'
            name='role'
            label='Role'
            classNames="w-full rounded-full wave-particles"
            register={register('role', {
              required: 'Role is required'
            })}
            error={errors.role?.message}
          />

          <Textbox
            placeholder='eg. Software Engineer'
            type='text'
            name='title'
            label='Title'
            classNames="w-full rounded-full wave-particles"
            register={register('title', {
              required: 'Title is required'
            })}
            error={errors.title?.message}
          />


          <Link to={'/login'}>
            <p className='text-sky-500 hover:underline hover:cursor-pointer mt-2 mb-2 text-right w-full'>
              Have an account?
            </p>
          </Link>
          {
            isLoading ? (
              <Button type="button" className="w-full my-2" disabled>
                Signing Up...
              </Button>
            ) : (
              <Button type="submit" className="w-full my-2">Sign Up</Button>
            )
          }
          
        </div>

        <p className='text-center text-xs dark:text-gray-400 text-gray-600 mt-4'>
          Please keep your credentials safe
        </p>
      </form>
    </div>
  );
};

export default Signup;
