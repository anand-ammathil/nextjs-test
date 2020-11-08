import axios from "axios";

export const apiCall = async (endpoint: string, params: {} = {}) => {
	const ins = axios.create({
		baseURL: "https://newsapi.org/v2/",
		timeout: 2000,
	});
	return await ins.get(endpoint, {
		params: {
			apiKey: process.env.NEXT_PUBLIC_API_KEY,
			...params,
		},
	});
};
