import {
	ProfileOutlined,
	MobileOutlined,
	UserOutlined,
	FacebookFilled,
	LinkedinFilled,
	GoogleSquareFilled,
	TwitterSquareFilled,
} from "@ant-design/icons";
import { Button, Layout, Menu, Dropdown, Space } from "antd";
const { Header, Content, Footer } = Layout;
import { DownOutlined } from '@ant-design/icons';
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";



const items = [
	{
		key: '1',
		label: (
			<Link href={'/categories/CPU'} >
				CPU
			</Link>
		),
	},
	{
		key: '2',
		label: (
			<Link href={'/categories/Motherboard'} >
				Motherboard
			</Link>
		),
	},
	{
		key: '3',
		label: (
			<Link href={'/categories/RAM'}  >
				RAM
			</Link>
		),
	},
	{
		key: '4',
		label: (
			<Link href={'/categories/Power Supply Unit'} >
				Power Supply Unit
			</Link>
		),
	},
	{
		key: '5',
		label: (
			<Link href={'/categories/Storage Device'} >
				Storage Device
			</Link>
		),
	},
	{
		key: '6',
		label: (
			<Link href={'/categories/Monitor'} >
				Monitor
			</Link>
		),
	},

];

const RootLayout = ({ children }) => {
	const { data: session } = useSession();
	// console.log("This is seeerpo", session);
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
					<Dropdown
						style={{
							marginLeft: "55px",
							padding: "30px"
						}}
						menu={{
							items,
						}}

					>
						<a onClick={(e) => e.preventDefault()}>
							<Space>
								Categories
								<DownOutlined />
							</Space>
						</a>
					</Dropdown>


					<Link href="/build-pc">
						<Button style={{
							marginLeft: "15px",
						}} ghost>BUILD PC</Button>

					</Link>
					{!session?.user ? (<Link style={{ textDecoration: "none", color: "white" }} href="/login">
						<items>Login</items>
					</Link>)
						:
						(<items>
							<Button onClick={() => signOut()} type="primary" danger>
								Logout
							</Button>
						</items>)}

				</Menu>
			</Header>
			<div style={{ paddingBottom: "50px" }}></div>

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
