import { logout } from '@/services/Auth'
import Links from '@/static/Links'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        logout().then(()=>{
            navigate(Links.home)
        })
    },[])
  return (
    <div>
      
    </div>
  )
}

export default Logout

