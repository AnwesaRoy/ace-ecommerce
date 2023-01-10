import React from 'react';

import Header from './components/Layout/Header';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import { Route, Routes } from 'react-router-dom';
import NotFound from './components/Layout/NotFound';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" exact element={<Products />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </main>
    </>  
  );
 
}

export default App;
