import styles from '../styles/Modal.module.css';
import {useState, useEffect} from 'react';
import { submitObject } from '../lib/cosmic';
import { toast } from 'react-toastify';

export default function SubmitForm({setListOpen}) {
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const [donateurl, setDonateurl] = useState('')
	const [submitters_email, setSubmitters_email] = useState('')
	const [summary, setSummary] = useState('')
	const [sending, setSending] = useState(false)

	useEffect(() => {
		if (sending) {
			if (title !== '' && url !== '') {
				const dataPacket = {			
					url: url, 
					donateurl: donateurl, 
					submitters_email: submitters_email,
					summary: summary
				};
				submitObject(dataPacket, title, setSending)
			} else {
				toast.error(`Please add a name and url for the organization!`, {
			        position: "top-right",
			        autoClose: 5000,
			        hideProgressBar: false,
			        closeOnClick: true,
			        pauseOnHover: true,
			        draggable: true,
			        progress: undefined,
			     })
				setSending(false)
			}
		} else if (sending === 0) {
			setListOpen(false)
		}
	}, [sending])

	return (
		<div className={styles.submitForm}>
			<h1 style={{marginBottom: "0"}}>Submit a New Organization</h1>
			<p style={{marginBottom: "0"}}><em>We're always looking to add new organizations. Please submit as much info as you can, so we can find it and determine if it's a good fit for the map. If you include your email, we'll send you a note if it's approved!</em></p>
			<form onSubmit={(e) => {e.preventDefault(); return setSending(true)}}>
				<div>
					<label htmlFor="title" style={{display: "none"}}>Organization Name</label>
					<input id="title" className={styles.listViewSearch} placeholder="Enter the organization's name" onChange={(e) => setTitle(e.target.value)} value={title}/>
				</div>
				<div>
					<label htmlFor="url" style={{display: "none"}}>Homepage or main social URL</label>
					<input id="url" className={styles.listViewSearch} placeholder="Link to the organization's site" onChange={(e) => setUrl(e.target.value)} value={url}/>
				</div>
				<div>
					<label htmlFor="donate" style={{display: "none"}}>Donation link</label>
					<input id="donate" className={styles.listViewSearch} placeholder="Donation link (optional)" onChange={(e) => setDonateurl(e.target.value)} value={donateurl}/>
				</div>
				<div>
					<label htmlFor="email" style={{display: "none"}}>Your Email</label>
					<input id="email" type="email" className={styles.listViewSearch} placeholder="Your email (optional)" onChange={(e) => setSubmitters_email(e.target.value)} value={submitters_email}/>
				</div>
				<div>
					<label htmlFor="summary" style={{display: "none"}}>Description (optional)</label>
					<textarea id="summary" type="" className={`${styles.listViewSearch} ${styles.textArea}`} placeholder="Brief description (optional)" onChange={(e) => setSummary(e.target.value)} value={summary}/>
				</div>
				{
					(!sending) ?
						<input className={`${styles.learnMoreButton} ${styles.submitButton} ${styles.centered}`} type="submit" value="Submit" />
					: 
						<div className={`${styles.learnMoreButton} ${styles.centered}`}>
							Sending...
						</div>
				}
			</form>
		</div>
	)
}