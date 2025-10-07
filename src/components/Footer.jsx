import React from 'react'

function Footer() {
    return (
        <>
            <footer className='w-full bg-slate-800 text-white flex flex-col items-center justify-center py-2'>
                <div className="logo text-xl font-bold">
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </div>
                <div className='text-sm text-gray-300'>Copy Right &copy;</div>
            </footer>
        </>
    )
}

export default Footer