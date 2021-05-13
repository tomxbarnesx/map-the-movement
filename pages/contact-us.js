import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Team.module.css';

const ContactOption = ({url, src, method, xClasses}) => {
  return (
    <a href={url}>
      <div className={`${styles.contactOption} cursorPointer`}>
        <Image 
          src={src}
          height={45}
          width={45}
          className={xClasses}
        />
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
		        <link rel="icon" href="/frame.ico" />
		        <meta charSet="utf-8" />
		        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
		        <link rel="shortcut icon" href="/frame.ico"/>
		        <meta property="og:url" content="https://mapthemovement.com/contact-us" />
		        <meta property="og:type" content="website" />        
		        <meta property="og:title" content="#MapTheMovement" />
		        <meta name="description" content="#MapTheMovement is an interactive map of organizations fighting to end police violence and mass incarceration." />
		        <meta property="og:description" content="#MapTheMovement is an interactive map of organizations fighting to end police violence and mass incarceration." />
		        <meta property="og:image" content="/images/map-the-movement-share_191_1.jpg" />
		        <meta property="og:image:type" content="image/jpeg" />
		        <meta name="apple-mobile-web-app-capable" content="yes" />
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

