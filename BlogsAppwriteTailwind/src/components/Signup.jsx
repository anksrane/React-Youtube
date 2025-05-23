import React,{useState} from 'react'
import authService from '../appwrite/auth'
import { data, Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button,Input } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate=useNavigate()
    const [error,setError]=useState("")
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm()

    const signupAcc=async(data)=>{
        setError("")
        try {
            const userData= await authService.createAccount(data)
            if(userData){
                const currUser= await authService.getCurrentUser()
                if(currUser){
                    dispatch(login(currUser))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.massage)
        }
    }
  return (
    <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">Logo</span>
            </div>   
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link to="/login"
                    className='font-medium text-primary transition-all duration-200 hover:underline'
                    >Sign in</Link>
            </p>
            {error && <p className="text-red-600 text-center mt-6">{error}</p>}   

            <form onSubmit={handleSubmit(signupAcc)}>
                <div className="space-y-5">
                    <Input
                    label='Full Name: '
                    placeholder="Enter your full name"
                    {...register("name",{
                        required:true,
                    })}
                    ></Input>

                    <Input 
                    label="Email: "
                    placeholder="Enter your Email"
                    type="email"
                    {...register("email",{
                        required:true,
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Invalid email address"
                        }
                    })}
                    />

                    <Input 
                    label="Password"
                    placeholder="Enter your Password"
                    type="password"
                    {...register("password",{
                        required:true,
                    })}
                    />    

                    <Button
                    type='submit'
                    className='w-full'
                    >Create Account</Button>                
                </div>
            </form>              
        </div>      
    </div>
  )
}

export default Signup
