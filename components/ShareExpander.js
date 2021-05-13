import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import styles from '../styles/Panel.module.css';
// import { ShareContents } from '../components/FoldableShareModule';

function ShareContents({icons, addStyles, options, setShareUnfold}) {
	const [copied, setCopied] = useState(false);
	
	const copyToClipboard = () => {
		const el = document.createElement('textarea');
		el.value = window.location;
		document.body.appendChild(el);
		el.select();
		// DEPRECATION WARNINGS ALREADY COMING IN ==> 
		document.execCommand('copy');
		document.body.removeChild(el);
		setCopied(true)
	};

	useEffect(() => {
		if (copied) {
			setTimeout(() => {
				setCopied(false)
			}, 2000)
		}
	}, [copied, setCopied])

	const populateTweet = () => {
		setTimeout(() => {
			const link = 'https://twitter.com/intent/tweet?text=I%E2%80%99m%20highlighting%20Raleigh%20PACT%2C%20an%20grassroots%20organization%20working%20to%20end%20police%20brutality%20in%20Raleigh%2C%20North%20Carolina.%0A%0ALearn%20more%20about%20their%20work%20here%3A%20%7BMAX%20LENGTH%20OF%20A%20BITLY%7D%0A%0AHighlight%20an%20organization%20near%20you%3A%C2%A0mapthemovement.com%0A%0A%23mapthemovementchallenge'
			window.open(link, '_blank');
		}, 200)
	}

	const shareIconMapping = {
		"Twitter": {
			"icon": '/logos/twitter.svg',
			"data": {
				"href": `https://twitter.com/intent/tweet?url=${window.location}/?s-tr=567`,
				"data-show-count": "false",
				"data-url": `${window.location}/?s-tr=567s`,
				"target": "_blank",
				"rel": "noopener noreferrer"
			}
		},
		"Facebook": {
			"icon": '/logos/fb.svg',
			"data": {
				"href": `https://www.facebook.com/sharer/sharer.php?u=${window.location}`,
				"target": "_blank",
				"rel": "noopener noreferrer"
			}
		},
		"Link": {
			"icon": '/logos/link.svg',
			"data": {
				"onClick": copyToClipboard
			}

		},
	}

	const iconSpread = icons.map((icon, i) => {
			const adjustmentStyles = (icon === "Link") ? {background: "black"} : {};
			if (icon === "Facebook") {
				return ( 
					<a key={`share-${icon}`} {...shareIconMapping[icon].data}>
						<div style={adjustmentStyles} className={`${styles.shareIcon}`}>
							<img width="100%" alt={`Share on ${icon}`} src={shareIconMapping[icon].icon} />
						</div>
					</a>
				)
			} else if (icon === "Twitter") {
				return (
					<div key={`share-${icon}`} onClick={() => populateTweet()} style={adjustmentStyles} className={`${styles.shareIcon}`}>
						<img width="100%" alt={`Share on ${icon}`} src={shareIconMapping[icon].icon} />
					</div>
				)
			} else {
				return (
					<SwitchTransition key={`share-${icon}`}>
						<CSSTransition 
							key={copied} 
							timeout={300}
						>	
							<a key={`share-${icon}`} {...shareIconMapping[icon].data}>
								<div style={adjustmentStyles} className={`${styles.shareIcon} unselectable`}>
									{
											(!copied) ?
											<img width="100%" alt={`Share on ${icon}`} src={shareIconMapping[icon].icon} />
										:
											<svg id="svg" className="checkmark-circle" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 35 35">
					                            <circle cx="15.5" cy="15.5" r="15"/>
					                            <polyline id="polyline" points="7.57 15.87 12.62 21.07 23.43 9.93"/>
					                        </svg>
					                }
								</div>
							</a>
						</CSSTransition>
					</SwitchTransition>
				)
			}
		}
	)

	return (
		<div style={addStyles} className={`${styles.shareModule} flex flex-row space-around align-center`}>
			<div className="flex flex-row"> 
				{iconSpread}
			</div>
		</div>
	)
}

export default function ShareExpander({data, shareExpand, setShareExpand}){

	useEffect(() => {
		setShareExpand(false)
	}, [data])

	return (
		<div className={`cursorPointer ${styles.buttonStyle} ${styles.shareBlock} ${(shareExpand) ? styles.open : ''}`}>
			<div onClick={() => setShareExpand(e => !e)}> Share This Org </div>
			{
				(shareExpand) ?
					<ShareContents setShareUnfold={setShareExpand} icons={["Link", "Twitter", "Facebook"]}/>
				: 
					null
			}
		</div>
	)
}