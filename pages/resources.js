import Head from 'next/head';
import bucket from "../lib/cosmic";

export default function Team({team}) {

	return (
		<>
			<Head>
		        <title>#MapTheMovement | Resources</title>
		        <link rel="icon" href="/frame.ico" />
		        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
		          integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
		          crossOrigin=""/>
	      	</Head>
	      	<main>
	      		<div className='contentContainer'>
		      		<h1>Resources</h1>
		      		<p style={{textAlign: 'center'}}><em>Coming soon...</em></p>
	      		</div>
	      	</main>
      	</>
	)
}

export async function getStaticProps(ctx) {
  const data = await bucket.getObjects({
    query: {
    	type: 'team-members'
    },
    sort: 'created_at',
    props: 'slug,title,metadata'
  })
  const team = await data.objects
  return {
    props: {
    	team: team
    }
  }
}