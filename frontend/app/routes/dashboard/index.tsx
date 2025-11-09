import { useAuthStore } from '@/store/auth-store'
import Cookies from 'js-cookie'
import React from 'react'

const DashboardIndex = () => {
  console.log(Cookies.get("token"))
  const { user } = useAuthStore()
  console.log(user)
  return (
    <div>
      <h5 className='text-5xl text-red-600'>TTTTTTTTT</h5>
    </div>
  )
}

export default DashboardIndex