
import React from 'react';
import { Avatar, Button, Col, List, Row, notification } from 'antd';
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
	const [api, contextHolder] = notification.useNotification();
	const pcBuild = useSelector((state) => state.pcBuild);
	const dispatch = useDispatch();

	const openNotificationWithIcon = (type) => {
		api[type]({
			message: 'PC Built Sucessfully'

		});
	};

	const removeItem = (title) => {
		const pro = title.replace(/\s+/g, "");
		dispatch(addToPcBuild({ [pro]: null }));

	};

	const handleComplete = () => {
		dispatch(clearPcBuild());
		openNotificationWithIcon('success');
	};

	return (
		<section style={{ padding: "16px", maxWidth: "1300px", margin: "auto", overflowX: "hidden" }}>
			{contextHolder}
			<List
				itemLayout="horizontal"
				dataSource={data}
				renderItem={(item, index) => (
					<List.Item >

						<Row align="top" gutter={[8, 8]} style={{ width: "100%" }}>
							<Col xs={5} sm={5} md={5} lg={8} xl={8}>

								<div style={{ display: "flex" }} >
									<h4 >{item.title}</h4>
								</div>

							</Col>
							<Col xs={13} sm={13} md={13} lg={13} xl={13}>
								{


									pcBuild[item.title.replace(/\s+/g, "")] && (
										<Col xs={2} sm={4} md={6} lg={10} xl={10}>
											<div style={{ display: "flex", alignItems: "start", width: "100vh" }}>

												<Image
													src={pcBuild[item.title.replace(/\s+/g, "")].image}
													alt="booked image"
													width={80}
													height={65}

												/>
												<div style={{ marginLeft: "10px" }}>
													<p>{pcBuild[item.title.replace(/\s+/g, "")].productName.substring(0, 17)}...</p>
													<p>{pcBuild[item.title.replace(/\s+/g, "")].price} Tk</p>
													<p>{pcBuild[item.title.replace(/\s+/g, "")].category} </p>
												</div>

											</div>
										</Col>

									)
								}
							</Col>
							<Col xs={1} sm={1} md={1} lg={2} xl={2}>
								{
									!pcBuild[item.title.replace(/\s+/g, "")] ? (<div>
										<Link href={item.query}>
											<Button type="primary" style={{
												marginLeft: "15px",
											}} ghost>BUILD PC</Button>

										</Link>
									</div>)
										:
										(

											<div>
												<Button onClick={() => removeItem(item.title)} type="primary" style={{
													marginLeft: "15px",
												}} danger ghost>Cancel</Button>
											</div>


										)
								}
							</Col>

						</Row>

					</List.Item>


				)}

			/>

			{
				Object.values(pcBuild).every((value) => value != null) ? (
					<>

						<Button type="primary" onClick={handleComplete} block style={{ marginTop: "25px" }}>
							Complete
						</Button>
					</>

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

