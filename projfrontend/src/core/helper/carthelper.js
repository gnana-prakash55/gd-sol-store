export const addItemCart = (item, next) => {
  let cart = [];
  if (typeof window != undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...item,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  if (typeof window != undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};


export const removeItemFromCart = (productId) => {
    let cart = []
    if (typeof window != undefined){
        if (localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart = cart.filter(item => item.id !== productId)
        localStorage.setItem('cart',JSON.stringify(cart))
    }
    return cart;
}

export const cartEmpty = (next) => {
    if (typeof window != undefined){
        localStorage.removeItem('cart')
        let cart = []
        localStorage.setItem('cart',JSON.stringify(cart))
    }
}