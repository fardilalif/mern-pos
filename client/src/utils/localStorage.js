export const saveCartData = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCartData = () => {
  return JSON.parse(localStorage.getItem("cart"));
};

export const removeCartData = () => {
  localStorage.removeItem("cart");
};
