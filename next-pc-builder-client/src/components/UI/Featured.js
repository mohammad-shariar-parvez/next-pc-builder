import React from 'react';
import { Card } from 'antd';
import Link from 'next/link';
const gridStyle = {
	width: '33.32%',
	textAlign: 'center',
	position: 'relative'
};
const Featured = () => (
	<section style={{ padding: "16px" }}>
		<h1
			style={{
				textAlign: "center",
				fontSize: "50px",
				margin: "30px 0px",
			}}
		>
			FEATURED PRODUCTS
		</h1>
		<Card style={{ background: "#b8c0fe" }} >
			<Card.Grid style={gridStyle}>
				<Link href={'/categories/CPU'} className='featureCard'>
					CPU
				</Link>
			</Card.Grid>
			<Card.Grid style={gridStyle}>
				<Link href={'/categories/Motherboard'} className='featureCard'>
					Motherboard
				</Link>
			</Card.Grid>
			<Card.Grid style={gridStyle}>
				<Link href={'/categories/RAM'} className='featureCard' >
					RAM
				</Link>
			</Card.Grid>
			<Card.Grid style={gridStyle}>
				<Link href={'/categories/Power Supply Unit'} className='featureCard'>
					Power Supply Unit
				</Link>
			</Card.Grid>
			<Card.Grid style={gridStyle}>
				<Link href={'/categories/Storage Device'} className='featureCard'>
					Storage Device
				</Link>
			</Card.Grid>
			<Card.Grid style={gridStyle}>
				<Link href={'/categories/Monitor'} className='featureCard'>
					Monitor
				</Link>
			</Card.Grid>




		</Card>
	</section>
);
export default Featured;
{/* <Link href={`/products/${product?.id}`}>; */ }