import { ThunkAction } from "redux-thunk";
import { NewsStoreActions } from "types/actions";

import Router from "next/router";
import { apiCall } from "./api";
import { News, SourceID } from "types/news";

export const fetchAllNews = (
	page: number,
	perPage: number,
	source: SourceID | null
): ThunkAction<void, {}, {}, NewsStoreActions> => async (dispatch) => {
	dispatch({
		type: "SET_NEWS_LOADING",
		loading: true,
	});
	apiCall("everything", {
		pageSize: perPage,
		page: ++page,
		q: source ? "" : "global",
		sources: source ? source.id : null,
	})
		.then(({ data }) => {
			dispatch({
				type: "ADD_ALL_NEWS",
				data: {
					news: data?.articles,
					page: page,
					source: source,
				},
			});
			dispatch({
				type: "SET_NEWS_LOADING",
				loading: false,
			});
		})
		.catch((error) => {
			dispatch({
				type: "SET_API_ERROR",
				data: {
					errorMessage: error.message,
				},
			});
			dispatch({
				type: "SET_NEWS_LOADING",
				loading: false,
			});
		});
};

export const fetchSource = (): ThunkAction<
	void,
	{},
	{},
	NewsStoreActions
> => async (dispatch) => {
	apiCall("sources", {
		language: "en",
	})
		.then(({ data }) => {
			dispatch({
				type: "SET_SOURCES",
				data: {
					sources: data?.sources,
				},
			});
		})
		.catch((error) => {
			dispatch({
				type: "SET_API_ERROR",
				data: {
					errorMessage: error.message,
				},
			});
		});
};

export const fetchTopNews = (
	source: SourceID | null
): ThunkAction<void, {}, {}, NewsStoreActions> => async (dispatch) => {
	apiCall("top-headlines", {
		language: "en",
		pageSize: 10,
		sources: source ? source.id : null,
	})
		.then(({ data }) => {
			dispatch({
				type: "SET_TOP_NEWS",
				data: {
					source: source,
					news: data?.articles,
				},
			});
		})
		.catch((error) => {
			dispatch({
				type: "SET_API_ERROR",
				data: {
					errorMessage: error.message,
				},
			});
		});
};

export const setSelectedNews = (
	news: News
): ThunkAction<void, {}, {}, NewsStoreActions> => async (dispatch) => {
	dispatch({
		type: "SET_SELECTED_NEWS",
		data: news,
	});
	Router.push("/detailed");
};
