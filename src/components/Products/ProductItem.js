import React, { useRef, useContext } from 'react';
import classes from './ProductItem.module.css';
import CartContext from '../../store/cart-context';

const ProductItem = ({ id, name, type, price, currency, color, gender, quantity }) => {
  const cartCtx = useContext(CartContext);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = +amountInputRef.current.value;
    
    cartCtx.addItem({
      id: id,
      name: name,
      amount: enteredAmount,
      price: price,
      currency: currency
    });
  };

  const input = {
    id: `${id}-amount`,
    type: 'number',
    min: '1',
    max: `${quantity}`,
    step: '1',
    defaultValue: '1',
  };

  
  return (
    <li className={classes.product}>
      <div>
        <h3>{name}</h3>
        <div className={classes.type}>{type}</div>
        <div className={classes.price}>{`${currency} ${price.toFixed(2)}`}</div>
      </div>
      <div>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.input}>
            <label htmlFor={input.id}>{'Amount'}</label>
            <input ref={amountInputRef} {...input} />
          </div>
          <button>+ Add</button>
        </form>
      </div>
    </li>
  );
};

export default ProductItem;
