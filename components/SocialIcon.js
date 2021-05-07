import Image from 'next/image';

const SocialIcon = ({data, platform}) => {
	const sizing = (platform === "www") ? 30 : 25
	return (
		<div>
			<a href={data} target="_blank" rel="noopener noreferrer">
				<Image 
					src={`/logos/${platform}.svg`}
					width={sizing}
					height={sizing}
					alt={data.platform}
				/>
			</a>
		</div>
	)
}

export default SocialIcon;