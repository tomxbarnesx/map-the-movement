import {useRouter} from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import {useWindowSize} from '../utilities/layoutHooks.js';

import { MapContainer, TileLayer, Marker, ZoomControl, useMapEvent, useMap } from 'react-leaflet';
import Panel from './Panel.js'

import movementMarkers from '../utilities/data/movementMarkers.js';

function ClickClose({active, setActive}) {
	const map = useMapEvent('click', () => {
		if (active !== null) {
			setActive(null)
		}		
	})
	return null
}

function ChangeView({ center, zoom, active, mobile }) {
	if (active !== null) {
		console.log("MOVING!")
		const map = useMap();
		const adjustment = (mobile) ? 0 : 5;
		const reCenter = [center[0], center[1] + adjustment]
		map.flyTo(reCenter, 6, {
	        animate: true,
	        duration: .5
		});
	}
	return null;
}

function ReformMap(){
	const windowSize = useWindowSize()
	const [active, setActive] = useState(null);
	const [prevActive, setPrevActive] = useState(null);
	const [lat, setLat] = useState(38.914295);
	const [lng, setLng] = useState(-77.035144);
	const [coords, setCoords] = useState([38.914295,-77.035144]);
	const [zoom] = useState(4);
	const router = useRouter();
	const mapStyle = {
		width: '100%',
		height: '100vh',
  		height: 'calc(var(--vh, 1vh) * 100)',
		display: 'inline-block'
	}

	useEffect(() => {
		console.log("MOBILE", windowSize.width < 768)
		// axios.get('https://api.aglty.io/146b4de6-u/fetch/en-us/list/orgs')
	}, [])

	useEffect(() => {
		if (active !== null) {
			setPrevActive(active)
		} else {
			router.push('/', undefined, { shallow: true })
		}
	}, [active])

	useEffect(() => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		return () => document.documentElement.style.removeProperty('--vh');
	}, [])

	const handlePanel = (i) => {
		setActive(i)
		router.push('/', `/?org=${i}`, { shallow: true })
		setCoords([movementMarkers[i].lat, movementMarkers[i].lng])
		// map.setView([activeData.lat, activeData.lng], 4);
		return null;
	}
	
	const markers = movementMarkers.map((mark, i) => <Marker key={`marker-${i}`} position={[mark.latLng[0], mark.latLng[1]]} eventHandlers={{click: () => {handlePanel(i)}}}/> )
	const activeData = (active !== null) ? movementMarkers[active] : movementMarkers[prevActive]

	return (
		<>
			<MapContainer 
		        center={coords} 
		        zoom={zoom} 
		        zoomControl={false}
		        style={mapStyle}
		        minZoom={3}
		    >
		    	<TileLayer
		            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a></a>'
		            url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
		        	id='mapbox/dark-v10'
		        	accessToken='pk.eyJ1IjoidG9teGJhcm5lc3giLCJhIjoiY2p1OTJsZDEwMXI1ajN5bzJ4NDhhNzVkcCJ9.EV4112N91Zp7z0tOS-bazg'
		        />
		        <ClickClose active={active} setActive={setActive}/>
		        <ChangeView active={active} mobile={windowSize.width < 768} center={coords} zoom={zoom}/>
				{ markers }
				<ZoomControl position="bottomleft" />
	        </MapContainer>
	       	<CSSTransition 
	       		in={(active !== null)} 
	       		timeout={400}
	       		unmountOnExit
	       		classNames="fade-in"
	       	>
	        	<Panel data={activeData} setActive={setActive} />
	        </CSSTransition>

		</>
	)
}

export default ReformMap;