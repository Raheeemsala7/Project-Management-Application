import GuestRoute from '@/components/GuestRoute'
import React from 'react'
import { Outlet } from 'react-router'

const authLayout = () => {
    return (
        <GuestRoute>
            <div className='min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4'>
                <div className="w-full max-w-md">
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 shadow-2xl">
                        <Outlet />
                    </div>
                </div>
            </div>
        </GuestRoute>
    )
}

export default authLayout