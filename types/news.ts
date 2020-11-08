export interface SourceID {
	id: string;
	name: string;
}

export enum NEWS_TYPE {
	ALL_NEWS,
	TOP_NEWS,
}

export interface News {
	source: Source;
	author: string;
	title: string;
	description: string;
	url: string;
	urlToImage: string;
	publishedAt: string;
	content: string;
	related: News[];
	type: NEWS_TYPE;
}

export interface Source {
	id: string;
	name: string;
	description: string;
	url: string;
	category: string;
	language: string;
	country: string;
}
