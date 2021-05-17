import { AppWrapper } from '../context/AppWrapper';
import Nav from './Nav';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function Layout({ children }){
	return (
		<AppWrapper>
			<ToastContainer />
			<Nav />
			{ children }
			<Footer />
		</AppWrapper>
	);
}

export default Layout;