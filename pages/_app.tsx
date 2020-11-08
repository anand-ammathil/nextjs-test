import { useStore } from "news_store/store";
import { AppProps } from "next/app";
import { Provider } from "react-redux";

import "styles/main.css";

function MyApp({ Component, pageProps }: AppProps) {
	const store = useStore(pageProps.initialReduxState);
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
