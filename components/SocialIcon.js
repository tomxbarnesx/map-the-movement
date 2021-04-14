import Image from 'next/image';

const SocialIcon = ({data}) => {
	return (
		<div>
			<a href={data.url} target="_blank" rel="noopener noreferrer">
				<Image 
					src={`/logos/${data.platform}.svg`}
					width={25}
					height={25}
					alt={data.platform}
				/>
			</a>
		</div>
	)
}

export default SocialIcon;