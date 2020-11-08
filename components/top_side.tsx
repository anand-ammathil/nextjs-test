import { List, Skeleton } from "antd";
import { fetchTopNews, setSelectedNews } from "news_store/action";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NEWS_TYPE } from "types/news";
import { NewsState } from "types/store";

interface Props {}

const TopSide = (props: Props) => {
	const dispatch = useDispatch();
	const state = useSelector((state: NewsState) => state);
	const topNews = state.news[state.selectedSourceID].news.filter(
		(news) => news.type === NEWS_TYPE.TOP_NEWS
	);
	useEffect(() => {
		if (topNews.length == 0) dispatch(fetchTopNews(state.selectedSource));
	}, [dispatch, , state.selectedSourceID]);

	return (
		<div>
			<h2 className='text-2xl underline'>Top News</h2>
			{topNews.length !== 0 ? (
				<List
					dataSource={topNews}
					renderItem={(news) => (
						<List.Item
							key={"top" + news.url}
							className=' cursor-pointer'
							onClick={() => {
								dispatch(setSelectedNews(news));
							}}
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
							<div className='h-auto w-4/6'>
								<div className='font-light'>
									{news.source.name}
								</div>
								<div className='text-base font-medium  hide-line'>
									{news.title}
								</div>
							</div>
						</List.Item>
					)}
				/>
			) : (
				<List
					dataSource={Array(3).fill(0)}
					renderItem={(i, index) => (
						<List.Item key={"top-skeleton" + index}>
							<Skeleton active></Skeleton>
						</List.Item>
					)}
				/>
			)}
		</div>
	);
};

export default TopSide;
