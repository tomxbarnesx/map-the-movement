import {useState} from 'react';
import styles from '../styles/Modal.module.css';

function ListItem({data, setActive, i}){
	return (
		<li onClick={() => setActive(i)} className='cursorPointer'>
			{data.title}
		</li>
	)
}

export default function ListView({data, listOpen, setListOpen, setActive}){
	const vis = (listOpen) ? styles.open : '';
	const listItems = data.map((li, i) => <ListItem key={`list-item-${i}`} data={li} setActive={setActive} i={i}/>);

	return (
		<>
			<div className={`${styles.modalIcon} cursorPointer`} onClick={() => setListOpen(l => !l)}>
				=
			</div>
			<div className={`${styles.listContainer} ${vis}`}>
				<div className={styles.blackBar}/>
				{/*<div style={{top: '4.95em', position: "absolute"}} className="xPosition cursorPointer" onClick={() => setListOpen(false)}>
					<span className={styles.hideLeft}>❮</span> Hide <span className={styles.hideRight}>❯</span>
				</div>*/}
{/*				<h2>Organizations | List View</h2>
*/}				<ul style={{marginTop: "2em"}}>
					{ listItems }
				</ul>
			</div>
		</>
	)
}