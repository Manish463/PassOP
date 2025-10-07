import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

function Manager() {
    const [form, setForm] = useState({ site: '', username: '', password: '' })
    const [passwordArray, setPasswordArray] = useState([])
    const [isShow, setIsShow] = useState("password")
    const ref = useRef()
    const passwordRef = useRef()

    useEffect(() => {
        let passwords = localStorage.getItem("password")
        if (passwords)
            setPasswordArray(JSON.parse(passwords))
    }, [])

    const copyText = (text) => {
        toast('Copied successfully!');
        navigator.clipboard.writeText(text)
    }
    const showPwd = () => {
        if (ref.current.src.includes("/icons/eye.png")) {
            ref.current.src = "/icons/hidden.png"
            setIsShow("text")
        } else {
            ref.current.src = "/icons/eye.png"
            setIsShow("password")
        }
    }
    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            toast('Password saved!')
            setForm({ site: '', username: '', password: '' })
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        } else {
            toast('Password not saved!')
        }

    }
    const editPassword = (id) => {
        setForm(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
        // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    }
    const deletePassword = (id) => {
        toast('Password deleted!')
        let c = confirm("Do you really want to delete Password!")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
    }
    const handler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {/* <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div> */}
            <div className="w-full min-h-[80vh] md:w-2/3">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-md text-green-700 text-center'>Your own Password Manager</p>

                <div className='flex flex-col text-black p-4 gap-6 items-center'>
                    <input value={form.site} onChange={handler} placeholder='Enter website URL' className='w-full border border-green-500 rounded-full px-4 py-1' type="text" name='site' />
                    <div className='w-full flex gap-6 md:flex-row flex-col'>
                        <input value={form.username} onChange={handler} placeholder='Enter username' className='w-full border border-green-500 rounded-full px-4 py-1' type="text" name='username' />
                        <div className="relative w-full">
                            <input ref={passwordRef} value={form.password} onChange={handler} placeholder='Enter password' className='w-full border border-green-500 rounded-full px-4 py-1' type={isShow} name='password' />
                            <span className='absolute right-4 cursor-pointer' onClick={showPwd}>
                                <img ref={ref} className='py-1' width={24} src="/icons/eye.png" alt="Show" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='w-fit flex justify-center items-center bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full gap-2 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover"
                            style={{ width: "24px", height: "24px" }}>
                        </lord-icon>
                        Save
                    </button>
                </div>

                <div className="passwords pb-10 w-full">
                    <h2 className='text-xl font-bold py-2'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length !== 0 &&
                        <div className="w-full overflow-x-auto rounded-lg shadow-md border border-green-200">
                            <table className="min-w-full text-sm md:text-base border-collapse">
                                <thead className="bg-green-800 text-white">
                                    <tr>
                                        <th className="py-3 px-4 text-left whitespace-nowrap">Site</th>
                                        <th className="py-3 px-4 text-left whitespace-nowrap">Username</th>
                                        <th className="py-3 px-4 text-left whitespace-nowrap">Password</th>
                                        <th className="py-3 px-4 text-center whitespace-nowrap">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-green-100 text-gray-800">
                                    {passwordArray.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-green-200 hover:bg-green-200 transition-colors duration-150"
                                        >
                                            {/* SITE */}
                                            <td className="py-3 px-4 whitespace-nowrap">
                                                <div className="flex justify-start items-center gap-2">
                                                    <a
                                                        href={item.site}
                                                        target="_blank"
                                                        className="font-medium text-green-700 hover:underline break-all"
                                                    >
                                                        {item.site}
                                                    </a>
                                                    <button onClick={() => copyText(item.site)} className="cursor-pointer">
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/xuoapdes.json"
                                                            trigger="hover"
                                                            style={{ width: "22px", height: "22px" }}
                                                        ></lord-icon>
                                                    </button>
                                                </div>
                                            </td>

                                            {/* USERNAME */}
                                            <td className="py-3 px-4 whitespace-nowrap">
                                                <div className="flex justify-start items-center gap-2">
                                                    <span className="break-all">{item.username}</span>
                                                    <button onClick={() => copyText(item.username)} className="cursor-pointer">
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/xuoapdes.json"
                                                            trigger="hover"
                                                            style={{ width: "22px", height: "22px" }}
                                                        ></lord-icon>
                                                    </button>
                                                </div>
                                            </td>

                                            {/* PASSWORD */}
                                            <td className="py-3 px-4 whitespace-nowrap">
                                                <div className="flex justify-start items-center gap-2">
                                                    <span className="break-all">{item.password}</span>
                                                    <button onClick={() => copyText(item.password)} className="cursor-pointer">
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/xuoapdes.json"
                                                            trigger="hover"
                                                            style={{ width: "22px", height: "22px" }}
                                                        ></lord-icon>
                                                    </button>
                                                </div>
                                            </td>

                                            {/* ACTION */}
                                            <td className="py-3 px-4 text-center whitespace-nowrap">
                                                <div className="flex justify-center gap-3">
                                                    <button
                                                        onClick={() => editPassword(item.id)}
                                                        className="cursor-pointer hover:scale-110 transition-transform"
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/exymduqj.json"
                                                            trigger="hover"
                                                            stroke="bold"
                                                            state="hover-line"
                                                            style={{ width: "22px", height: "22px" }}
                                                        ></lord-icon>
                                                    </button>

                                                    <button
                                                        onClick={() => deletePassword(item.id)}
                                                        className="cursor-pointer hover:scale-110 transition-transform"
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/xyfswyxf.json"
                                                            trigger="hover"
                                                            style={{ width: "22px", height: "22px" }}
                                                        ></lord-icon>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager