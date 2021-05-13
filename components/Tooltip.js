export default function Tooltip({toolTitle, vis}){
	return (
		<div className={`tooltip unselectable ${(vis) ? 'appear' : ''}`}>{toolTitle}</div>
	)
}