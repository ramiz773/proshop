export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //   calculate items price
  state.itemPrice = addDecimal(state.cartItems.reduce((acc, item) => acc + parseFloat(item.price) * parseInt(item.qty), 0));
  //   calculate shipping price (if oder over 100 then free else it will be 10 shipping)
  state.shippingPrice = addDecimal(state.itemPrice > 10 ? 0 : 10);
  // calculate tax price
  state.taxPrice = addDecimal(Number(0.12 * state.itemPrice).toFixed(2));
  // total price
  state.totalPrice = (Number(state.itemPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
