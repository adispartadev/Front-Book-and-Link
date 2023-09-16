import { forgotAction } from "@/app/action";
import Layout from "@/components/layout"
import LoadingBlock from "@/components/loadingBlock";
import axios from "@/utils/axios";

import Image from 'next/image'
import Link from "next/link";
import { useState } from "react"

export default function ForgotPassword() {

    const [formData, setFormData] = useState({
        email : '',
    });

    const [validationError, setValidationError] = useState({});

    const [loading, setLoading]     = useState(false);
    const [message, setMessage]     = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const loginAction = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const response = await forgotAction(formData)
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

                        <div className="text-center">
                            <Image alt="" src={"/logo-bookandlink-1.png"} width={0}
                                height={0} sizes="80vw"
                                style={{ width: '200px', height: 'auto', margin : '0 auto' }} /> 
                        </div>


                        { isSuccess ? 

                            <div className="flex items-center p-4 text-sm mt-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    We have sent an email with instructions for changing your password to <strong>{formData.email}</strong>. Please check in your mail inbox or spam folder.
                                </div>
                            </div>

                            :

                            <div>
                                <div className="flex items-center p-4 mb-4 mt-4 text-sm text-blue-800 rounded-lg bg-blue-50 " role="alert">
                                    <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        <span className="font-medium">Instruction!</span> Enter your email in form below, we will send your password recovery page by email.
                                    </div>
                                </div>
                                

                                <form onSubmit={loginAction}>

                                    {message != null && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                        <span className="font-medium">Warning!</span> {message}
                                    </div> }

                                    <div className="relative mb-4">
                                        <label className="leading-7 text-sm text-gray-600">Email</label>
                                        <input type="email" value={formData.email} onChange={handleChange} name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                        { validationError?.email != null && <div className="text-xs text-red-700 mt-0.5">{validationError.email}</div> }
                                    </div>
                                
                                    <button className="text-white bg-blue-500 border-0 py-2 px-6 rounded flex items-center space-x-2" type="submit">
                                        <span>Reset Password</span>
                                    </button>

                                </form>
                            </div>
                        }

                    </div>
                </div>
            </section>

        </Layout>


    )
}