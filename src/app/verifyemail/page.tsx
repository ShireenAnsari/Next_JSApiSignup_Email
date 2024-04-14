'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Link from 'next/link'
// import { useRouter } from 'next/router'
export default function VerifyEmail() {
    // const router=useRouter()
    // const {query}=router
    // const urlToken=query.token
   const [token,setToken]= useState("")
   const [verified,SetVerified]=useState(false)
   const [error,setError]=useState(false)
   const verifyUserEmail=async()=>{
 try {
      await axios.post('/api/users/verifyemail',{token})
      SetVerified(true)
      setError(false)
 } catch (error:any) {
    console.log(error)
    setError(true)
    toast.error(error.response.data)

    
 }
   }
   useEffect(()=>{
    setError(false)
   const urlToekn= window.location.search.split("=")[1]
   setToken(urlToekn || "")
   },[])
   useEffect(()=>{
    setError(false)
if(token.length>0)
    {
        verifyUserEmail()
    }
   },[token])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-4xl '>Verify Email</h1>
        <h2 className='p-2 bg-orange-500 text-black'>
           {token ? `${token} `:"no token"}
        </h2>
        {verified && (
            <div>
                <h2>Verified</h2>
                <Link href={'/Login'}>Login</Link>
                </div>
        )}
         {error && (
            <div>
                <h2>Error</h2>
               
                </div>
        )}
    </div>
  )
}
