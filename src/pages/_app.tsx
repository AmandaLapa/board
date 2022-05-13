import {AppProps} from "next/app";
import {Header} from "../components/Header";
import "../styles/global.scss";
import {Provider as NextAuthProvider} from "next-auth/client";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";

const initialOptions = {
	"client-id": "ARzQ14OlYi3kRTLilQ8ai6py5dC-YOb4bpU7SRxO224K1GrpcSTSII_1iMWhxE5I_daJT_zXoIFaJPkR",
	currency: "BRL",
	intent: "capture",
};

function MyApp({Component, pageProps}: AppProps) {
	return (
		<NextAuthProvider session={pageProps.session}>
			<PayPalScriptProvider options={initialOptions}>
				<Header />
				<Component {...pageProps} />
			</PayPalScriptProvider>
		</NextAuthProvider>
	);
}

export default MyApp;
