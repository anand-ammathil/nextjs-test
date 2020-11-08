import { useMemo } from "react";
import { createStore, applyMiddleware, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { NewsStoreActions } from "types/actions";
import { NEWS_TYPE } from "types/news";
import { NewsState } from "types/store";

const defaultNews = {
	news: [],
	page: 0,
	perPage: 15,
};

const initState: NewsState = {
	sources: [],
	isError: false,
	errorMessage: null,
	newsLoading: false,
	selectedSource: null,
	selectedSourceID: "all",
	news: {
		all: defaultNews,
	},
	selectedNews: null,
};

let store: Store<NewsState, NewsStoreActions> | undefined;

const reducer = (state = initState, action: NewsStoreActions): NewsState => {
	switch (action.type) {
		case "ADD_ALL_NEWS":
			var source = action.data.source ? action.data.source.id : "all";
			var cNews = state.news[source];
			var newsArray = cNews.news.concat(
				action.data.news.map((news) => {
					return { ...news, type: NEWS_TYPE.ALL_NEWS };
				})
			);
			return {
				...state,
				news: {
					...state.news,
					[source]: {
						...cNews,
						news: newsArray,
						page: action.data.page,
					},
				},
			};
		case "SET_NEWS_LOADING":
			return {
				...state,
				newsLoading: action.loading,
			};
		case "SET_SOURCES":
			return {
				...state,
				sources: action.data.sources,
			};
		case "SET_TOP_NEWS":
			var source = action.data.source ? action.data.source.id : "all";
			var cNews = state.news[source];
			var newsArray = cNews.news.concat(
				action.data.news.map((news) => {
					return { ...news, type: NEWS_TYPE.TOP_NEWS };
				})
			);
			return {
				...state,
				news: {
					...state.news,
					[source]: {
						...cNews,
						news: newsArray,
					},
				},
			};
		case "SET_SOURCE":
			var source = action.data ? action.data.id : "all";
			var cNews =
				state.news[source] === undefined
					? defaultNews
					: state.news[source];
			return {
				...state,
				selectedSource: action.data,
				selectedSourceID: source,
				news: {
					...state.news,
					[source]: cNews,
				},
			};
		case "SET_SELECTED_NEWS":
			return {
				...state,
				selectedNews: action.data,
			};
		default:
			return state;
	}
};

function initStore(preloadedState = initState) {
	return createStore(
		reducer,
		preloadedState,
		composeWithDevTools(applyMiddleware(thunkMiddleware))
	);
}

export const initializeStore = (preloadedState: NewsState) => {
	let _store = store ?? initStore(preloadedState);
	if (preloadedState && store) {
		_store = initStore({
			...store.getState(),
			...preloadedState,
		});
		store = undefined;
	}
	if (typeof window === "undefined") return _store;
	if (!store) store = _store;
	return _store;
};

export function useStore(initialState: NewsState = initState) {
	const store = useMemo(() => initializeStore(initialState), [initialState]);
	return store;
}
