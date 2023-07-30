import { Card, Col, Row } from "antd";
import Image from "next/image";
import {
	ArrowRightOutlined,
	CalendarOutlined,
	CommentOutlined,
	ProfileOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addToPcBuild } from "@/redux/pcBuildSlice";


const ProductsSelection = ({ allProducts }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { Meta } = Card;


	const addPcHandler = (product) => {
		const pro = product.category.replace(/\s+/g, "");
		dispatch(addToPcBuild({ [pro]: product }));
		router.push(`/build-pc`);
	};

	return (
		<>
			<h1
				style={{
					textAlign: "center",
					fontSize: "50px",
					margin: "30px 0px",
				}}
			>

			</h1>
			<Row
				gutter={[{
					xs: 8,
					sm: 16,
					md: 24,
					lg: 32,
				}, {
					xs: 8,
					sm: 16,
					md: 24,
					lg: 32,
				}]}
				justify="center"
			>
				{allProducts?.map((product) => (
					<Col key={product.id} className="gutter-row" lg={{
						span: 7,
					}}
						md={{
							span: 24,
						}}
						xs={{
							span: 24,
						}}
						sm={{
							span: 24,
						}}>
						<Card
							hoverable
							cover={
								<Image
									src={product?.image}
									width={300}
									height={200}

									alt="news image"
								/>
							}
						>
							<Meta title={product?.productName} />
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
									fontSize: "12px",
								}}
							>
								<span>
									<CalendarOutlined /> {product?.price} BDT
								</span>
								<span>
									<CalendarOutlined /> {product?.category}
								</span>

							</p>
							<p
								style={{
									display: "flex",
									justifyContent: "space-between",
									width: "100%",
									color: "gray",
									margin: "10px 0px",
									fontSize: "12px",
								}}
							>
								<span>
									<CalendarOutlined /> {product?.status}
								</span>
								<span>
									<CalendarOutlined /> {product?.averageRating}
								</span>

							</p>

							{/* <p style={{ fontSize: "15px" }}>
                {product?.status.length > 100
                  ? news?.description.slice(0, 70) + "..."
                  : news?.description}
              </p> */}



							<p
								onClick={() => addPcHandler(product)}
								style={{
									fontSize: "15px",
									marginTop: "20px",
									backgroundColor: "black",
									color: "white",
									width: "100%",
									padding: "2px 5px ",
									fontWeight: "300",
									letterSpacing: "3px",
									textAlign: "center",
								}}
							>
								ADD <ArrowRightOutlined />
							</p>




						</Card>
					</Col>
				))}
			</Row>
		</>
	);
};

export default ProductsSelection;
