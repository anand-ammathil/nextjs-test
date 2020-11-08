import { News, Source, SourceID } from "./news";

interface SetTopNewsData {
	news: News[];
	source: SourceID | null;
}

interface AddAllNewsData {
	news: News[];
	page: number;
	source: SourceID | null;
}

interface SetApiErrorData {
	errorMessage: string;
}

interface SetRelatedNewsData {
	news: News[];
	parentIndex: number;
}

interface SetSourcesData {
	sources: Source[];
}

interface AddAllNews {
	type: "ADD_ALL_NEWS";
	data: AddAllNewsData;
}

interface SetTopNews {
	type: "SET_TOP_NEWS";
	data: SetTopNewsData;
}

interface SetRelatedNews {
	type: "SET_RELATED";
	data: SetRelatedNewsData;
}

interface SetSources {
	type: "SET_SOURCES";
	data: SetSourcesData;
}

interface SetSource {
	type: "SET_SOURCE";
	data: SourceID | null;
}

interface SetApiError {
	type: "SET_API_ERROR";
	data: SetApiErrorData;
}

interface SetSelectedNews {
	type: "SET_SELECTED_NEWS";
	data: News;
}

interface SetNewsLoading {
	type: "SET_NEWS_LOADING";
	loading: boolean;
}

export type NewsStoreActions =
	| AddAllNews
	| SetTopNews
	| SetRelatedNews
	| SetSources
	| SetApiError
	| SetNewsLoading
	| SetSource
	| SetSelectedNews;
