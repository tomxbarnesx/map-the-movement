import Image from 'next/image';
import {useState, useEffect} from 'react';
import styles from '../styles/Modal.module.css';
import throttle from "lodash/throttle"

function ListItem({data, setActive, i}){
	return (
		<li onClick={() => setActive(i)} className='cursorPointer'>
			{data.title}
		</li>
	)
}

export default function ListView({data, listOpen, setListOpen, setActive}){
	const [searchValue, setSearchValue] = useState('')
	const [sortedData, setSortedData] = useState([...data].sort((a, b) => a.title.localeCompare(b.title)))
	const [filteredList, setFilteredList] = useState(sortedData)
	const vis = (listOpen) ? styles.open : '';

	const listFilter = throttle(() => {
		const lcCompare = searchValue.toLowerCase()
		const filtered = sortedData.filter(item => item.title.toLowerCase().includes(lcCompare))
		setFilteredList(filtered)
	}, 700)

	useEffect(() => {
		listFilter()
	}, [searchValue])

	const listItems = (data && filteredList) ? filteredList.map((li, i) => <ListItem key={`list-item-${i}`} data={li} setActive={setActive} i={i}/>) : null;

	return (
		<>
			<div className={`${styles.modalIcon} cursorPointer`} onClick={() => setListOpen(l => !l)}>
				🔍
			</div>
			<div className={`${styles.listContainer} ${vis}`}>
				<div className={styles.blackBar}/>
				<div className="xPosition cursorPointer greyHaze" onClick={() => setListOpen(false)}>
					<Image
						src={'/icons/x.svg'}
						width={20}
						height={20}
					/>
				</div>
				<input className={styles.listViewSearch} placeholder="Search for an organization..." onChange={(e) => setSearchValue(e.target.value)} value={searchValue}/>
				<ul style={{marginTop: "2em"}}>
					{ listItems }
				</ul>
			</div>
		</>
	)
}