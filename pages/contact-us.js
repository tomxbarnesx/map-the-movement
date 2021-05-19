import Head from 'next/head';
import styles from '../styles/Team.module.css';

const ContactOption = ({url, src, method, xClasses}) => {
  return (
    <a href={url}>
      <div className={`${styles.contactOption} cursorPointer`}>
        <img src={src} height="45px" width="45px" className={xClasses}/>
        <h2>{method}</h2>
      </div>
    </a>
  )
}

export default function Contact(){
	return (
		<>
			<Head>
				<title>#MapTheMovement | Contact</title>
		        <meta property="og:url" content="https://mapthemovement.com/contact-us" />
		        <meta property="og:title" content="#MapTheMovement | Contact" />
		        <meta name="description" content="#MapTheMovement is an interactive map of organizations fighting to end police violence and mass incarceration." />
		        <meta property="og:description" content="#MapTheMovement is an interactive map of organizations fighting to end police violence and mass incarceration." />
			    <meta name="twitter:description" content="#MapTheMovement is an interactive map of organizations fighting to end police violence and mass incarceration."/>
			</Head>
			<main>
				<div className='contentContainer withPadding'>
		      		<h1 className={styles.contentHeader}>Contact Us</h1>
	      			<p>#MapTheMovement is maintained by the team at Frame. We're constantly looking to add new organizations to the map and connect with people working in this space. Drop us a line if you'd like to connect! Please reach out to us via the email or any of the social platforms listed below!</p>
  			        <div className={styles.contactOptionContainer}>
			        	<ContactOption url={'mailto:admin@frame.media'} src={'/logos/email.svg'} method={'Email'} xClasses={'cursorPointer invert'}/>
			       		<ContactOption url={'https://facebook.com/exploreframe'} src={'/logos/fb.svg'} method={'Facebook'} xClasses={'cursorPointer'}/>
			        	<ContactOption url={'https://twitter.com/exploreframe'} src={'/logos/twitter.svg'} method={'Twitter'} xClasses={'cursorPointer'}/>
			        	<ContactOption url={'https://instagram.com/exploreframe'} src={'/logos/instagram.svg'} method={'Instagram'} xClasses={'cursorPointer'}/>
			        </div>
	      		</div>
			</main>
		</>
	)
}

