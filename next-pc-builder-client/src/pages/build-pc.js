import RootLayout from '@/components/Layouts/RootLayout';
import React from 'react';
import { Avatar, Button, List } from 'antd';
import Link from 'next/link';
import Image from 'next/image';

const data = [
	{
		title: 'CPU',
		query: '/categories/CPU'
	},
	{
		title: 'Motherboard',
		query: '/categories/Motherboard'
	},
	{
		title: 'RAM',
		query: '/categories/RAM'
	},
	{
		title: 'Power Supply Unit',
		query: '/categories/Power Supply Unit'
	},
	{
		title: 'Storage Device',
		query: '/categories/Storage Device'
	},
	{
		title: 'Monitor',
		query: '/categories/Monitor'
	},

];
const BuildPc = () => {
	return (
		<section>
			<List
				itemLayout="horizontal"
				dataSource={data}
				renderItem={(item, index) => (
					<List.Item >
						{/* <List.Item.Meta
							avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
							title={<a href="https://ant.design">{item.title}</a>}
						// description="Ant Design, a design language for background applications, is refined by Ant UED Team"
						/> */}
						<div style={{ display: "flex" }} >
							<h4 >{item.title}</h4>
						</div>


						<Link href={item.query}>
							<Button type="primary" style={{
								marginLeft: "15px",
							}} ghost>BUILD PC</Button>

						</Link>
					</List.Item>

				)}
			/>
		</section>
	);
};

BuildPc.getLayout = function getLayout(page) {
	return <RootLayout>{page}</RootLayout>;
};
export default BuildPc;