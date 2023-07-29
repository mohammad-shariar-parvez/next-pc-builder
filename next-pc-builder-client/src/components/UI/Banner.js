/* eslint-disable react/no-unescaped-entities */
import { Col, Row, Carousel } from "antd";
import {
	ArrowRightOutlined,
	CalendarOutlined,
	CommentOutlined,
	ProfileOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import cpu_image from "@/assets/images/banner-images/cpu_image.jpg";
import pc_image_2 from "@/assets/images/banner-images/pc_image_2.png";
import Link from "next/link";

const contentStyle = {
	height: "425px",
	color: "#000",
};

const Banner = () => (
	<Carousel effect="fade" autoplay style={{ paddingBottom: "30px" }}>

		<div>
			<Row gutter={{
				xs: 8,
				sm: 16,
				md: 24,
				lg: 32,
			}}>

				<Col
					lg={{
						span: 16,
					}}
					md={{
						span: 24,
					}}
					xs={{
						span: 24,
					}}
					sm={{
						span: 24,
					}}
					style={contentStyle}
				>
					<Image
						src={pc_image_2}
						fill
						alt="eagle_image"
						style={{ grayScale: "-1", objectFit: "fill" }}

					/>
				</Col>
				<Col
					lg={{
						span: 8,
					}}

				>
					<div style={{ padding: "0px 16px" }}>
						<h1 style={{ fontSize: "45px" }}>
							TOP PC BUILDING
							<br />
							HUB
						</h1>
						<div
							className="line"
							style={{
								height: "5px",
								margin: "20px 0",
								background: "#000",
								width: "95%",
							}}
						></div>

						<p
							style={{
								display: "flex",
								justifyContent: "space-between",
								width: "90%",
								color: "gray",
								margin: "10px 0px",
							}}
						>
							<span>
								<CalendarOutlined /> JULY 30, 2023
							</span>
							<span>
								<CommentOutlined /> 124 COMMENTS
							</span>
							<span>
								<ProfileOutlined /> PC
							</span>
						</p>

						<p style={{ fontSize: "20px" }}>
							Discover a world of possibilities as you embark on your journey to create the dream PC of your desires. Whether you're a gaming enthusiast, content creator, or a tech-savvy individual seeking peak performance, our PC Building Hub has you covered.
						</p>



						<Link href="/build-pc" style={{
							fontSize: "20px",
							margin: "40px 0px",
							backgroundColor: "black",
							color: "white",
							width: "168px",
							padding: "2px 5px ",
							fontWeight: "300",
							letterSpacing: "3px",
							text: "red",
							display: "inline-block"
						}}>

							MORE <ArrowRightOutlined />
						</Link>
					</div>

				</Col>

			</Row>
		</div>
		<div>
			<Row gutter={{
				xs: 8,
				sm: 16,
				md: 24,
				lg: 32,
			}}>

				<Col
					lg={{
						span: 16,
					}}
					md={{
						span: 24,
					}}
					xs={{
						span: 24,
					}}
					sm={{
						span: 24,
					}}
					style={contentStyle}
				>
					<Image
						src={cpu_image}
						fill
						alt="eagle_image"
						style={{ grayScale: "-1", objectFit: "fill" }}

					/>
				</Col>
				<Col
					lg={{
						span: 8,
					}}
				>
					<div style={{ padding: "0px 16px" }}>
						<h1 style={{ fontSize: "45px" }}>
							TOP PC BUILDING
							<br />
							HUB
						</h1>
						<div
							className="line"
							style={{
								height: "5px",
								margin: "20px 0",
								background: "#000",
								width: "95%",
							}}
						></div>

						<p
							style={{
								display: "flex",
								justifyContent: "space-between",
								width: "90%",
								color: "gray",
								margin: "10px 0px",
							}}
						>
							<span>
								<CalendarOutlined /> JULY 30, 2023
							</span>
							<span>
								<CommentOutlined /> 124 COMMENTS
							</span>
							<span>
								<ProfileOutlined /> PC
							</span>
						</p>

						<p style={{ fontSize: "20px" }}>
							Discover a world of possibilities as you embark on your journey to create the dream PC of your desires. Whether you're a gaming enthusiast, content creator, or a tech-savvy individual seeking peak performance, our PC Building Hub has you covered.
						</p>



						<Link href="/build-pc" style={{
							fontSize: "20px",
							margin: "40px 0px",
							backgroundColor: "black",
							color: "white",
							width: "168px",
							padding: "2px 5px ",
							fontWeight: "300",
							letterSpacing: "3px",
							text: "red",
							display: "inline-block"
						}}>

							MORE <ArrowRightOutlined />
						</Link>
					</div>

				</Col>

			</Row>
		</div>
	</Carousel>
);
export default Banner;
