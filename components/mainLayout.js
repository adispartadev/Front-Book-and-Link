import { userToken } from '@/pages/api/auth';
import '../app/globals.css'
import { Inter } from 'next/font/google'
import axios from "@/utils/axios";
const inter = Inter({ subsets: ['latin'] })
import Head from 'next/head'
import { useUser } from '../app/context/userContext';
import { useRouter } from 'next/router';

export default function MainLayout({ children }) {
    const { userState, dispatch } = useUser();
    const router = useRouter();


    const logout = async () => {
        try {
            const response = await axios.post('/api/logout', {
				refresh_token : localStorage.getItem("user-refresh-token")
			}, {
				headers : {
					'Authorization': 'Bearer ' + userToken(),
				}
			});
			
            const result = response.data;
            if(result.status == 'success') {
                localStorage.removeItem("user-token");
                localStorage.removeItem("user-refresh-token");
                dispatch({ type: 'CLEAR_USER'});
			    router.replace('/auth/login');
            } else {
                alert("Unable to logout");
            }

        } catch (error) {
            alert("Unable to logout");
        }
    }

    return (
        <div className='text-gray-600 body-font relative min-h-screen'>
			<Head>
                <title>Book and Link</title>
                <meta name='description' content='SSO Coding Test' />
            </Head>

            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <div className="flex items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Dashboard</span>
                    </div>
                    <div className="flex items-center">
                        {
                            userState.user && (
                                <>
                                    <div className="mr-6 text-sm  text-gray-500 dark:text-white hover:underline">{userState.user.full_name}</div>
                                    <button className="text-sm  text-blue-600  hover:underline" onClick={logout}>Logout</button>
                                </>
                            ) 
                            
                        }
                        
                    </div>
                </div>
            </nav>

			
            {children}
        </div>
    )
}