import Head from 'next/head'
import dynamic from "next/dynamic";

function ReformExperiments(){
  const MapWithNoSSR = dynamic(() => import("../components/Map.js"), {
    ssr: false
  });

  return (
    <>
      <Head>
        <title>Frame | Police Reform Experiments</title>
        <link rel="icon" href="/frame.ico" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
          integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
          crossOrigin=""/>
      </Head>
      <div id="map">
        <MapWithNoSSR />
      </div>
    </>
  )
}

export default ReformExperiments;