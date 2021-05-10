import Head from 'next/head';
import { getAllObjects } from "../lib/cosmic";
import styles from '../styles/Team.module.css';
import PortraitBlock from '../components/PortraitBlock.js';

export default function Team({allTeam}) {

	const portraits = (allTeam) ? allTeam.map((t, i) => <PortraitBlock key={`team-member-${i}`} i={i} data={t}/>) : null;

	return (
		<>
			<Head>
		        <title>#MapTheMovement | Team</title>
		        <link rel="icon" href="/frame.ico" />
		        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
		          integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
		          crossOrigin=""/>
	      	</Head>
	      	<main>
	      		<div className='contentContainer'>
		      		<h1 className={styles.contentHeader}>Meet the Team</h1>
		      		<div className={`${styles.portraits} flex flex-wrap space-evenly`}>
			      		{ portraits }
	      			</div>
	      		</div>
	      	</main>
      	</>
	)
}

export async function getServerSideProps(ctx) {
  const allTeam = (await getAllObjects("team-members")) || []
  console.log(allTeam)
  return {
    props: { allTeam },
  }
}