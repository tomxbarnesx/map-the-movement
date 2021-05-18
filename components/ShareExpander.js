import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import styles from '../styles/Panel.module.css';
// import { ShareContents } from '../components/FoldableShareModule';

function ShareContents({data, icons, addStyles, options, setShareUnfold}) {
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

	const shareIconMapping = {
		"Twitter": {
			"icon": '/logos/twitter.svg',
			"data": {
				"href": `https://twitter.com/intent/tweet?text=${data.share_text}%0A%0ASupport%20their%20work%20here%3A%20${data.bitly_url}%0A%0AAmplify%20an%20organization%20near%20you%3A%20http%3A%2F%2Fmapthemovement.com%0A%0A%23mapthemovementchallenge`,
				"data-show-count": "false",
				"data-url": `${window.location}/?s-tr=567s`,
				"target": "_blank",
				"rel": "noopener noreferrer"
			}
		},
		"Facebook": {
			"icon": '/logos/fb.svg',
			"data": {
				"href": `https://www.facebook.com/sharer/sharer.php?u=${window.location}&quote=${data.share_text}`,
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
					<a key={`share-${icon}`} {...shareIconMapping[icon].data}>
						<div style={adjustmentStyles} className={`${styles.shareIcon}`}>
							<img width="100%" alt={`Share on ${icon}`} src={shareIconMapping[icon].icon} />
						</div>
					</a>
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
					<ShareContents data={data.metadata} setShareUnfold={setShareExpand} icons={["Link", "Twitter", "Facebook"]}/>
				: 
					null
			}
		</div>
	)
}