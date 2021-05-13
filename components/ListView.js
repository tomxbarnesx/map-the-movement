import Image from 'next/image';
import {useState, useEffect} from 'react';
import styles from '../styles/Modal.module.css';
import Tooltip from '../components/Tooltip.js';
import throttle from "lodash/throttle";

function ListItem({data, handleListSelection, i}){
	return (
		<li onClick={() => handleListSelection(data)} className='cursorPointer'>
			{data.title}
		</li>
	)
}

function CheckBox({id, value, setValue}){
	return (
		<li className="flex">
			<input className={styles.styledCheckbox} onChange={(e) => setValue(e.target.checked)} id={id} type="checkbox" checked={value} />
			<label htmlFor={id}></label>
			<span className="unselectable cursorPointer" onClick={() => setValue(v => !v)}>{id}</span>
		</li>
	)			  
}

export default function ListView({data, handleListSelection, listOpen, setListOpen}){
	const [tooltipVis, setTooltipVis] = useState(false)
	const [familyRun, setFamilyRun] = useState(false)
	const [bailFund, setBailFund] = useState(false)
	const [searchValue, setSearchValue] = useState('')
	const [sortedData, setSortedData] = useState([...data].sort((a, b) => a.title.localeCompare(b.title)))
	const [filteredList, setFilteredList] = useState(sortedData)
	const vis = (listOpen) ? styles.open : '';

	const listFilter = throttle(() => {
		const lcCompare = searchValue.toLowerCase()
		let filtered = sortedData;
		if (searchValue){
			filtered = filtered.filter(item => item.title.toLowerCase().includes(lcCompare))
		}
		if (familyRun){
			filtered = filtered.filter(item => item.metadata.run_by_families === familyRun)
		}
		if (bailFund){
			filtered = filtered.filter(item => item.metadata.bail_fund === bailFund)
		}
		setFilteredList(filtered)
	}, 500)

	useEffect(() => {
		listFilter()
	}, [searchValue, familyRun, bailFund])

	const listItems = (data && filteredList) ? filteredList.map((li, i) => <ListItem key={`list-item-${i}`} data={li} handleListSelection={handleListSelection} i={i}/>) : null;

	return (
		<>
			<div className={styles.modalIcon}>
				<span className='cursorPointer' onClick={() => setListOpen(l => !l)} onMouseEnter={() => setTooltipVis(true)} onMouseOut={() => setTooltipVis(false)}>🔍</span>
				<Tooltip toolTitle={"Search / List View"} vis={tooltipVis}/>
			</div>
			<div className={`${styles.listContainer} ${vis}`}>
				<div className={styles.blackBar}/>
				<div className="xPosition mobileClose stickyFloat cursorPointer greyHaze" onClick={() => setListOpen(false)}>
					✕
					{/*<Image
						src={'/icons/x.svg'}
						width={20}
						height={20}
					/>*/}
				</div>
				<input id="mainSearch" className={styles.listViewSearch} placeholder="Search for an organization..." onChange={(e) => setSearchValue(e.target.value)} value={searchValue}/>
				<label htmlFor="mainSearch" style={{display: "none"}}>Search for an organization...</label>
				<ul className={styles.checkboxList}>
				  { [["Bail funds and legal aid organizations", bailFund, setBailFund], ["Organizations run and/or founded by families of victims of police violence", familyRun, setFamilyRun]].map((box, i) => <CheckBox key={`check-${i}`} id={box[0]} value={box[1]} setValue={box[2]} />) }
				</ul>
				<ul className={styles.mainList} style={{marginTop: "2em"}}>
					{ listItems }
				</ul>
			</div>
		</>
	)
}