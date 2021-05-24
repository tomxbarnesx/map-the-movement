import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Tooltip from '../components/Tooltip.js';
import { useTooltip } from '../utilities/miscHooks.js';
import styles from '../styles/Modal.module.css';

export function ShareContents({icons, addStyles, options, setShareUnfold}) {
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
	}, [copied, setCopied])

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
			return (
					<a key={`share-${icon}`} {...shareIconMapping[icon].data}>
						<div style={adjustmentStyles} className={`${styles.shareIcon} ${styles.marginPoint5}`}>
							<img width="100%" alt={`Share on ${icon}`} src={shareIconMapping[icon].icon} />
						</div>
					</a>
			)
		}
	)

	return (
		<div style={addStyles} className={`${styles.shareModule} flex flex-row space-around align-center`}>
			<div className={`${styles.modalIcon} cursorPointer greyHaze`} onClick={() => setShareUnfold(false)}>
				✕
			</div>
			<SwitchTransition>
				<CSSTransition 
					key={copied} 
					timeout={300} 
					classNames="fade-in"
				>	
					{
						(copied) ?
							<div onClick={() => setShareUnfold(false)} className={`${styles.innerShare} ${styles.copiedFlag}`}>Copied!</div>
						: 	<div onClick={() => setShareUnfold(false)} className={styles.innerShare}>SHARE:</div>
					}
				</CSSTransition>
			</SwitchTransition>
			<div className="flex flex-row"> 
				{iconSpread}
			</div>
		</div>
	)
}

const FoldableShareModule = ({shareUnfold, setShareUnfold}) => {
	const [tooltipVis, setTooltipVis] = useState(false)
	useTooltip(shareUnfold, setTooltipVis)

	return (
		<div className={`${styles.foldableShare} ${(shareUnfold) ? styles.open : ''} flex flex-end align-center`}>
			<SwitchTransition>
    			<CSSTransition 
		       		key={shareUnfold}
		       		timeout={{
		       			appear: 300,
		       			end: 300,
		       		}}
		       		classNames="fade-in-delay"
		       	>
					{
						(shareUnfold) ?
							<ShareContents setShareUnfold={setShareUnfold} icons={["Link", "Twitter", "Facebook"]} options={"noGlow"}/>
						:
							<div className={styles.modalIcon}>
								<span onClick={() => setShareUnfold(true)} onMouseEnter={() => setTooltipVis(true)} onMouseOut={() => setTooltipVis(false)} className="cursorPointer">🔗</span>
								<Tooltip toolTitle={"Share"} vis={tooltipVis}/>
							</div>
					}
				</CSSTransition>
			</SwitchTransition>
		</div>

	)
}

/*<img onClick={() => setShareUnfold(true)} width="35px" src={share} />*/

export default FoldableShareModule;