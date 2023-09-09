import { userToken } from '@/pages/api/auth';
import '../app/globals.css'
import { Inter } from 'next/font/google'
import axios from "@/utils/axios";
const inter = Inter({ subsets: ['latin'] })


export default function MainLayout({ children }) {


    const logout = async () => {
        try {
            const response = await axios.post('/api/logout', {}, {
				headers : {
					'Authorization': 'Bearer ' + userToken(),
				}
			});
			
            const result = response.data;
            if(result.status == 'success') {
                localStorage.removeItem("user-token");
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
					<button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
						<span className="sr-only">Open main menu</span>
						<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
						</svg>
					</button>
					<div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
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