export default function Tooltip({toolTitle, vis, effectTrigger}) {
	return (
		<div className={`tooltip unselectable ${(vis) ? 'appear' : ''}`}>{toolTitle}</div>
	)
}