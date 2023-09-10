import { userToken } from '@/pages/api/auth';
import '../app/globals.css'
import { Inter } from 'next/font/google'
import axios from "@/utils/axios";
const inter = Inter({ subsets: ['latin'] })


export default function MainLayout({ children }) {


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
			    window.location.replace("/auth/login")
            } else {
                alert("Unable to logout");
            }

        } catch (error) {
            alert("Unable to logout");
        }
    }

    return (
        <div className='text-gray-600 body-font relative min-h-screen'>
			<nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
					<span className="flex items-center">
						<span className="self-center text-2xl font-semibold whitespace-nowrap ">Dashboard</span>
					</span>
					
					<div className="w-auto" id="navbar-solid-bg">
						<ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent ">
							<li>
								<button onClick={logout} className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Logout</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
            {children}
        </div>
    )
}