import { AppWrapper } from '../context/AppWrapper';
import { ToastProvider } from 'react-toast-notifications';
import Nav from './Nav';
import Footer from './Footer';
import CustomToast from "./CustomToast.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function Layout({ children }){
	return (
		<AppWrapper>
			<ToastProvider components={{ Toast: CustomToast }} autoDismiss={true} autoDismissTimeout={6000} placement={'top-center'}>
				<ToastContainer />
				<Nav />
				{ children }
				<Footer />
			</ToastProvider>
		</AppWrapper>
	);
}

export default Layout;