import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import SocialIcon from './SocialIcon.js'
import ShareExpander from './ShareExpander.js'
import styles from '../styles/Panel.module.css';

function colorBank(value) {
	const ref = useRef();
	useEffect(() => {
		if (value) {
			ref.current = value;
		}
	});
	return ref.current;
}

const TheHeart = () => {
	const [heartHover, setHeartHover] = useState(false)
	return (
		<div className={styles.runByHeart}>
			<span onMouseEnter={() => setHeartHover(true)} onMouseOut={() => setHeartHover(false)} className={`${styles.heartIcon} cursorPointer`}>❤️</span>
			<small className={`${styles.heartTooltip} ${ (heartHover) ? styles.vis : '' }`}>This organization is run and/or founded by families of victims of police violence</small>				
		</div>
	)
}


const Panel = ({data, setActive, cyclePanels}) => {
	const [shareExpand, setShareExpand] = useState(false);
	const panelRef = useRef();

	const socialArray = ["url", "fb", "twitter", "instagram"];
	const orgColor = colorBank((data) ? data.metadata.orgcolor : 'white')
	console.log(orgColor)
	return (
		<div  ref={panelRef} style={{border: `8px double ${orgColor}`}} className={styles.container}>
			{
				(data) ?
					<>
						<div className="xPosition cursorPointer greyHaze" onClick={() => setActive(null)}>
							<Image
								src={'/icons/x.svg'}
								width={20}
								height={20}
							/>
						</div>
						<div className={styles.content}> 
							<h1 style={{color: `${orgColor}`}}>{data.title}</h1>
							<div className={styles.pinLine}>
								<Image
									src={'/logos/pin.svg'}
									width={20}
									height={20}
								/>
								<p><em>{(data.metadata.city) ? `${data.metadata.city}, ` : ''}{data.metadata.state}</em></p>
							</div>
							<div className={styles.socialContainer}>
								{ socialArray.map((icon, i) => (data.metadata[icon]) ? <SocialIcon key={`social-icon-${i}`} data={data.metadata[icon]} platform={icon} /> : null) }
							</div>
							<p>{data.metadata.summary}</p>
							{
								(data.metadata.run_by_families) ?
									<TheHeart />
								: null
							}
							<div className={styles.buttonsContainer}>
								<ShareExpander data={data} shareExpand={shareExpand} setShareExpand={setShareExpand} />
								{
									(data.metadata.donateurl !== "") ? 
										<div className={styles.buttonStyle}>
											<a href={data.metadata.donateurl} target="__blank" rel="noopener noreferral">
												Donate 
											</a>
										</div>
									: null
								}
							</div>
						</div>	
						<div className={styles.toggleContainer}>
							<Image 
								width={24}
								height={50}
								src={'/icons/advance.svg'}
								className={`${styles.rotate180} cursorPointer`}
								onClick={() => cyclePanels(false)}
							/>
							<Image 
								width={24}
								height={50}
								className={`cursorPointer`}
								src={'/icons/advance.svg'}
								onClick={() => cyclePanels(true)}
							/>
						</div>
					</>
				: null
			}
		</div>
	)
}
export default Panel;