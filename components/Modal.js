import Image from 'next/image';
import { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from '../styles/Modal.module.css';

export default function Modal({modal, setModal, children}) {

	return (
		<>
			<div className={`${styles.modalIcon} cursorPointer`} onClick={() => setModal(m => !m)}>
				🗒️
			</div>
			<CSSTransition 
	       		in={modal} 
	       		timeout={350}
	       		unmountOnExit
	       		classNames="fade-in"
	       	>
	       		<div className={styles.modalPanel}>
		       		<div className="xPosition nonFixed cursorPointer" onClick={() => setModal(false)}>
						<Image
							src={'/icons/x.svg'}
							alt={"Tap the X to close"}
							width={30}
							height={30}
						/>
					</div>
					<div className={styles.headerGradientContainer}>
						<img 
							className={`${styles.headerImgPositioning} ${styles.up3em}`} 
							src='https://map-the-movement-cdn.s3.amazonaws.com/map-the-movement-web.jpg'
						/> 
					</div>
					<div className={styles.modalContent}>
						<div>
			    			<h1 className={styles.blackTextMask}>Map The Movement</h1>
							<div className="decorativeSeparator"/>
							<p style={{paddingLeft: "1em"}}><em>Historically police reform in the U.S. has been a long, slow process. Impunity for police misconduct and a warrior culture are deeply entrenched norms in many police departments across the country, and it often takes monumental local effort to spur reform.</em></p>
							<p style={{paddingLeft: "1em"}}><em>Each year, researchers from around the world gather at Neural Information Processing Systems, an artificial-intelligence conference, to discuss automated translation software, self-driving cars, and abstract mathematical questions. It was odd, therefore, when Michael Levin, a developmental biologist at Tufts University, gave a presentation at the 2018 conference, which was held in Montreal. Fifty-one, with light-green eyes and a dark beard that lend him a mischievous air, Levin studies how bodies grow, heal, and, in some cases, regenerate.</em></p>
							<p style={{paddingLeft: "1em"}}><em>No one reform package has solved every apparent problem in U.S. policing. Still, there are interesting experiments in alternative justice, police oversight, and use-of-force protocols going on around the country.</em></p>
							<div style={{marginTop: "2.5em"}} className={`${styles.flexing} flex space-evenly`}>
								<div className={`${styles.learnMoreButton} cursorPointer`} onClick={() => setModal(false)}> 
									Watch the Film
								</div>
								<div className={`${styles.learnMoreButton} cursorPointer`} onClick={() => setModal(false)}> 
									Explore the Map
								</div>
							</div>
						</div>
						<div className={styles.poweredBy}>
							Powered by
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