import { useReducer } from 'react';
import productData from '../resources/mock_products.json';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {console.log(state);
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    let updatedItems;
    let updatedTotalAmount = 0;

    if(existingCartItemIndex === -1) {
      const newItem = productData.find(product => product.id === action.id);
      updatedItems = state.items.concat({...newItem, amount: 1});
      updatedTotalAmount = state.totalAmount + newItem.price;
    }
    else {
      const existingItem = state.items[existingCartItemIndex];
      updatedTotalAmount = state.totalAmount + existingItem.price;
      const updatedItem = { ...existingItem, amount: existingItem.amount + 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  if (action.type === 'CLEAR') {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (id/* item */) => {
    dispatchCartAction({ type: 'ADD', id: id/* item: item */ });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({type: 'CLEAR'});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
