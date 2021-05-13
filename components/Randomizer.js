import { useState } from 'react';
import { setRandomActive } from '../utilities/miscFunctions.js'
import Tooltip from '../components/Tooltip.js';
import styles from '../styles/Modal.module.css';

export default function Randomizer({setActive, length}) {
	const [tooltipVis, setTooltipVis] = useState(false)

	return (
		<div className={`${styles.modalIcon} unselectable`}>
			<span className='cursorPointer' onClick={() => setRandomActive(setActive, length)} onMouseEnter={() => setTooltipVis(true)} onMouseOut={() => setTooltipVis(false)}>🔀</span>
			<Tooltip toolTitle={"Explore an Organization"} vis={tooltipVis}/>
		</div>
	)
}