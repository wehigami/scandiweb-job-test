export function location() {
  const regex = /([^/]*)$/;
  const location = regex.exec(window.location.href)[0];
  return location;
}

export function before_(str) {
  return str.includes("_") ? str.substring(0, str.indexOf("_")) : str;
}

export const cartTotal = (cart, label) => {
  let total = 0;
  cart.forEach((item) => {
    let index = item.price.findIndex(
      (priceItem) => priceItem.label === label
    );
    total += item.price[index].amount * item.quantity;
  });
  return total.toFixed(2);
};