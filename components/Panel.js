import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from '../styles/Panel.module.css';
// import {windowCheck} from '../../utilities/layoutFunctions.js';

const Panel = ({data, setActive}) => {
	
	return (
		<div style={{overflow: "hidden"}} className={styles.container}>
			<h1>{data.name}</h1>

			<p>{data.summary}</p>
		</div>
	)
}
export default Panel;