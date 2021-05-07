import React, { useState, useEffect } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import share from '../../../images/detours/rp-reform-map/share.svg';

import Twitter from '../../../images/socials/twitter.svg';
import Facebook from '../../../images/socials/facebook.svg';
import Instagram from '../../../images/socials/instagram.svg';
import Link from '../../../images/socials/link.svg';

const ModifiedShareModule = ({icons, styles, options, children, setShareUnfold}) => {
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
			}, 1000)
		}
		console.log("TRIGGERED?")
	}, [copied, setCopied])

	const shareIconMapping = {
		"Twitter": {
			"icon": Twitter,
			"data": {
				"href": `https://twitter.com/intent/tweet?url=${window.location}/?s-tr=567`,
				"data-show-count": "false",
				"data-url": `${window.location}/?s-tr=567s`,
				"target": "_blank",
				"rel": "noopener noreferrer"
			}
		},
		"Facebook": {
			"icon": Facebook,
			"data": {
				"href": `https://www.facebook.com/sharer/sharer.php?u=${window.location}`,
				"target": "_blank",
				"rel": "noopener noreferrer"
			}
		},
		"Link": {
			"icon": Link,
			"data": {
				"onClick": copyToClipboard
			}

		},
		"Instagram": Instagram,
	}

	const iconSpread = icons.map((icon, i) => {
			const widthConsideration = (icon === "Link") ? "70%" : "100%";
			const adjustmentStyles = (icon === "Link") ? {background: "black"} : {};
			const adjustmentClasses = (options === "noGlow") ? "share-icon marginPoint5" : "share-icon marginPoint5 ring";
			return (
					<a key={`share-${icon}`} {...shareIconMapping[icon].data}>
						<div style={adjustmentStyles} className={adjustmentClasses}>
							<img width={widthConsideration} alt={`Share on ${icon}`} src={shareIconMapping[icon].icon} />
						</div>
					</a>
			)
		}
	)

	return (
		<div style={styles} className="share-module flex flex-col">
			{ children }
			<div className="flex flex-row pos-rel align-center">
				<SwitchTransition>
					<CSSTransition 
						key={copied} 
						timeout={300} 
						classNames="fade-animate"
					>	
						{
							(copied) ?
								<div onClick={() => setShareUnfold(false)} className="innerShare copied-flag">Copied!</div>
							: 	<div onClick={() => setShareUnfold(false)} className="innerShare">Share this interactive:</div>
						}
					</CSSTransition>
				</SwitchTransition>
				{iconSpread}
			</div>
		</div>
	)
}

const FoldableShareModule = ({shareUnfold, setShareUnfold}) => {
	return (
		<div className={`foldableShare ${(shareUnfold) ? 'open' : ''} flex align-center cursor-pointer justify-center`}>
			<SwitchTransition>
    			<CSSTransition 
		       		key={shareUnfold}
		       		timeout={{
		       			appear: 300,
		       			end: 300,
		       		}}
		       		classNames="fade-delay-animate"
		       	>
					{
						(shareUnfold) ?
							<ModifiedShareModule setShareUnfold={setShareUnfold} icons={["Link", "Twitter", "Facebook"]} options={"noGlow"}/>
						:
							<img onClick={() => setShareUnfold(true)} width="35px" src={share} />
					}
				</CSSTransition>
			</SwitchTransition>
		</div>

	)
}

export default FoldableShareModule;