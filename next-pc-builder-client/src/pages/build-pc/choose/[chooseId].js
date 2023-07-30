import RootLayout from '@/components/Layouts/RootLayout';
import AllProducts from '@/components/UI/AllProducts';
import ProductsSelection from '@/components/UI/ProductsSelection';
import React from 'react';

const ChooseProduct = ({ product }) => {
	console.log("PRODUCT ID", product);
	return (
		<div >
			{/* <ProductsSelection allProducts={product} /> */}

			<AllProducts allProducts={product} category />
		</div>
	);
};

export default ChooseProduct;

ChooseProduct.getLayout = function getLayout(page) {
	return <RootLayout>{page}</RootLayout>;
};


// export const getStaticPaths = async () => {
// 	const res = await fetch("http://localhost:5001/api/v1/products/");
// 	const products = await res.json();
// 	// console.log("PPAATTHH IS ----", products);
// 	const paths = products?.data?.map((product) => ({
// 		params: { chooseId: product?.category.toString() },
// 	}));

// 	return { paths, fallback: false };

// };

export const getServerSideProps = async (context) => {
	const { params } = context;


	const res = await fetch(`https://next-pc-builder-server.vercel.app/api/v1/products/?&category=${params.chooseId}`);
	const data = await res?.json();
	return {
		props: {
			product: data.data,
		},

	};
};