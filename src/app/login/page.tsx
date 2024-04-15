'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
const LoginPage = () => {
  const [user,setUser]=useState({
  email:"",
  password:"",
  
  })
  const [buttonDisabled,setButtonDisabled]=useState(false)
  const [loading,setloading]=useState(false)
  const router=useRouter()
  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0)
      {
        setButtonDisabled(false)
      }
      else{
        setButtonDisabled(true)
      }
  },[user])
  const onSignup=async()=>{
    try {
     setloading(true)
     const res=await axios.post('/api/users/login',user)
     console.log(res.data);
     router.push('/')

      
    } catch (error:any) {
      console.log('Signup failed')
      toast.error(error.message)
      
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading?"Processing":"Login"}</h1>
      <hr />
        <label htmlFor="email">Email</label>
      <input
      id='email'
      value={user.email}
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black '
      onChange={(e)=>setUser({...user,email:e.target.value})}
      placeholder='email'
       type="email" />
        <label htmlFor="password">Password</label>
      <input
      id='password'
      value={user.password}
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black '
      onChange={(e)=>setUser({...user,password:e.target.value})}
      placeholder='password'
       type="password" />
       <button 
       onClick={onSignup}
       className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:bordder-gray-600'
       >
        {buttonDisabled ?'No Login':'Signup'}
       </button>
       <Link href={'/signup'}>Visit Signup page</Link>
    </div>
  )
}

export default LoginPage