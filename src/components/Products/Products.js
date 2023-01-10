import React, { useEffect, useState } from 'react';
import productData from '../../resources/mock_products.json';
import Card from '../Layout/Card';
import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProducts(productData);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <section className={classes.ProductsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  const productsList = products.map((product) => (
    <ProductItem
      key={product.id}
      id={product.id}
      name={product.name}
      type={product.type}
      price={product.price}
      currency={product.currency}
      color={product.color}
      gender={product.gender}
      quantity={product.quantity}
    />
  ));

  return (
    <>
      <section className={classes.summary}>
        <h2>Order anything, anytime, anywhere!</h2>
        <p>
          Choose your favorite product from our broad selection of available products.
        </p>
      </section>
      <section className={classes.products}>
        <Card>
          <ul>{productsList}</ul>
        </Card>
      </section>
    </>
  );
};

export default Products;
