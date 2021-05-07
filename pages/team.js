import Head from 'next/head';
import styles from '../styles/Team.module.css';

export default function Team() {
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
		      		<h1>Meet the Team</h1>
		      		<div className="flex flex-wrap space-evenly">
			      		<div className={styles.portraitBlock}>
			      			<div className={`${styles.portraitImgContainer} placeholderGradient`}></div>
			      			<p>Levin’s work involves a conceptual shift. The computers in our heads are often contrasted with the rest of the body; most of us don’t think of muscles and bones as making calculations. But how do our wounds “know” how to heal?</p>
			      		</div>
			      		<div className={styles.portraitBlock}>
			      			<div className={`${styles.portraitImgContainer} placeholderGradient`}></div>
			      			<p>Levin’s work involves a conceptual shift. The computers in our heads are often contrasted with the rest of the body; most of us don’t think of muscles and bones as making calculations. But how do our wounds “know” how to heal?</p>
			      		</div>
			      		<div className={styles.portraitBlock}>
			      			<div className={`${styles.portraitImgContainer} placeholderGradient`}></div>
			      			<p>Levin’s work involves a conceptual shift. The computers in our heads are often contrasted with the rest of the body; most of us don’t think of muscles and bones as making calculations. But how do our wounds “know” how to heal?</p>
			      		</div>
			      		<div className={styles.portraitBlock}>
			      			<div className={`${styles.portraitImgContainer} placeholderGradient`}></div>
	      					<p>Levin’s work involves a conceptual shift. The computers in our heads are often contrasted with the rest of the body; most of us don’t think of muscles and bones as making calculations. But how do our wounds “know” how to heal?</p>
	      				</div>
	      			</div>
	      		</div>
	      	</main>
      	</>
	)
}