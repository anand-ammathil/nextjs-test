import React from "react";
import { List } from "antd";
import { setSelectedNews } from "news_store/action";
import { useDispatch, useSelector } from "react-redux";
import { News, NEWS_TYPE } from "types/news";
import { NewsState } from "types/store";

interface Props {}

const RelatedSide = (props: Props) => {
	const dispatch = useDispatch();
	const state = useSelector((state: NewsState) => state);
	const news = state.news[state.selectedSourceID].news.filter(
		(news) => news.type === NEWS_TYPE.ALL_NEWS
	);

	const randomRelated: News[] = [];

	[...Array(10)].map((i) => {
		randomRelated.push(news[Math.floor(Math.random() * news.length)]);
	});

	return (
		<div>
			<h2 className='text-2xl underline'>Related News</h2>
			<List
				dataSource={randomRelated}
				renderItem={(news, index) => (
					<List.Item
						key={"related" + news.url + index}
						onClick={() => {
							dispatch(setSelectedNews(news));
						}}
						className=' cursor-pointer'
						extra={
							<img
								className='w-2/6 hidden md:hidden lg:block max-h-full'
								alt={news.title}
								src={
									news.urlToImage ||
									"https://via.placeholder.com/350x350?text=imagenotfound"
								}
							/>
						}
					>
						<div className='h-auto'>
							<div className='font-light'>{news.source.name}</div>
							<div className='text-base font-medium  hide-line'>
								{news.title}
							</div>
						</div>
					</List.Item>
				)}
			/>
		</div>
	);
};

export default RelatedSide;
