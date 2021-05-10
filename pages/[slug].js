import Head from 'next/head';
import dynamic from "next/dynamic";
import ErrorPage from 'next/error';
import {useMemo} from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { getSlugObjectAndMoreObjects, getAllSlugs } from "../lib/cosmic";
import Panel from '../components/Panel.js'
import Modal from '../components/Modal.js'
import ListView from '../components/ListView.js'

import styles from '../styles/Map.module.css';

export default function MovementSlug({pageIndex, allOrgs}){
  const [active, setActive] = useState(pageIndex);
  const [modal, setModal] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const router = useRouter();
  
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

  const MapNoSSR = useMemo(() => dynamic(() => import("../components/MapRework.js"), {
    ssr: false
  }), []);

  const activeData = (active !== null) ? allOrgs[active] : null
  
  if (!router.isFallback && (pageIndex === undefined || pageIndex === -1)) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <Head>
        <title>Frame | Police Reform Experiments</title>
        <link rel="icon" href="/frame.ico" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
          integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
          crossOrigin=""/>
      </Head>
      <main id="map">
        <MapNoSSR slug={true} data={allOrgs} active={active} setActive={setActive} modal={modal} setModal={setModal} listOpen={listOpen} setListOpen={setListOpen}/>
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
          <ListView listOpen={listOpen} setListOpen={setListOpen} setActive={setActive} data={allOrgs}/>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps({ params }) {
  const data = await getSlugObjectAndMoreObjects("organizations", params.slug)
  return {
    props: {
      pageIndex: (data.pageIndex !== -1) ? data.pageIndex : null,
      allOrgs: data.orgs.objects || [],
    },
  }
}

export async function getStaticPaths() {
  const allSlugs = (await getAllSlugs("organizations")) || []
  return {
    paths: allSlugs.map((slug) => `/${slug.slug}`),
    fallback: true,
  }
}