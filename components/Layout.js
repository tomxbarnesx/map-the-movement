import { AppWrapper } from '../context/AppWrapper';
import { ToastProvider } from 'react-toast-notifications';
import Nav from './Nav';
import CustomToast from "./CustomToast.js";

function Layout({ children }){
	return (
		<AppWrapper>
			<ToastProvider components={{ Toast: CustomToast }} autoDismiss={true} autoDismissTimeout={6000} placement={'top-center'}>
				<Nav />
				{ children }
			</ToastProvider>
		</AppWrapper>
	);
}

export default Layout;