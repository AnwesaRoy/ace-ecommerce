import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import CartProvider from './store/CartProvider';


ReactDOM.render(<BrowserRouter><CartProvider><App /></CartProvider></BrowserRouter>, document.getElementById('root'));
