import Image from 'next/image'

export default function Home() {

	const products = [
		{
			title: "Product 1",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			image: "https://picsum.photos/400/200",
		},
		{
			title: "Product 2",
			description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			image: "https://picsum.photos/400/200",
		},
		{
			title: "Product 3",
			description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
			image: "https://picsum.photos/400/200",
		},
		{
			title: "Product 4",
			description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
			image: "https://picsum.photos/400/200",
		},
		{
			title: "Product 5",
			description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			image: "https://picsum.photos/400/200",
		},
		{
			title: "Product 6",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			image: "https://picsum.photos/400/200",
		},
		{
			title: "Product 7",
			description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			image: "https://picsum.photos/400/200",
		},
		{
			title: "Product 8",
			description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
			image: "https://picsum.photos/400/200",
		},
		{
			title: "Product 9",
			description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
			image: "https://picsum.photos/400/200",
		},
	];
	  
	  

  	return (
    	<div className='text-gray-600 body-font relative h-screen'>
			<div className='max-w-6xl mx-auto py-20'>
				<div className="text-center">
					<Image alt="" src={"/logo-bookandlink-1.png"} width={0}
						height={0} sizes="80vw"
						style={{ width: '300px', height: 'auto', margin : '0 auto' }} /> 
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-16'>

					{ products.map((product, index) => (
						<div className="bg-white border border-gray-200 rounded-lg shadow ">
							<a href="#">
								<img className="rounded-t-lg" src={product.image + "?random=" + index} alt="" />
							</a>
							<div className="p-5">
								<a href="#">
									<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{product.title}</h5>
								</a>
								<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.description}</p>
								<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg ">
									Read more
								</a>
							</div>
						</div>
					))}
					


				</div>

			</div>
		</div>
  	)
}

