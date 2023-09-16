import Image from 'next/image'
import { isAuthenticated, userToken } from './api/auth';
import axios from "@/utils/axios";
import MainLayout from '@/components/mainLayout';
import { useRouter } from "next/router";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProducts } from '@/app/action';

export default function HomePage() {
    const router = useRouter();
	const [productList, setProductList] = useState([]);
	const [loading, setLoading]         = useState(true);
	const [message, setMessage]         = useState(null);

	useEffect(() => {
		checkUser()
	}, []);

	const checkUser = async () => {
		var isLogin = await isAuthenticated();
		if(isLogin) {
			loadingProduct()
		} else {
            router.push('/auth/login');
		}
	}

	const loadingProduct = async () => {

		setLoading(true)
		const response = await getProducts();
		setLoading(false)
		
        const result   = response?.data;

		if(result?.status == 'success') {
			setProductList(result.data)

		} else {
            setMessage(result?.message || "Unable to fetch product")
        }

	}



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
								<img className="rounded-t-lg w-full" src={product.image} alt="" />
								<div className="p-5">
									<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{product.title}</h5>
									<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.description}</p>
									<Link href={`/product/${product.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 ">
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

