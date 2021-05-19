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
		       	<meta property="og:url" content="https://mapthemovement.com/team" />
		       	<meta property="og:title" content="#MapTheMovement | Team" />
	        	<meta name="description" content="#MapTheMovement is an interactive project built by Frame and filmmakers, Chesley Brejanee and Erica Hawkins." />
    			<meta property="og:description" content="#MapTheMovement is an interactive project built by Frame and filmmakers, Chesley Brejanee and Erica Hawkins." />
	      		<meta name="twitter:description" content="#MapTheMovement is an interactive project built by Frame and filmmakers, Chesley Brejanee and Erica Hawkins."/>
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
  const allTeam = (await getAllObjects("team-members", "created_at")) || []
  return {
    props: { allTeam }
  }
}