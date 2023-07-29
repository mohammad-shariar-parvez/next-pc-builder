
import React from 'react';
import { Avatar, Button, List } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addToPcBuild, clearPcBuild } from '@/redux/pcBuildSlice';
import RootLayout from '@/components/Layouts/RootLayout';


const data = [
	{
		title: 'CPU',
		query: '/build-pc/choose/CPU'
	},
	{
		title: 'Motherboard',
		query: '/build-pc/choose/Motherboard'
	},
	{
		title: 'RAM',
		query: '/build-pc/choose/RAM'
	},
	{
		title: 'Power Supply Unit',
		query: '/build-pc/choose/Power Supply Unit'
	},
	{
		title: 'Storage Device',
		query: '/build-pc/choose/Storage Device'
	},
	{
		title: 'Monitor',
		query: '/build-pc/choose/Monitor'
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

	const handleComplete = () => {
		console.log("yoyoyo");
		dispatch(clearPcBuild());
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
					<Button type="primary" onClick={handleComplete} block style={{ marginTop: "25px" }}>
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
export default BuildPc;

BuildPc.getLayout = function getLayout(page) {
	return <RootLayout>{page}</RootLayout>;
};


// export async function getServerSideProps() {
// 	// Here you can initialize an empty initial state if needed,
// 	// or any other data you want to pass to the page props.
// 	const initialState = {};

// 	return {
// 		props: {
// 			initialState,
// 		},
// 	};
// }

// import React from 'react';

// const BuiltPageHOme = () => {
// 	return (
// 		<div>BuiltPageHOme</div>
// 	);
// };

// export default BuiltPageHOme;