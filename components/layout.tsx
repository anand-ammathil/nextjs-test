import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import Link from "next/link";
import Head from "next/head";

interface Props {
	children: JSX.Element;
}

const MainLayout = (props: Props) => {
	return (
		<Layout
			className='bg-white'
			style={{ minHeight: "100vh", background: "#fff" }}
		>
			<Head>
				<title>A NEWS SITE</title>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<div className='w-full h-20 flex  justify-center  items-center'>
				<Link href='/'>
					<h1 className='text-3xl cursor-pointer'>A NEWS SITE</h1>
				</Link>
			</div>
			{props.children}
		</Layout>
	);
};

export default MainLayout;
