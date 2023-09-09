"use client"; 

import Image from 'next/image'
import { useEffect, useState } from 'react';
import { isAuthenticated, userToken } from '../pages/api/auth';
import axios from "@/utils/axios";
import MainLayout from '@/components/mainLayout';
import Link from 'next/link';


export default function Home() {
	
	const [productList, setProductList] = useState([]);
	const [loading, setLoading]         = useState(true);
	const [message, setMessage]         = useState(null);


	useEffect(async () => {
		var isLogin = await isAuthenticated();
		if(isLogin) {
			loadingProduct()
		} else {
			window.location.replace("/auth/login")
		}
	}, []);

	async function loadingProduct()  {
		try {
            const response = await axios.get('/api/products', {
				headers : {
					'Authorization': 'Bearer ' + userToken(),
				}
			});
			
            const result = response.data;
            setLoading(false);

            if(result.status == 'success') {
				setProductList(result.data)
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            setLoading(false);
            setMessage("Unable to fetch product")
        }
	}


	const products = [
		{
			title: "Product 1",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			image: "https://picsum.photos/400/200?random=1",
		},
		{
			title: "Product 2",
			description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			image: "https://picsum.photos/400/200?random=2",
		},
		{
			title: "Product 3",
			description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
			image: "https://picsum.photos/400/200?random=3",
		},
		{
			title: "Product 4",
			description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
			image: "https://picsum.photos/400/200?random=4",
		},
		{
			title: "Product 5",
			description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			image: "https://picsum.photos/400/200?random=5",
		},
		{
			title: "Product 6",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			image: "https://picsum.photos/400/200?random=6",
		},
		{
			title: "Product 7",
			description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			image: "https://picsum.photos/400/200?random=7",
		},
		{
			title: "Product 8",
			description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
			image: "https://picsum.photos/400/200?random=8",
		},
		{
			title: "Product 9",
			description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
			image: "https://picsum.photos/400/200?random=9",
		},
	];
	  
	  

  	return (
    	<MainLayout>


			<div className='max-w-6xl mx-auto py-16 px-4'>
				<div className="text-center">
					<Image alt="" src={"/logo-bookandlink-1.png"} width={0}
						height={0} sizes="80vw"
						style={{ width: '300px', height: 'auto', margin : '0 auto' }} /> 
				</div>

				{
					loading ? 

					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-16'>

						{[...Array(5)].map((x, i) =>
							<div className="bg-white border border-gray-200 rounded-lg shadow " key={i}>
								<div className="h-44 bg-gray-200 animate-pulse"></div>
								<div className="p-5">
									<div className="w-2/3 rounded-lg h-6 bg-gray-200 animate-pulse mb-4"/>
									<div className="w-full rounded-lg h-4 bg-gray-200 animate-pulse mb-4"/>
									<div className="w-3/4 rounded-lg h-4 bg-gray-200 animate-pulse mb-4"/>
									<div className="w-32 rounded-lg h-6 bg-gray-200 animate-pulse mb-4"/>
								</div>
							</div>
						)}
					</div>

					:

					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-16'>

						{ productList.map((product, index) => (
							<div className="bg-white border border-gray-200 rounded-lg shadow " key={index}>
								<img className="rounded-t-lg w-full" src={product.image + "?random=" + index} alt="" />
								<div className="p-5">
									<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{product.title}</h5>
									<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.description}</p>
									<Link href={"/"} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg ">
										Read more
									</Link>
								</div>
							</div>
						))}
					</div>

				}

			</div>
		</MainLayout>
  	)
}

