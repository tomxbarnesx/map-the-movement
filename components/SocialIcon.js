import Image from 'next/image';

const SocialIcon = ({data}) => {
	return (
		<div>
			<a href={data.url} target="_blank" rel="noopener noreferrer">
				<Image 
					src={data.iconUrl}
					width={30}
					height={30}
					alt={data.icon}
				/>
			</a>
		</div>
	)
}

export default SocialIcon;