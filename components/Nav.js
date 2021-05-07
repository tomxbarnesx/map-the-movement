import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '../styles/Nav.module.css';

export default function Nav() {
	const [open, setOpen] = useState(false);
	const navRef = useRef();
	
	useEffect(() => {
		if (open) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open]);

	const handleClickOutside = e => {
		if (navRef.current.contains(e.target)) {
			return;
		}
		setOpen(false);
	};
	
	const windowCheck = () => {
		if (typeof window !== "undefined") {
			if (window.top === window) {
				return true;
			} else {
				return false;
			}
		} 
		return true;
	}

 	const topClasses = (open) ? `${styles.top} ${styles.rotate}` : styles.top;
 	const middleClasses = (open) ? `${styles.middle} ${styles.rotateBack}` : styles.middle;
 	const menuStyles = (open) ? {display: 'block'} : {display: 'none'};
	const bgCover = (open) ? `${styles.bgCover} ${styles.reveal}`: `${styles.bgCover}`;
	
	return (
		<div className={styles.navContainer}>
			<Link href="/">
				<a>
					<h1>#MapTheMovement</h1>
				</a>
			</Link>
			{
                (windowCheck) ? 
	                <div ref={navRef} className={styles.buttonContainer}>
	                    <div className={bgCover}>
	                        <ul className={styles.menu} style={menuStyles}>
	                            <Link href="/">
	                            	<a onClick={() => setOpen(!open)}>
	                            		<li>Home</li>
	                            	</a>
	                            </Link>
	                            <Link href="/team/">
	                            	<a onClick={() => setOpen(!open)}>
	                            		<li>Meet the Team</li>
	                            	</a>
	                            </Link>
	                            <Link href="/contact/">
	                            	<a onClick={() => setOpen(!open)}>
	                            		<li>Contact Us</li>
	                            	</a>
	                            </Link>
	                            <div className={styles.navTerms}>
	                                <div className={`${styles.footerServiceLinks} ${styles.blackText}`}><a target="_blank" rel="noopener noreferrer" onClick={() => setOpen(!open)} href="https://app.termly.io/document/terms-of-use-for-website/46c34cde-9ba8-4481-bea6-73f5018877dd/">Terms of Service</a></div>
	                                <div className={`${styles.footerServiceLinks} ${styles.blackText}`}><a target="_blank" rel="noopener noreferrer" onClick={() => setOpen(!open)} href="https://app.termly.io/document/privacy-policy/808da1a2-5ba8-4445-aaf0-4de466662247">Privacy</a></div>
	                            </div>
	                            {/*<div className={styles.navSocials}>
			                    	{ socials }
			                    </div>*/}
	                        </ul>
	                    </div>
	                    <div id="hamby" className={styles.hamburgerShell} onClick={() => setOpen(!open)}>
	                        <div className={topClasses}></div>
	                        <div className={middleClasses}></div>
	                    </div>
	                </div>
                : null
            }
		</div>
	)
}