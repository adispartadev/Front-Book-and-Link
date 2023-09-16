import { registerAction } from "@/app/action";
import Layout from "@/components/layout"
import LoadingBlock from "@/components/loadingBlock";
import axios from "@/utils/axios";

import Image from 'next/image'
import Link from "next/link";
import { useState } from "react"

export default function Register() {

    const [formData, setFormData] = useState({
        full_name       : '',
        email           : '',
        password        : '',
        password_confirm: '',

    });

    const [loading, setLoading]                 = useState(false);
    const [message, setMessage]                 = useState(null);
    const [isSuccess, setIsSuccess]             = useState(false);
    const [validationError, setValidationError] = useState({});


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const submitRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const response = await registerAction(formData)
        setLoading(false);
        const result   = response?.data;

        if(result?.status == 'success') {
            setIsSuccess(true);
        } else {
            setMessage(result?.message || "Unable to register");
            setValidationError(result?.data);
        }

    }

    return (
        <Layout>

            <section className="text-gray-600 body-font relative min-h-screen">
                <div className="absolute inset-0 bg-gray-300">
                </div>

                <div className="container px-5 py-24 mx-auto flex">
                    <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex overflow-hidden flex-col mx-auto w-full mt-10 relative z-10 shadow-md">

                        { loading && <LoadingBlock></LoadingBlock>}

                        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Register</h2>
                        <p className="leading-relaxed mb-5 text-gray-600">Fill following form to register a user</p>

                        { isSuccess ? 

                            <div className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium">Register Successfully!</span> Thankyou <strong>{formData.full_name}</strong>, your account successfully registered. Please <Link href={"/auth/login"}><span className="font-semibold text-blue-600">Login</span></Link> to continue.
                                </div>
                            </div>

                            :

                            <form autoComplete="off" onSubmit={submitRegister} className="mt-4">

                                {message != null && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <span className="font-medium">Warning!</span> {message}
                                </div> }


                                <div className="relative mb-4">
                                    <label className="leading-7 text-sm text-gray-600">Full Name</label>
                                    <input type="text" value={formData.full_name} onChange={handleChange} name="full_name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                    { validationError?.full_name != null && <div className="text-xs text-red-700 mt-0.5">{validationError.full_name}</div> }
                                </div>

                                <div className="relative mb-4">
                                    <label className="leading-7 text-sm text-gray-600">Email</label>
                                    <input type="email" value={formData.email} onChange={handleChange} name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                    { validationError?.email != null && <div className="text-xs text-red-700 mt-0.5">{validationError.email}</div> }
                                </div>
                                <div className="relative mb-4">
                                    <label className="leading-7 text-sm text-gray-600">Password</label>
                                    <input type="password" value={formData.password} onChange={handleChange} name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                    { validationError?.password != null && <div className="text-xs text-red-700 mt-0.5">{validationError.password}</div> }
                                </div>
                                <div className="relative mb-4">
                                    <label className="leading-7 text-sm text-gray-600">Confirm Password</label>
                                    <input type="password" value={formData.password_confirm} onChange={handleChange} name="password_confirm" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                    { validationError?.password_confirm != null && <div className="text-xs text-red-700 mt-0.5">{validationError.password_confirm}</div> }
                                </div>
                                
                                <div className="flex">

                                    <div className="py-2 mt-1">
                                        Have you registered? <Link href={"/auth/login"}><span className="font-semibold text-blue-600">Login</span></Link>
                                    </div>
                                    <button className="text-white bg-blue-500 border-0 py-2 px-6 rounded flex items-center space-x-2 ml-auto" type="submit">
                                        <span>Register</span>
                                    </button>

                                </div>
                            </form>

                        }
                        

                    </div>
                </div>
            </section>

        </Layout>


    )
}