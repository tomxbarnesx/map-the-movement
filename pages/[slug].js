import Head from 'next/head';
import dynamic from "next/dynamic";
import {useMemo} from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import bucket from "../lib/cosmic";
import Panel from '../components/Panel.js'

export default function ReformExperiments({pageIndex, orgs}){
  const [active, setActive] = useState(pageIndex);

  const cyclePanels = (direction) => {
    if (direction) {
      if (active === orgs.length - 1) {
        setActive(0)
      } else {
        setActive(a => a + 1)
      }     
    } else {
      if (active === 0) {
        setActive(orgs.length - 1)
      } else {
        setActive(a => a - 1)
      } 
    }
  }

  const MapNoSSR = useMemo(() => dynamic(() => import("../components/MapRework.js"), {
    ssr: false
  }), []);

  const activeData = (active !== null) ? orgs[active] : null

  return (
    <>
      <Head>
        <title>Frame | Police Reform Experiments</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
          integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
          crossOrigin=""/>
      </Head>
      <div id="map">
        <MapNoSSR slug={true} data={orgs} active={active} setActive={setActive} />
        <CSSTransition 
          in={(active !== null)} 
          timeout={400}
          unmountOnExit
          classNames="fade-in"
        >
          <Panel data={activeData} setActive={setActive} cyclePanels={cyclePanels}/>
        </CSSTransition>
      </div>
    </>
  )
}


export async function getServerSideProps(ctx) {
  const data = await bucket.getObjects({
    query: {
      type: 'organizations'
    },
    props: 'slug,title,metadata'
  })
  const organizations = await data.objects
  const pageIndex = organizations.findIndex((org) => org.slug === ctx.params.slug);
  return {
    props: {
      orgs: organizations,
      pageIndex: (pageIndex !== -1) ? pageIndex : null,
    }
  }
}