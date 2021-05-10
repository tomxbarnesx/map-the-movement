import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import {useWindowSize, useVhResize} from '../utilities/layoutHooks.js';
import { MapContainer, TileLayer, Marker, ZoomControl, useMapEvent, useMap } from 'react-leaflet';
import L from 'leaflet';

import Panel from './Panel.js'

const pinIcon = new L.Icon({
    iconUrl: '/icons/marker4.svg',
    iconRetinaUrl: '/icons/marker4.svg',
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(50, 50),
});

function ClickClose({active, setActive, modal, setModal, listOpen, setListOpen}) {
	const map = useMapEvent('click', () => {
		if (active !== null) {
			setActive(null)
		}
		if (modal) {
			setModal(null)
		}
		if (listOpen) {
			setListOpen(null)
		}
	})
	return null
}

function ChangeView({ center, zoom, active, mobile }) {
	if (active !== null && !mobile) {
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

function ReformMap({data, active, setActive, modal, setModal, listOpen, setListOpen, slug}){
	const windowSize = useWindowSize()
	const [lat, setLat] = useState(38.914295);
	const [lng, setLng] = useState(-77.035144);
	const [coords, setCoords] = useState([38.914295,-95.035144]);
	// *** SET A MOBILE OPTION!
	// const [coords, setCoords] = useState([38.914295,-77.035144]);
	const [zoom] = useState(5);
	const router = useRouter();
	const [map, setMap] = useState(null);
	const mapStyle = {
		width: '100%',
		height: '100vh',
  		height: 'calc(var(--vh, 1vh) * 100)',
		display: 'block'
	}
	const maxBounds = [
	    [-100.499550, -190.276413], //Southwest
	    [83.162102, -28.233040]  //Northeast
	];

	useVhResize();
	
	useEffect(() => {
		if (active !== null) {
			// HANDLE THE URL CHANGE
			if (slug) {
				router.push('/[slug]', `${data[active].slug}`, {shallow: true})
			} else {
    			router.push('/', `${data[active].slug}`, { shallow: true })
			}
			// FLY TO THE SCENE
		    const lngAdjustment = (windowSize.width < 768) ? data[active].metadata.lng : parseFloat(data[active].metadata.lng) + 5
			const reCenter = [data[active].metadata.lat, lngAdjustment];
			if (map) {
				map.flyTo(reCenter, 6, {
			        animate: true,
			        duration: 1
				});
			}
		} else {
			// HANDLE THE URL CHANGE
			if (slug) {
				router.push('/[slug]', `home`, { shallow: true })
			} else {
				router.push('/', undefined, { shallow: true })
			}
		}
	}, [active])

	useEffect(() => {
		if (map && active) {
			const reCenter = [data[active].metadata.lat, data[active].metadata.lng];
			map.flyTo(reCenter, 6, {
		        animate: true,
		        duration: 1
			});
		}
	}, [map])

	const markers = (data) ? data.map((mark, i) => <Marker icon={ pinIcon } key={`marker-${i}`} position={[mark.metadata.lat, mark.metadata.lng]} eventHandlers={{click: () => {console.log(mark, i); setActive(i);}}}/> ) : null;

	return (
		<>
			<MapContainer 
		        center={coords} 
		        zoom={zoom} 
		        zoomControl={false}
		        style={mapStyle}
		        minZoom={4}
		        maxZoom={12}
		        whenCreated={(map) => setMap(map)}
		       	maxBounds={maxBounds}
		    >
		    	<TileLayer
		            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a></a>'
		            url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
		        	id='mapbox/dark-v10'
		        	accessToken='pk.eyJ1IjoidG9teGJhcm5lc3giLCJhIjoiY2p1OTJsZDEwMXI1ajN5bzJ4NDhhNzVkcCJ9.EV4112N91Zp7z0tOS-bazg'
		        />
		        <ClickClose active={active} setActive={setActive} modal={modal} setModal={setModal} listOpen={listOpen} setListOpen={setListOpen} />
				{ markers }
				<ZoomControl position="bottomleft" />
	        </MapContainer>
		</>
	)
}

export default ReformMap;