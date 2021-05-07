import Modal from './Modal.js';
import { useState, useEffect } from 'react';
import styles from '../styles/Modal.module.css';

// import FoldableShareModule from './FoldableShareModule.js';

export default function TrayOverlays({active, setActive, modal, setModal}) {

	return (
		<div className={styles.tray}>
			<Modal modal={modal} setModal={setModal} active={modal} setActive={setModal}/>
{/*    		<FoldableShareModule shareUnfold={shareUnfold} setShareUnfold={setShareUnfold} />
*/}		</div>
	)
}