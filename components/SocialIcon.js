import Image from 'next/image';

const SocialIcon = ({data}) => {
	const sizing = (data.platform === "www") ? 30 : 25
	return (
		<div>
			<a href={data.url} target="_blank" rel="noopener noreferrer">
				<Image 
					src={`/logos/${data.platform}.svg`}
					width={sizing}
					height={sizing}
					alt={data.platform}
				/>
			</a>
		</div>
	)
}

export default SocialIcon;