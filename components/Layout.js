import { AppWrapper } from '../context/AppWrapper';
import { ToastProvider } from 'react-toast-notifications';
import Nav from './Nav';
import Footer from './Footer';
import CustomToast from "./CustomToast.js";

function Layout({ children }){
	return (
		<AppWrapper>
			<ToastProvider components={{ Toast: CustomToast }} autoDismiss={true} autoDismissTimeout={6000} placement={'top-center'}>
				<Nav />
				{ children }
				<Footer />
			</ToastProvider>
		</AppWrapper>
	);
}

export default Layout;