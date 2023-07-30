import RootLayout from '@/components/Layouts/RootLayout';
import AllProducts from '@/components/UI/AllProducts';
import React from 'react';

const CategoeisedProduct = ({ product }) => {
	console.log("PRODUCT ID", product);
	return (
		<div style={{ padding: "20px" }}>

			<AllProducts allProducts={product} />
		</div>
	);
};

export default CategoeisedProduct;

CategoeisedProduct.getLayout = function getLayout(page) {
	return <RootLayout>{page}</RootLayout>;
};


export const getStaticPaths = async () => {
	const res = await fetch("https://next-pc-builder-server.vercel.app/api/v1/products/");
	const products = await res.json();
	// console.log("PPAATTHH IS ----", products);
	const paths = products?.data?.map((product) => ({
		params: { categoryId: product?.category.toString() },
	}));

	return { paths, fallback: false };

};

export const getStaticProps = async (context) => {
	const { params } = context;
	// console.log("cONFURION---------", params);

	const res = await fetch(`https://next-pc-builder-server.vercel.app/api/v1/products/?&category=${params.categoryId}`);
	const data = await res?.json();
	return {
		props: {
			product: data.data,
		},

	};
};