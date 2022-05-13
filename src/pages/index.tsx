import {GetStaticProps} from "next";
import Head from "next/head";
import styles from "../styles/home.module.scss";
import firebase from "../services/firebaseConnection";
import {useState} from "react";
import Image from "next/image";
import boardUser from "../../public/images/board-user.svg";

//tipagem
type Data = {
	id: string;
	donate: boolean;
	lastDonate: Date;
	imagem: string;
};

interface HomeProps {
	data: string;
}

export default function Home({data}: HomeProps) {
	const [donaters, setDonaters] = useState<Data[]>(JSON.parse(data));

	return (
		<>
			<Head>
				<title>Board | Organizando suas tarefas.</title>
			</Head>

			<main className={styles.container}>
				<Image src={boardUser} alt="Ferramenta board" />
				<section className={styles.callToAction}>
					<h1>Uma ferramenta para seu dia a dia Escreva, planeje e organize-se...</h1>
					<p>
						<span>100% gratuita</span> e online
					</p>
				</section>

				{donaters.length !== 0 && <h3>Apoiadores: </h3>}
				<div className={styles.donaters}>
					{donaters.map((user) => (
						<Image width={65} height={65} key={user.id} src={user.imagem} alt={user.id} />
					))}
				</div>
			</main>
		</>
	);
}

//com o  getStaticProps a primeira pessoa que fizer o acesso ao site, carrega a página e monta o html no servidor, outros acessos feitos em
//menos de 60 minutos, já encontrarão a página estática sem ter que fazer busca no banco de dados
export const getStaticProps: GetStaticProps = async () => {
	//buscar os usuários doares
	const donaters = await firebase.firestore().collection("users").get();

	const data = JSON.stringify(
		donaters.docs.map((user) => {
			return {
				id: user.id,
				...user.data(),
			};
		})
	);

	return {
		props: {
			data,
		},
		revalidate: 60 * 60, //atualiza a cada 60 minutos
	};
};
