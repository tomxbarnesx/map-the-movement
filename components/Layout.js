import { AppWrapper } from '../context/AppWrapper';
import Head from 'next/head';
import Nav from './Nav';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function Layout({ children }){
	return (
		<>
			<Head>
				<link rel="icon" href="/logos/MTM_Logo.ico" />
		        <meta charSet="utf-8" />
		        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
        		<link rel="shortcut icon" href="/logos/MTM_Logo.ico" />
				<meta property="og:image" content="https://map-the-movement-cdn.s3.amazonaws.com/map-the-movement-social-share2021.jpg" />
        		<meta property="og:image:type" content="image/jpeg" />
				<meta property="og:type" content="website" />        
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:image" content="https://map-the-movement-cdn.s3.amazonaws.com/map-the-movement-social-share_twitter2021.jpg" />
				<meta name="twitter:site" content="@exploreframe" />
				<meta name="twitter:creator" content="@exploreframe" />
				<meta property="fb:app_id" content="2311483179121947" /> 
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<script async src="https://www.googletagmanager.com/gtag/js?id=UA-139166607-1"></script>
			    <script
		            dangerouslySetInnerHTML={{
		              __html: `
		            window.dataLayer = window.dataLayer || [];
		            function gtag(){dataLayer.push(arguments);}
		            gtag('js', new Date());
		            gtag('config', 'UA-139166607-1');
		          `,
		            }}
		        />
			</Head>
			<AppWrapper>
				<Head>
				</Head>
				<ToastContainer />
				<Nav />
				{ children }
				<Footer />
			</AppWrapper>
		</>
	);
}

export default Layout;