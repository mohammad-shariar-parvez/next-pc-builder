import {
	ProfileOutlined,
	MobileOutlined,
	UserOutlined,
	FacebookFilled,
	LinkedinFilled,
	GoogleSquareFilled,
	TwitterSquareFilled,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const RootLayout = ({ children }) => {
	return (
		<Layout>
			<Header
				style={{
					display: "flex",
					justifyContent: "space-between",
					width: "100%",
					position: "fixed",
					top: "0",
					zIndex: "999",
					paddingLeft: "30px"

				}}
			>
				<div className="brand-logo">
					<h2>
						<Link
							href="/"
							style={{
								color: "white",
								backgroundColor: "#404040",
								padding: "5px 10px",
								borderRadius: "3px",
								whiteSpace: "nowrap"
							}}
						>
							MSP PC
						</Link>
					</h2>
				</div>
				<Menu theme="dark" mode="vertical" className={styles.menu_items}>
					<Link href="/allNews">
						<items style={{
							marginLeft: "15px",
						}}>
							<ProfileOutlined />
							All News
						</items>
					</Link>

					<Link href="/about">
						<items
							style={{
								marginLeft: "15px",
							}}
						>
							<UserOutlined />
							About Us
						</items>
					</Link>

				</Menu>
			</Header>

			<Content
				style={{
					padding: "40px 24px",
					minHeight: "100vh",
					padding: " 45px 0px 0px 0px "
				}}
			>
				{children}
			</Content>

			<Footer
				style={{
					textAlign: "center",
				}}
			>
				<div className={styles.line}></div>
				<h2
					style={{
						fontSize: "28px",
					}}
				>
					MSP PC BUILDER
				</h2>
				<p className={styles.social_icons}>
					<Link href="https://web.facebook.com/groups/programmingherocommunity">
						<FacebookFilled />
					</Link>
					<Link href="www.twitter.com">
						<TwitterSquareFilled />
					</Link>
					<Link href="https://web.programming-hero.com/home/">
						<GoogleSquareFilled />
					</Link>
					<Link href="www.linkedin.com">
						<LinkedinFilled />
					</Link>
				</p>
				MSP PC Builder ©2023 Created by MSP Web Solutions
			</Footer>
		</Layout>
	);
};
export default RootLayout;
