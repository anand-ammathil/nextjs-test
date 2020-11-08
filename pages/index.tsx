import React, { useCallback, useEffect } from "react";
import MainLayout from "components/layout";
import { Card, List, Button, Skeleton, Row, Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNews, setSelectedNews } from "news_store/action";
import { NewsState } from "types/store";
import SourceNav from "components/source_nav";
import TopSide from "components/top_side";
import { NEWS_TYPE } from "types/news";
import { format, parseISO } from "date-fns";

interface Props {}

const Home = (props: Props) => {
	const dispatch = useDispatch();
	const state = useSelector((state: NewsState) => state);
	let allNews = state.news[state.selectedSourceID].news.filter(
		(news) => news.type === NEWS_TYPE.ALL_NEWS
	);

	const fnFetchNews = useCallback(() => {
		let crObj = state.news[state.selectedSourceID];
		dispatch(fetchAllNews(crObj.page, crObj.perPage, state.selectedSource));
	}, [state]);
	useEffect(() => {
		if (state.news[state.selectedSourceID].news.length == 0) fnFetchNews();
	}, [dispatch, state.selectedSourceID]);

	return (
		<MainLayout>
			<>
				<Layout style={{ minHeight: "100vh", background: "#fff" }}>
					<Layout.Content className='site-layout-background'>
						<SourceNav />
						<h2 className='text-2xl p-2 pl-4'>
							Source :{" "}
							{state.selectedSource
								? state.selectedSource.name
								: "Global"}
						</h2>

						<Row className='p-2 flex justify-around'>
							<div className='md:w-3/12 w-11/12 '>
								<TopSide />
							</div>
							<div className='md:w-8/12 w-11/12 '>
								<h2 className='text-2xl underline'>
									All News{" "}
								</h2>
								{(!state.newsLoading ||
									allNews.length !== 0) && (
									<List
										grid={{
											gutter: 20,
											xs: 1,
											sm: 2,
											md: 2,
											lg: 2,
											xl: 3,
											xxl: 3,
										}}
										dataSource={allNews}
										renderItem={(news) => (
											<List.Item
												key={"all" + news.url}
												className='shadow cursor-pointer'
											>
												<Card
													onClick={() => {
														dispatch(
															setSelectedNews(
																news
															)
														);
													}}
													cover={
														<img
															className='object-cover h-64'
															alt={news.title}
															src={
																news.urlToImage ||
																"https://via.placeholder.com/350x350?text=imagenotfound"
															}
														/>
													}
													title={""}
													bodyStyle={{
														padding: "0px",
														height: "150px",
													}}
												>
													<div className='p-3'>
														<div className='font-light'>
															{format(
																parseISO(
																	news.publishedAt
																),
																"yy-MM-dd HH:mm"
															)}
														</div>
														<div className='font-thin'>
															{news.source.name}
														</div>
														<div className='font-light'></div>
														<div className='font-semibold text-lg hide-line'>
															{news.title}
														</div>
													</div>
												</Card>
											</List.Item>
										)}
									/>
								)}

								{state.newsLoading ? (
									<List
										grid={{
											gutter: 16,
											xs: 3,
											sm: 2,
											md: 2,
											lg: 2,
											xl: 3,
											xxl: 3,
										}}
										dataSource={Array(6).fill(0)}
										renderItem={(i) => (
											<List.Item key={"allskeleton" + i}>
												<Skeleton active></Skeleton>
											</List.Item>
										)}
									/>
								) : (
									<div className='w-full py-8 flex justify-center'>
										<Button
											onClick={() => fnFetchNews()}
											className='text-xl lg:w-4/12'
										>
											LOAD MORE
										</Button>
									</div>
								)}
							</div>
						</Row>
					</Layout.Content>
				</Layout>
			</>
		</MainLayout>
	);
};

export default Home;
