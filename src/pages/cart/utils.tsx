import { Cart, CentPrecisionMoney, LineItem, TypedMoney } from '@commercetools/platform-sdk';

import styles from './cart.module.css';

export const convertPrice = (price: TypedMoney | CentPrecisionMoney) => {
  return (price.centAmount / 100).toFixed(price.fractionDigits) + ' ' + price.currencyCode;
};

export const getTotalCartCostElement = (cart: Cart) => {
  const total = { ...cart.lineItems[0].price.value };
  total.centAmount = 0;
  cart.lineItems.forEach((item) => {
    total.centAmount += item.price.discounted
      ? item.price.discounted.value.centAmount * item.quantity
      : item.price.value.centAmount * item.quantity;
  });

  if (total.centAmount !== cart.totalPrice.centAmount) {
    return (
      <div>
        Total Cost: <span className={styles.oldPrice}>{convertPrice(total)}</span> /{' '}
        <span className={styles.price}>{convertPrice(cart.totalPrice)}</span>
      </div>
    );
  }
  return (
    <div>
      Total Cost: <span className={styles.price}>{convertPrice(cart.totalPrice)}</span>
    </div>
  );
};

export const getPriceElement = (item: LineItem) => {
  return item.price.discounted ? (
    <div>
      <span className={styles.oldPrice}>{convertPrice(item.price.value)}</span> /{' '}
      <span className={styles.price}>{convertPrice(item.price.discounted.value)}</span>
    </div>
  ) : (
    <div>
      <span>{convertPrice(item.price.value)}</span>
    </div>
  );
};
