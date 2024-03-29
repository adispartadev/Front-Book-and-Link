import Layout from "@/components/layout"
import LoadingBlock from "@/components/loadingBlock";
import axios from "@/utils/axios";

import Image from 'next/image'
import Link from "next/link";
import { useState } from "react"
import { useUser } from '../../app/context/userContext';
import { useRouter } from "next/router";


export default function Login() {

    const router = useRouter();
    const { userState, dispatch } = useUser();

    const [formData, setFormData] = useState({
        email   : '',
        password: ''
    });

    const [validationError, setValidationError] = useState({});
    const [loading, setLoading]                 = useState(false);
    const [message, setMessage]                 = useState(null);

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

        try {
            const response = await axios.post('/api/login', formData);
            const result = response.data;
            setLoading(false);

            if(result.status == 'success') {
                localStorage.setItem("user-token", result.data.token);
                localStorage.setItem("user-refresh-token", result.data.refresh_token);
                localStorage.setItem("user-data", JSON.stringify(result.data.user));
                dispatch({ type: 'SET_USER', payload: result.data.user });
			    router.push('/home');
            } else {
                setMessage(result.message);
                setValidationError(result.data);
            }
        } catch (error) {
            setLoading(false);
            setMessage("Unable to login")
        }
    }

    return (
        <Layout>

            <section className="text-gray-600 body-font relative min-h-screen">
                <div className="absolute inset-0 bg-gray-300">
                </div>

                <div className="container px-5 py-24 mx-auto flex">
                    <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                        
                        { loading ? <LoadingBlock></LoadingBlock> : ""}

                        <div className="text-center">
                            <Image alt="" src={"/logo-bookandlink-1.png"} width={0}
                                height={0} sizes="80vw"
                                style={{ width: '200px', height: 'auto', margin : '0 auto' }} /> 
                        </div>

                        <form onSubmit={loginAction} className="mt-4">

                            {message != null ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <span className="font-medium">Warning!</span> {message}
                            </div> : ""}


                            <div className="relative mb-4">
                                <label className="leading-7 text-sm text-gray-600">Email</label>
                                <input type="email" value={formData.email} onChange={handleChange} name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                { validationError?.email != null ? <div class="text-xs text-red-700 mt-0.5">{validationError.email}</div> : "" }
                            </div>

                            <div className="relative mb-4">
                                <label className="leading-7 text-sm text-gray-600">Password</label>
                                <input type="password" value={formData.password} onChange={handleChange} name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                { validationError?.password != null ? <div class="text-xs text-red-700 mt-0.5">{validationError.password}</div> : "" }
                            </div>

                            <div className="py-2 text-right mb-2">
                                <Link href={"/auth/forgot-password"} className="font-semibold text-blue-600">Forgot Password?</Link>
                            </div>

                            <button className="text-white bg-blue-500 border-0 py-2 px-6 rounded text-lg flex items-center space-x-2" type="submit">
                                <span>Login</span>
                            </button>

                        </form>

                        <div className="py-2 mt-1">
                            Don't have an account yet? <Link href={"/auth/register"}><span className="font-semibold text-blue-600">Sign Up Here</span></Link>
                        </div>

                    </div>
                </div>
            </section>

        </Layout>


    )
}