import RootLayout from '@/components/Layouts/RootLayout';
import React from 'react';
import { Avatar, Button, List } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addToPcBuild } from '@/redux/pcBuildSlice';

const data = [
	{
		title: 'CPU',
		query: '/choose/CPU'
	},
	{
		title: 'Motherboard',
		query: '/choose/Motherboard'
	},
	{
		title: 'RAM',
		query: '/choose/RAM'
	},
	{
		title: 'Power Supply Unit',
		query: '/choose/Power Supply Unit'
	},
	{
		title: 'Storage Device',
		query: '/choose/Storage Device'
	},
	{
		title: 'Monitor',
		query: '/choose/Monitor'
	},

];
const BuildPc = () => {
	const pcBuild = useSelector((state) => state.pcBuild);
	const dispatch = useDispatch();
	console.log("STOREEEE22222222", pcBuild);

	const removeItem = (title) => {
		const pro = title.replace(/\s+/g, "");
		dispatch(addToPcBuild({ [pro]: null }));

	};

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
						{

							pcBuild[item.title.replace(/\s+/g, "")] && (
								<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

									<Image
										src={pcBuild[item.title.replace(/\s+/g, "")].image}
										alt="booked image"
										width={100}
										height={70}
									/>
									<div style={{ marginLeft: "10px" }}>
										<p>{pcBuild[item.title.replace(/\s+/g, "")].productName}</p>
										<p>{pcBuild[item.title.replace(/\s+/g, "")].price}</p>
										<p>{pcBuild[item.title.replace(/\s+/g, "")].category}</p>
									</div>

								</div>

							)
						}
						{
							!pcBuild[item.title.replace(/\s+/g, "")] ? (<Link href={item.query}>
								<Button type="primary" style={{
									marginLeft: "15px",
								}} ghost>BUILD PC</Button>

							</Link>)
								:
								(

									<Button onClick={() => removeItem(item.title)} type="primary" style={{
										marginLeft: "15px",
									}} ghost>Cancel</Button>


								)
						}

					</List.Item>

				)}
			/>
			{
				Object.values(pcBuild).every((value) => value != null) ? (
					<Button type="primary" block style={{ marginTop: "25px" }}>
						Complete
					</Button>
				)
					: (
						<Button type="primary" disabled={true} block style={{ marginTop: "25px" }}>
							Complete
						</Button>
					)
			}

		</section>
	);
};

BuildPc.getLayout = function getLayout(page) {
	return <RootLayout>{page}</RootLayout>;
};
export default BuildPc;