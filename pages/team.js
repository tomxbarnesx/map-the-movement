import Head from 'next/head';
import bucket from "../lib/cosmic";
import styles from '../styles/Team.module.css';
import PortraitBlock from '../components/PortraitBlock.js';

export default function Team({team}) {

	const portraits = team.map((t, i) => <PortraitBlock key={`team-member-${i}`} i={i} data={t}/>);

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

export async function getStaticProps(ctx) {
  const data = await bucket.getObjects({
    query: {
    	type: 'team-members'
    },
    sort: 'created_at',
    props: 'slug,title,metadata'
  })
  const team = await data.objects
  return {
    props: {
    	team: team || []
    }
  }
}