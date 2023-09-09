"use client"; 

import Image from 'next/image'
import { useEffect, useState } from 'react';
import { isAuthenticated, userToken } from '../api/auth';
import axios from "@/utils/axios";
import MainLayout from '@/components/mainLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Home() {
    const router                = useRouter();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const { id }                = router.query;

	useEffect(() => {
		checkUser()
	}, []);

	const checkUser = async () => {
		var isLogin = await isAuthenticated();
		if(isLogin) {
			loadingProduct()
		} else {
			window.location.replace("/auth/login")
		}
	}

	async function loadingProduct()  {
        var productId = id;
        try {
            const response = await axios.get('/api/product/' + productId, {
                headers : {
                    'Authorization': 'Bearer ' + userToken(),
                }
            });
            
            const result = response.data;
            setLoading(false);

            if(result.status == 'success') {
                setProduct(result.data)
                console.log(result.data)
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            setLoading(false);
            setMessage("Unable to fetch product")
        }
        
	}



  	return (
    	<MainLayout>


			<div className='max-w-4xl mx-auto py-16 px-4'>
				<div className="text-center">
					<Image alt="" src={"/logo-bookandlink-1.png"} width={0}
						height={0} sizes="80vw"
						style={{ width: '300px', height: 'auto', margin : '0 auto' }} /> 
				</div>

				{
					loading ? 

					<div className='mt-16'>
                        <div className="bg-white border border-gray-200 rounded-lg shadow ">
                            <div className="h-44 bg-gray-200 animate-pulse"></div>
                            <div className="p-5">
                                <div className="w-2/3 rounded-lg h-6 bg-gray-200 animate-pulse mb-4"/>
                                <div className="w-full rounded-lg h-4 bg-gray-200 animate-pulse mb-4"/>
                                <div className="w-3/4 rounded-lg h-4 bg-gray-200 animate-pulse mb-4"/>
                                <div className="w-32 rounded-lg h-6 bg-gray-200 animate-pulse mb-4"/>
                            </div>
                        </div>
					</div>

					:

					<div className='mt-16'>
                        <div className="bg-white border border-gray-200 rounded-lg shadow ">
								<img className="rounded-t-lg w-full" src={product.image} alt="" />
								<div className="p-5">
									<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{product.title}</h5>
									<p className="mb-3 font-normal text-gray-700 ">{product.description}</p>
								</div>
							</div>
					</div>

				}

			</div>
		</MainLayout>
  	)
}

