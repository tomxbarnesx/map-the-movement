import { useRouter } from 'next/router';
// import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
	const router = useRouter()

	return (
		<>
			{
				(router.pathname === '/team' || router.pathname === '/contact-us') ?
					<footer>
						<div className="contentWidth">
							<div className="copyright">
								© 2021 Frame Media Inc.
							</div>
							<div className="footerLinkSpread">
								<Link href="/">
									<a>
										The Map
									</a>
								</Link>
								<Link href="/team">
									<a>
										The Team
									</a>
								</Link>
								<Link href="/contact-us">
									<a>
										Contact
									</a>
								</Link>
								<a target="_blank" rel="noopener noreferrer" href="https://app.termly.io/document/terms-of-use-for-website/46c34cde-9ba8-4481-bea6-73f5018877dd/">Terms of Service</a>
								<a target="_blank" rel="noopener noreferrer" href="https://app.termly.io/document/privacy-policy/808da1a2-5ba8-4445-aaf0-4de466662247">Privacy</a>
							</div>
						</div>
					</footer>
				: null
			}
		</>
	)
}

// <Image 
// 	src={'/logos/Frame_Media_logo_750_238.png'}
// 	width={187.5}
// 	height={59.5}
// />