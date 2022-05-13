import {GetServerSideProps} from "next";
import {getSession} from "next-auth/client";
import Head from "next/head";
import styles from "./styles.module.scss";
import {PayPalButtons} from "@paypal/react-paypal-js";
import firebase from "../../services/firebaseConnection";
import {useState} from "react";

import Image from "next/image";
import Rocket from "../../../public/images/rocket.svg";

//tipagem quando objeto
interface DonateProps {
	user: {
		nome: string;
		id: string;
		imagem: string;
	};
}

export default function Donate({user}: DonateProps) {
	const [vip, setVip] = useState(false);

	async function handleSaveDonate() {
		await firebase
			.firestore()
			.collection("users")
			.doc(user.id)
			.set({
				donate: true,
				lastDonate: new Date(),
				imagem: user.imagem,
			})
			.then(() => {
				setVip(true);
			});
	}

	return (
		<>
			<Head>
				<title>Ajude a plataforma board ficar online</title>
			</Head>

			<main className={styles.container}>
				<Image src={Rocket} alt="Seja apoiador" />

				{vip && (
					<div className={styles.vip}>
						<Image width={50} height={50} src={user.imagem} alt="avatar de perfil do usuários" />
						<span>Parabéns você é um novo apoiador</span>
					</div>
				)}

				<h1>Seja um apoiador deste projeto! 🏆</h1>
				<h3>
					contribua com apenas <span>R$ 1,00</span>
				</h3>
				<strong>Apareça na nossa home, tenha funcionalidades exclusivas.</strong>
				<PayPalButtons
					createOrder={(data, actions) => {
						return actions.order.create({
							purchase_units: [
								{
									amount: {
										value: "1",
									},
								},
							],
						});
					}}
					onApprove={(data, actions) => {
						return actions.order.capture().then(function (details) {
							console.log("Compra aprovada: " + details.payer.name.given_name);
							handleSaveDonate();
						});
					}}
				/>
			</main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
	const session = await getSession({req});

	if (!session?.id) {
		//se não tiver logado redireciona para home
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const user = {
		nome: session?.user.name,
		id: session?.id,
		image: session?.user.image,
	};

	return {
		props: {
			user,
		},
	};
};
