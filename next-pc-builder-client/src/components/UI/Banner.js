import { Col, Row, Carousel } from "antd";
import {
	ArrowRightOutlined,
	CalendarOutlined,
	CommentOutlined,
	ProfileOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import DrawingImage from "@/assets/images/banner-images/drawing_image.jpg";
import EagleImage from "@/assets/images/banner-images/eagle_image.jpg";

const contentStyle = {
	height: "425px",
	color: "#000",
};

const Banner = () => (
	<Carousel effect="fade" autoplay style={{ margin: "20px 0px" }}>
		{/* slider-1 */}

		{/* slider-2 */}
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
						src={EagleImage}
						fill
						alt="eagle_image"
						style={{ grayScale: "-1" }}

					/>
				</Col>
				<Col
					lg={{
						span: 8,
					}}
				>
					<h1 style={{ fontSize: "50px" }}>
						EAGLE, YOU ARE
						<br />
						NOT ALONE
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
							<CalendarOutlined /> MARCH 30, 2023
						</span>
						<span>
							<CommentOutlined /> 5 COMMENTS
						</span>
						<span>
							<ProfileOutlined /> NATURE
						</span>
					</p>

					<p style={{ fontSize: "20px" }}>
						A spread opened patient and compulsively one placed seagull goodness
						python owing snapped yikes equitable when much the much Lorem ipsum
						dolor sit, amet consectetur adipisicing elit. Eligendi, tenetur!...
					</p>
					<p
						style={{
							fontSize: "20px",
							margin: "20px 0px",
							backgroundColor: "black",
							color: "white",
							width: "168px",
							padding: "2px 5px ",
							fontWeight: "300",
							letterSpacing: "3px",
						}}
					>
						Order <ArrowRightOutlined />
					</p>
				</Col>

			</Row>
		</div>
	</Carousel>
);
export default Banner;
