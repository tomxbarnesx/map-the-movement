import {useState} from 'react';
import { useTooltip } from '../utilities/miscHooks.js';
import styles from '../styles/Modal.module.css';
import Tooltip from '../components/Tooltip.js';

export default function AddOrgButton({listOpen, setListOpen}){
	const [tooltipVis, setTooltipVis] = useState(false)
	useTooltip(listOpen, setTooltipVis);

	return (
		<div className={styles.modalIcon}>
			<span className='cursorPointer' onClick={() => setListOpen(l => (l === 2) ? 0 : 2)} onMouseEnter={() => setTooltipVis(true)} onMouseOut={() => setTooltipVis(false)}>🆕</span>
			<Tooltip toolTitle={"Add new organization"} vis={tooltipVis}/>
		</div>
	)
}