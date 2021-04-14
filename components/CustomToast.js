const CustomToast = ({ appearance, children, onDismiss }) => (
	<div className="toastContainer" style={{ background: appearance === 'error' ? 'red' : '#36B37E' }}>
		{children}
		<img className="toastX cursorPointer" onClick={() => {onDismiss()}} src={'/x.svg'}/>
	</div>
);

export default CustomToast;