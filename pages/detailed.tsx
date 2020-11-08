import { Row } from "antd";
import MainLayout from "components/layout";
import RelatedSide from "components/related_nav";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NewsState } from "types/store";
import { useRouter } from "next/router";
import { format, parseISO } from "date-fns";

interface Props {}

const Detailed = (props: Props) => {
	const router = useRouter();
	const state = useSelector((state: NewsState) => state);

	useEffect(() => {
		if (state.selectedNews === null) {
			router.replace("/");
		}
	}, [state.selectedNews]);
	const selectedNews = state.selectedNews;

	return (
		<MainLayout>
			<Row className='p-6 flex justify-around'>
				<div className='md:w-6/12 w-11/12 '>
					<img
						className='w-full'
						src={
							selectedNews?.urlToImage ||
							"https://via.placeholder.com/350x350?text=imagenotfound"
						}
					/>
					<div className='font-light  pt-4 '>
						{selectedNews?.source.name}
						{"  @"}
						{format(
							parseISO(selectedNews?.publishedAt || ""),
							"yy-MM-dd HH:mm"
						)}
					</div>
					<h2 className='text-3xl font-bold'>
						{selectedNews?.title}
					</h2>
					<div className='text-lg  font-light'>
						{selectedNews?.content}
					</div>
					<a href={selectedNews?.url} target='_blank'>
						<div className='text-lg py-2 font-light'>
							Read full story
						</div>
					</a>
				</div>
				<div className='md:w-3/12 w-11/12 '>
					<RelatedSide />
				</div>
			</Row>
		</MainLayout>
	);
};

Detailed.getInitialProps = ({ res }: any) => {
	if (res) {
		res.writeHead(301, {
			Location: "/",
		});
		res.end();
	}
	return {};
};

export default Detailed;
