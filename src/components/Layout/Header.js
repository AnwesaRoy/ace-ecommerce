import React, { useContext } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartContext from '../../store/cart-context';
import classes from './Header.module.css';
import { Link } from "react-router-dom";

const Header = (props) => {
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curQuantity, item) => {
    return curQuantity + item.amount;
  }, 0);

  return (
    <header className={classes.header}>
      <Link to="/"><h1 className={classes.headerText}>Ace E-commerce</h1></Link>
      <Link to="/cart">
      <button className={classes.button} >
        <span className={classes.icon}>
          <ShoppingCartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
      </button></Link>
    </header>
  );
};

export default Header;
