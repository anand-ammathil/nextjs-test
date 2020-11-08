import { News, Source, SourceID } from "./news";

export interface NewsState {
	sources: Source[];
	isError: boolean;
	selectedSourceID: string;
	selectedSource: SourceID | null;
	errorMessage: string | null;
	newsLoading: boolean;
	news: {
		[key: string]: {
			news: News[];
			page: number;
			perPage: number;
		};
	};
	selectedNews: News | null;
}
