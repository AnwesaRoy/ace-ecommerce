import React, { useContext, useState } from 'react';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Card from '../Layout/Card';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

const Cart = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  
  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    console.log('Order Placed');
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          currency={item.currency}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModalContent = (
    <>
      {hasItems && cartItems}
      {!hasItems && <div className={classes.emptyCart}><Card>Cart is empty!</Card></div>}
      {hasItems && <section className={classes.footer}>
        <Card>
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <button className={classes.button} onClick={() => cartCtx.clearCart()}>Clear</button>
            {hasItems && (
              <button className={classes.button} onClick={submitOrderHandler}>Order</button>
            )}
          </div>
        </Card>
      </section>}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <Card><p className={classes.orderPlaced}>Order placed successfully!</p>
      <div className={classes.actions}>
        <Button component={Link} className={classes.button} to="/">Home</Button>
      </div>
      </Card>
    </>
  );

  return (
    
    <>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </>
   
  );
};

export default Cart;
