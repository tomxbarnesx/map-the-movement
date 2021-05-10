import styles from '../styles/Team.module.css';

export default function PortraitBlock({data, i}){
	const positioningClasses = (i % 2) ? styles.rightAlign : ''

	return (
		<div className={styles.portraitBlock}>
  			<div className={`${styles.innerLining} ${positioningClasses}`}>
  				<div className={`${styles.portraitImgContainer} ${positioningClasses} placeholderGradient`}>
  					<img src={data.metadata.portrait.imgix_url} width="100%"/>
 				</div>
 				<div className={styles.bio}>
	  				<h2>{data.title}</h2>
	  				<p>{data.metadata.bio}</p>
	  				<a style={{float: 'right'}} className="cursorPointer" target="_blank" rel="noopener noreferrer" href={data.metadata.url}><em>Learn more</em></a>
	  			</div>
  			</div>
  		</div>
	)
}