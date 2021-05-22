import { useEffect, useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useTooltip } from '../utilities/miscHooks.js';
import Tooltip from '../components/Tooltip.js';
import Image from './Image.js';
import styles from '../styles/Modal.module.css';

export default function Modal({modal, setModal, children}) {
	const [tooltipVis, setTooltipVis] = useState(false)
	const modalEmoji = useRef('🗒️')
	useTooltip(modal, setTooltipVis)
	useEffect(() => {
		const supportsEmoji = () =>  {
			var ctx = document.createElement("canvas").getContext("2d");
			ctx.fillText("🗒️", -2, 4);
			if (ctx.getImageData(0, 0, 1, 1).data[3] > 0) { 
				return '🗒️'
			} else {
				return '📄'
			} 
		}
		modalEmoji.current = supportsEmoji()
	}, [])


	return (
		<>
			<div className={styles.modalIcon}>
				<span className='cursorPointer' onClick={() => setModal(m => !m)} onMouseEnter={() => setTooltipVis(true)} onMouseOut={() => setTooltipVis(false)}>{ modalEmoji.current }</span>
				<Tooltip toolTitle={"Introduction"} vis={tooltipVis}/>
			</div>
			<CSSTransition 
	       		in={modal} 
	       		timeout={350}
	       		unmountOnExit
	       		classNames="fade-in"
	       	>
	       		<div className={styles.modalPanel}>
		       		<div className="xPosition mobileClose nonFixed cursorPointer" onClick={() => setModal(false)}>
						✕
						{/*<Image
							src={'/icons/x.svg'}
							alt={"Tap the X to close"}
							width={30}
							height={30}
						/>*/}
					</div>
					<div className={styles.headerGradientContainer}>
						<img 
							className={`${styles.headerImgPositioning} ${styles.up3em}`} 
							src='https://frame-next-cdn.s3.amazonaws.com/Frame_signUp_header_protest_racial_justiceNARROW.jpg'
						/>
					</div>
					<div className={styles.modalContent}>
						<div>
			    			<h1 className={styles.blackTextMask}>#MapTheMovement</h1>
							<div className="decorativeSeparator"/>
							<p style={{paddingLeft: "1em"}}>In May 2020, the murder of George Floyd ignited a reckoning around racism and police violence in the United States. It sparked a wave of attention and donations to several national organizations fighting to transform U.S. policing — but largely overlooked hundreds of local groups across the country, working on the ground to end overpolicing and mass incarceration.</p>
							<p style={{paddingLeft: "1em"}}>#MapTheMovement aims to shine a light on these grassroots organizations and provide a resource for people to find them, share them, and donate to help further their work. This project was inspired by a documentary from Frame, which tells the story of Rolanda Byrd, who lost her son to police violence in 2016, and became the Executive Director of Raleigh PACT, an organization in Raleigh, North Carolina working to stop police brutality.</p>
							<p style={{paddingLeft: "1em"}}>Watch the film below and explore, share, and learn about organizations like Raleigh PACT, on the map. You can also nominate a group to be added to the map to help further expand this resource. Within every neighborhood, there is likely a group fighting to fix the U.S.' unjust policing and carceral state. We hope you use this map to find and engage with yours.</p>
							{/*<p style={{paddingLeft: "1em"}}>Across the United States, police violence cuts hundreds of lives short every year and instills a daily fear in Black and brown communities. A 2018 study from the Department of Justice detailed how in the year prior to the study, hundreds of thousands of Black people reported being subjected to excessive use of force from police — at around double the rate of white people.</p>
							<p style={{paddingLeft: "1em"}}>In the wake of George Floyd’s murder, the movement for Black lives gained support and attention not seen since the Civil Rights movement of the 1960s. Much of that attention has been focused on a few major national organizations fighting police brutality and racial injustice, but behind the big names are hundreds of local groups, working on the ground to end overpolicing and mass incarceration.</p>
							<p style={{paddingLeft: "1em"}}>#MapTheMovement aims to shine a light on the many grassroots organizations fighting to end racist policing and provide a resource for people to find them, share them, and donate to help further their work. This project was inspired by a documentary from Frame, which tells the story of Rolanda Byrd, who lost her son to police violence in 2016, and became the Executive Director of Raleigh PACT, an organization in Raleigh, North Carolina working to stop police brutality.</p>
							<p style={{paddingLeft: "1em"}}>Watch the film below and explore, share, and learn about the myriad organizations like Raleigh PACT, on the map. Within everybody’s neighborhood, there is likely a group fighting to fix the U.S.’ unjust police and carceral state — we hope you use this map to find and engage with yours.</p>*/}
							<div style={{margin: "2.5em auto 1em", width: "75%"}} className={`${styles.flexing} flex space-evenly`}>
								<a href="https://frame.media/stories/raleigh-pact-part-i/?mtm=1" target="_blank" rel="noopener noreferrer">
									<div className={`${styles.learnMoreButton} cursorPointer`}> 
										Watch the Film
									</div>
								</a>
								<div className={`${styles.learnMoreButton} cursorPointer`} onClick={() => setModal(false)}> 
									Explore the Map
								</div>
								<a style={{marginBottom: "1em"}} target="_blank" rel="noopener noreferrer" href="https://twitter.com/chelseybrejanee/status/1395802271074721801?s=21">
									<div className={`${styles.learnMoreButton} ${styles.noBottomMargin} cursorPointer`}> 
										How To Use
									</div>
								</a>
							</div>
						</div>
						<div className={styles.poweredBy}>
							<span>Powered by</span>
							<a target="_blank" rel="noopener noreferrer" href="https://frame.media/">
								<div style={{marginLeft: ".4em"}}>
									<Image 
										src={"/logos/Frame_Media_logo_750_238.png"}
										width={75}
							            height={23.8}
							            alt={"Frame logo"}
									/>
								</div>
							</a>
						</div>
					</div>
	       		</div>
	       	</CSSTransition>
		</>		
	)
}