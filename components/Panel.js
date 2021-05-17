import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import {windowCatch} from '../utilities/layoutHooks.js';
import SocialIcon from './SocialIcon.js';
import ShareExpander from './ShareExpander.js';
// import TimelineFix from './TimelineFix.js';
import { Timeline } from 'react-twitter-widgets'
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
	const [twitterState, setTwitterState] = useState(false);
	const panelRef = useRef();
	const twitterRef = useRef(null);

	// useEffect(() => {
	// 	if (windowCatch) {
	// 		window.twttr = (function(d, s, id) {
	// 			var js, fjs = d.getElementsByTagName(s)[0],
	// 			t = window.twttr || {};
	// 			if (d.getElementById(id)) return t;
	// 			js = d.createElement(s);
	// 			js.id = id;
	// 			js.src = "https://platform.twitter.com/widgets.js";
	// 			fjs.parentNode.insertBefore(js, fjs);
	
	// 			t._e = [];
	// 			t.ready = function(f) {
	// 				t._e.push(f);
	// 			};
	// 			return t;
	// 		} (document, "script", "twitter-wjs"));
		
	// 		if (window.twttr) {
	// 			twitterRef.current = window.twttr
	// 			twitterRef.current.ready(
	// 				function (twttr){
	// 					twttr.events.bind('loaded', function (event) {
	// 						event.widgets.forEach((widget, i) => {
	// 							// if (i === event.widgets.length - 1) {
	// 							// 	setTweetLoading(false)
	// 							// }
	// 						});
	// 					});
	// 				}
	// 			);
	// 		}
	// 	}
	// }, []);

	const socialArray = ["url", "fb", "twitter", "instagram"];
	const orgColor = colorBank((data) ? data.metadata.orgcolor : 'white')
	return (
		<div  ref={panelRef} style={{border: `8px double ${orgColor}`}} className={styles.container}>
			{
				(data) ?
					<>
						<div className="xPosition mobileClose cursorPointer greyHaze" onClick={() => setActive(null)}>
							✕
							{/*<Image
								src={'/icons/x.svg'}
								width={20}
								height={20}
							/>*/}
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
							<div style={{position: "relative"}} className={styles.buttonsContainer}>
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
								<div className={styles.toggleContainer}>
									<div onClick={() => {setTwitterState(false); cyclePanels(false);}} className={`${styles.toggleSizing} cursorPointer`}>❮</div>
									<div onClick={() => {setTwitterState(false); cyclePanels(true);}} className={`${styles.toggleSizing} cursorPointer`}>❯</div>
								</div>
							</div>
						</div>	
						{
							(!twitterState && data.metadata.twitter !== "" && data.metadata.twitter !== null) ? 
								<div className="spinner">
							        <div className="double-bounce1"></div>
							        <div className="double-bounce2"></div>
							    </div>
							: null
						}
						{
							(data.metadata.twitter !== "" && data.metadata.twitter !== null) ?
								<div style={(twitterState) ? {opacity: "1"} : {opacity: "0"}} className="twitter-container">
									<Timeline
									  dataSource={{
									    sourceType: 'profile',
									    screenName: data.metadata.twitter.split('/').pop()
									  }}
									  onLoad={() => setTwitterState(true)}
									  renderError={(_err) => <p>Error loading timeline</p>}
									  options={{
									  	theme: "dark",
									  	width: "100%",
									  	chrome: "transparent",
									  	backgroundColor: "black"
									  }}
									/>
								</div>
							: null
						}
						{/*<SwitchTransition>
		    				<CSSTransition 
					       		key={data.metadata.twitter}
					       		timeout={400}
					       	>	
								{
									(data.metadata.twitter) ?
										
											<a ref={twitterRef} className="twitter-timeline" data-tweet-limit="21" data-theme="dark" data-chrome="noheader transparent" href={data.metadata.twitter}>Loading organization's latest tweets</a>			
										</div>

									: null
								}
							</CSSTransition>
						</SwitchTransition>*/}
						{/*<div className={styles.toggleContainer}>
							<div onClick={() => cyclePanels(false)} className={`${styles.toggleSizing} cursorPointer`}>❮</div>
							<div onClick={() => cyclePanels(true)} className={`${styles.toggleSizing} cursorPointer`}>❯</div>
						</div>*/}
					</>
				: null
			}
		</div>
	)
}
/*<div className="twitter-container">
									<a className="twitter-timeline" data-tweet-limit="21" data-theme="dark" data-chrome="noheader transparent" href={data.metadata.twitter}>Loading organization's latest tweets</a>			
								</div>*/
// RaleighPACT?ref_src=twsrc%5Etfw
export default Panel;