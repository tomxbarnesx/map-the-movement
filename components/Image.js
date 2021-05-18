export default function Image({src, width, height, alt}) {
	return (
		<img alt={(alt) ? alt : ''} src={src} width={width} height={height} />
	)
}