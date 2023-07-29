/* eslint-disable react/jsx-key */
import { Col, Divider, Row, Space, Tag } from "antd";
import {
	UserOutlined,
	CalendarOutlined,
	CommentOutlined,
	ProfileOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import RootLayout from "@/components/Layouts/RootLayout";

const ProductDetailPage = ({ product }) => {
	return (



		<div style={{ padding: "16px" }}>
			<Row justify="center" style={{ marginTop: "80px", alignItems: "center", paddingTop: "0px", }} gutter={[{
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
				<Col md={6} lg={10}>
					<div style={{ width: "100vw", height: "300px" }} >
						<Image
							alt="example"
							src={product?.image}
							fill

						/>
					</div>
				</Col>
				<Col md={6} lg={10} >
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
							justifyContent: "space-between",
							width: "100%",
							color: "gray",
							margin: "10px 0px",
							fontSize: "20px",
						}}
					>
						<span>
							<CalendarOutlined /> {product?.status}
						</span>
						<span>
							{product?.price} BDT
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
							<CalendarOutlined /> {product?.individualRating}
						</span>
						<span>
							{product?.status}
						</span>
						<span>
							<ProfileOutlined /> {product?.averageRating}
						</span>
					</p>
					<div
						className="line"
						style={{
							height: "2px",
							margin: "20px 0",
							background: "#000",
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
							height: "1px",
							margin: "20px 0",
							background: "#000",
							width: "100%",
						}}
					></div>

				</Col>
				<Col md={6} lg={20} style={{ paddingLeft: "20px" }}>
					<p style={{ fontWeight: "lighter" }}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur quo enim doloribus quas veritatis. Praesentium dolore culpa eligendi modi labore. Totam laudantium earum incidunt facere dolorum, quidem nemo minima excepturi veniam? Suscipit voluptatem magni vel laudantium sunt reprehenderit, nihil dolores.
					</p>
				</Col>

			</Row>
			<Row justify="center" style={{ marginTop: "40px", paddingTop: "0px", }} >
				<Col md={6} lg={20} >
					<h1>User Reviews</h1>
					{
						product.reviews.map(review => (
							<div  >
								<Divider style={{ margin: "10px 0px" }} orientation="left" orientationMargin="0">User</Divider>
								<p style={{ fontWeight: "lighter" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus labore dolorum dicta at beatae dolorem alias ab quas sit aspernatur ut debitis, rem, laborum fugit sapiente, laudantium necessitatibus consectetur cum!</p>
							</div>
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
	const res = await fetch("http://localhost:5001/api/v1/products/");
	const products = await res.json();
	const paths = products?.data?.map((product) => ({
		params: { productId: product.id.toString() },
	}));
	// console.log("PPAATTHH IS ----", paths);

	return { paths, fallback: false };

};


export const getStaticProps = async (context) => {
	const { params } = context;
	console.log("cONFURION---------", params);

	const res = await fetch(`http://localhost:5001/api/v1/products/${params.productId}`);
	const data = await res?.json();
	// console.log("REAL ", data);
	return {
		props: {
			product: data.data,
		},

	};
};
