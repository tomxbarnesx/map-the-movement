import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, ZoomControl, useMapEvent } from 'react-leaflet';
import Panel from './Panel.js'
import movementMarkers from '../utilities/data/movementMarkers.js';
import { CSSTransition } from 'react-transition-group';

function ClickCatch({active, setActive}) {
	const map = useMapEvent('click', () => {
		if (active !== null) {
			setActive(null)
		}		
	})
	return null
}

function ReformMap(){
	const [active, setActive] = useState(null);
	const [prevActive, setPrevActive] = useState(null);
	const [lat] = useState(38.914295);
	const [lng] = useState(-77.035144);
	const [zoom] = useState(4);
	const mapStyle = {
		width: '100%',
		height: '100vh',
  		height: 'calc(var(--vh, 1vh) * 100)',
		display: 'inline-block'
	}

	useEffect(() => {
		if (active !== null) {
			setPrevActive(active)
		}
	}, [active])

	useEffect(() => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		return () => document.documentElement.style.removeProperty('--vh');
	}, [])

	const markers = movementMarkers.map((mark, i) => <Marker key={`marker-${i}`} position={[mark.latLng[0], mark.latLng[1]]} eventHandlers={{click: () => {setActive(i)}}}/> )
	const activeData = (active !== null) ? movementMarkers[active] : movementMarkers[prevActive]

	return (
		<>
			<MapContainer 
		        center={[lat, lng]} 
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
		        <ClickCatch active={active} setActive={setActive}/>
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