import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import SocialIcon from './SocialIcon.js'
import styles from '../styles/Panel.module.css';
import L from 'leaflet';
// import {windowCheck} from '../../utilities/layoutFunctions.js';

const Panel = ({data, setActive}) => {
	const panelRef = useRef()

	const socials = data.socials.map((icon, i) => <SocialIcon key={`social-icon-${i}`} data={icon} />)
	
	useEffect(() => {
	    L.DomEvent.disableClickPropagation(panelRef.current);
	});

	return (
		<div  ref={panelRef} style={{border: `8px double ${data.color}`}} className={styles.container}>
			{
				(data) ?
					<>
						<div className="xPosition cursorPointer greyHaze" onClick={() => setActive(null)}>
							<Image
								src={'/x.svg'}
								width={20}
								height={20}
							/>
						</div>
						<div className={styles.content}> 
							<h1 style={{color: `${data.color}`}}>{data.name}</h1>
							<div className={styles.pinLine}>
								<Image
									src={'/logos/pin.svg'}
									width={20}
									height={20}
								/>
								<p><em>{data.city}, {data.state}</em></p>
							</div>
							<div className={styles.socialContainer}>
								{ socials }
							</div>
							<p>{data.summary}</p>
							<div className={styles.buttonsContainer}>
								<div className={styles.buttonStyle}>
									<a href={data.donateUrl} target="__blank" rel="noopener noreferral">
										Signal Boost This Org 
									</a>
								</div>
								{
									(data.donate !== "") ? 
										<div className={styles.buttonStyle}>
											<a href={data.donateUrl} target="__blank" rel="noopener noreferral">
												Donate 
											</a>
										</div>
									: null
								}
							</div>
						</div>	
					</>
				: null
			}
		</div>
	)
}
export default Panel;