import Head from 'next/head';
import dynamic from "next/dynamic";
import {useMemo} from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { getAllObjects } from "../lib/cosmic";
import Panel from '../components/Panel.js';
import Modal from '../components/Modal.js';
import ListPanel from '../components/ListPanel.js';
import FoldableShareModule from '../components/FoldableShareModule.js';
import Randomizer from '../components/Randomizer.js';
import AddOrgButton from '../components/AddOrgButton.js';

import styles from '../styles/Map.module.css';

export default function RootView({allOrgs}){
  const router = useRouter()
  const [active, setActive] = useState(null);
  const [modal, setModal] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [shareUnfold, setShareUnfold] = useState(false);

  const cyclePanels = (direction) => {
    if (direction) {
      if (active === allOrgs.length - 1) {
        setActive(0)
      } else {
        setActive(a => a + 1)
      }     
    } else {
      if (active === 0) {
        setActive(allOrgs.length - 1)
      } else {
        setActive(a => a - 1)
      } 
    }
  }

  const handleListSelection = (data) => {
    const targetIndex = allOrgs.findIndex((el) => el.slug === data.slug)
    setActive(targetIndex)
    setListOpen(false)
  }

  const MapNoSSR = useMemo(() => dynamic(() => import("../components/MapRework.js"), {
    ssr: false
  }), []);

  useEffect(() => {
    if (sessionStorage.getItem('modalViewed') !== '1') {
      setModal(true)
      sessionStorage.setItem('modalViewed', "1");
    }
    router.replace(router.asPath);
  }, [])

  useEffect(() => {
    if (active && modal) {
      setActive(null)
    }
    if (modal && listOpen) {
      setListOpen(false)
    }
  }, [modal])

  useEffect(() => {
    if (listOpen && modal) {
      setModal(false)
    }
  }, [listOpen])

  const activeData = (active !== null) ? allOrgs[active] : null

  return (
    <>
      <Head>
        <title>#MapTheMovement | Explore The Map</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
          integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
          crossOrigin=""/>
        <meta property="og:url" content="https://www.mapthemovement.com/" />
        <meta property="og:type" content="website" />        
        <meta property="og:title" content="#MapTheMovement" />
        <meta name="twitter:title" content="#MapTheMovement" />
        <meta name="description" content="#MapTheMovement is an interactive map of organizations fighting to end police violence and mass incarceration." />
        <meta property="og:description" content="#MapTheMovement is an interactive map of organizations fighting to end police violence and mass incarceration." />
        <meta name="twitter:description" content="#MapTheMovement is an interactive map of organizations fighting to end police violence and mass incarceration." />       
        <meta name="apple-mobile-web-app-capable" content="yes" />     
      </Head>
      <main id="map">
        <MapNoSSR data={allOrgs} active={active} setActive={setActive} modal={modal} setModal={setModal} listOpen={listOpen} setListOpen={setListOpen}/>
        <CSSTransition 
          in={(active !== null)} 
          timeout={400}
          unmountOnExit
          classNames="fade-in"
        >
          <Panel data={activeData} setActive={setActive} cyclePanels={cyclePanels}/>
        </CSSTransition>
        <div className={styles.tray}>
          <Modal modal={modal} setModal={setModal}/>
          <ListPanel listOpen={listOpen} setListOpen={setListOpen} setActive={setActive} handleListSelection={handleListSelection} data={allOrgs}/>
          <Randomizer length={allOrgs.length} setActive={setActive} />
          <AddOrgButton setListOpen={setListOpen}/>
          <FoldableShareModule shareUnfold={shareUnfold} setShareUnfold={setShareUnfold} icons={["Link", "Twitter", "Facebook"]}/>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const allOrgs = (await getAllObjects("organizations")) || []
  return {
    props: { allOrgs },
  }
}