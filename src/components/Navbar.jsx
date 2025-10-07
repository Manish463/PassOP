import React from 'react'

function Navbar() {
    return (
        <>
            <nav className='bg-slate-800 text-white'>
                <div className="mycontainer w-full h-14 flex justify-between items-center md:px-10 px-4 py-6">
                    <div className="logo text-2xl font-bold">
                        <span className='text-green-500'>&lt;</span>
                        Pass
                        <span className='text-green-500'>OP/&gt;</span>
                    </div>

                    <ul className='md:flex gap-8 hidden'>
                        <li className='px-5 py-2 hover:bg-slate-950 rounded-full'><a href="">Home</a></li>
                        <li className='px-5 py-2 hover:bg-slate-950 rounded-full'><a href="">About</a></li>
                        <li className='px-5 py-2 hover:bg-slate-950 rounded-full'><a href="">Contact</a></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar