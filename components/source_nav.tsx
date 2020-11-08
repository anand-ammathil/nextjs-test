import { Input, Menu, Row, Skeleton } from "antd";
import React, { useEffect, useRef, useState } from "react";

import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { NewsState } from "types/store";
import { fetchSource } from "news_store/action";
import { Source } from "types/news";

interface Props {}

const SourceNav = (props: Props) => {
	const dispatch = useDispatch();
	const state = useSelector((state: NewsState) => state);
	useEffect(() => {
		if (state.sources.length == 0) dispatch(fetchSource());
	}, [dispatch]);
	let [toggle, setToggle] = useState<boolean>(false);
	let categoryList = useRef<string[]>([]);
	let categoryMap = useRef<{ [key: string]: Source[] }>({});
	useEffect(() => {
		categoryList.current = _.uniq(_.map(state.sources, "category"));
		state.sources.forEach((cat) => {
			if (categoryMap.current[cat.category] === undefined)
				categoryMap.current[cat.category] = [];
			categoryMap.current[cat.category].push(cat);
		});
		setToggle(!toggle);
	}, [state.sources]);

	return (
		<Row className='border-solid border-gray-600 border-t-2 border-b-2'>
			<Menu mode='horizontal' className='h-12 '>
				{state.sources.length === 0
					? [...Array(5)].map((i, index) => {
							return (
								<Menu.Item key={"menuskeleton" + index}>
									<Skeleton.Button active className='p-2' />
								</Menu.Item>
							);
					  })
					: categoryList.current.map((category) => {
							return (
								<Menu.SubMenu
									className='text-lg font-bold'
									key={category}
									title={category.toUpperCase()}
								>
									{categoryMap.current[category].map(
										(source) => {
											return (
												<Menu.Item
													onClick={() => {
														dispatch({
															type: "SET_SOURCE",
															data: source,
														});
													}}
													key={category + source.id}
												>
													{source.name}
												</Menu.Item>
											);
										}
									)}
								</Menu.SubMenu>
							);
					  })}
			</Menu>
		</Row>
	);
};

export default SourceNav;
