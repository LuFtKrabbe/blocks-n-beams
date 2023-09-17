import { Cart, CentPrecisionMoney, LineItem, TypedMoney } from '@commercetools/platform-sdk';

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
    // TODO: Add styling
    return (
      <div>
        Total Cost: <span>{convertPrice(total)}</span> / <span>{convertPrice(cart.totalPrice)}</span>
      </div>
    );
  }
  return <div>Total Cost: {convertPrice(cart.totalPrice)}</div>;
};

export const getPriceElement = (item: LineItem) => {
  // TODO: Add styling
  return item.price.discounted ? (
    <div>
      <span>{convertPrice(item.price.value)}</span> / <span>{convertPrice(item.price.discounted.value)}</span>
    </div>
  ) : (
    <div>
      <span>{convertPrice(item.price.value)}</span>
    </div>
  );
};
