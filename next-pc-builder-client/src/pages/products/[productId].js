/* eslint-disable react/jsx-key */
import { Avatar, Col, Divider, List, Row, Space, Tag } from "antd";
import {
	UserOutlined,
	CalendarOutlined,
	CommentOutlined,
	ProfileOutlined,
	StarOutlined,
	MoneyCollectOutlined,
	StockOutlined
} from "@ant-design/icons";
import Image from "next/image";
import RootLayout from "@/components/Layouts/RootLayout";

const ProductDetailPage = ({ product }) => {
	console.log(product);
	return (

		<div style={{ padding: "16px", maxWidth: "1300px", margin: "auto", }}>
			<Row justify="center" style={{ marginTop: "20px", alignItems: "center", paddingTop: "0px", }} gutter={[{
				xs: 8,
				sm: 16,
				md: 24,
				lg: 32,
			}, {
				xs: 8,
				sm: 16,
				md: 24,
				lg: 32,
			}]}>
				<Col md={6} lg={12}>
					<div style={{ width: "100vw", height: "300px", padding: "16px" }} >
						<Image
							alt="example"
							src={product?.image}
							fill

						/>
					</div>
				</Col>
				<Col md={6} lg={12} >
					<h1 style={{ fontSize: "30px" }}>{product?.productName}</h1>
					<span
						style={{
							color: "gray",
							display: "block",
							fontSize: "20px",
						}}
					>
						<UserOutlined /> {product?.description}
					</span>
					<div
						className="line"
						style={{
							height: "5px",
							margin: "20px 0",
							background: "#000",
							width: "100%",
						}}
					></div>

					<p
						style={{
							display: "flex",
							flex: "start",
							justifyContent: "space-between",
							width: "100%",
							color: "gray",
							margin: "10px 0px",
							fontSize: "20px",
						}}
					>
						<span>
							<StockOutlined /> {product?.status}
						</span>
						<span>
							<MoneyCollectOutlined />{product?.price} BDT
						</span>
						<span>
							<ProfileOutlined /> {product?.category}
						</span>
					</p>
					<p
						style={{
							display: "flex",
							justifyContent: "space-between",
							width: "100%",
							color: "gray",
							margin: "10px 0px",
							fontSize: "20px",
						}}
					>
						<span>
							Personal: <StarOutlined /> {product?.individualRating}
						</span>

						<span>
							Average: <StarOutlined /> {product?.averageRating}
						</span>
					</p>
					<div
						className="line"
						style={{
							height: "0px",
							margin: "20px 0",
							background: "gray",
							width: "100%",
						}}
					></div>
					<Space size={[0, 8]} wrap>
						{
							Object.values(product.keyFeatures).map(item => (
								// eslint-disable-next-line react/jsx-key
								<Tag color="geekblue"> {item}</Tag>

							))
						}
					</Space>
					<div
						className="line"
						style={{
							height: "0.5px",
							margin: "20px 0",
							background: "gray",
							width: "100%",
						}}
					></div>

				</Col>
				<Col md={6} lg={24} >
					<p >
						{product.description
						}
					</p>
				</Col>

			</Row>
			<Row justify="start" style={{ marginTop: "40px", paddingTop: "0px", }} >
				<Col md={6} lg={20} >
					<h1>User Reviews</h1>

					{
						product.reviews.map((review, index) => (
							<List
							>
								<List.Item>
									<List.Item.Meta
										avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
										title={<a href="https://ant.design">User</a>}
										description={review}
									/>
								</List.Item>
								<Divider style={{ margin: "0px 0px" }} ></Divider>


							</List>
						))
					}

				</Col>
			</Row>

		</div>

	);



};
export default ProductDetailPage;

ProductDetailPage.getLayout = function getLayout(page) {
	return <RootLayout>{page}</RootLayout>;
};


export const getStaticPaths = async () => {
	const res = await fetch("https://next-pc-builder-server.vercel.app/api/v1/products/");
	const products = await res.json();
	const paths = products?.data?.map((product) => ({
		params: { productId: product.id.toString() },
	}));
	// console.log("PPAATTHH IS ----", paths);

	return { paths, fallback: false };

};


export const getStaticProps = async (context) => {
	const { params } = context;


	const res = await fetch(`https://next-pc-builder-server.vercel.app/api/v1/products/${params.productId}`);
	const data = await res?.json();
	// console.log("REAL ", data);
	return {
		props: {
			product: data.data,
		},

	};
};
