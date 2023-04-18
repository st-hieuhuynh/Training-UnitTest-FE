export class FruitShop {
  products: {
    [name: string]: {
      price: number;
      discounts: [number, number][];
    };
  };
  cart: {
    [name: string]: number
  };

  constructor(products: typeof FruitShop.prototype.products) {
    this.products = products;
    this.cart = {};
  }

  addProduct(name, price, discounts) {
    this.products[name] = { price, discounts };
  }

  removeProduct(name) {
    delete this.products[name];
  }

  updateProduct(name, price, discounts) {
    if (this.products[name]) {
      this.products[name].price = price;
      this.products[name].discounts = discounts;
    }
  }

  addToCart(name, quantity) {
    if (this.cart[name]) {
      this.cart[name] += quantity;
    } else {
      this.cart[name] = quantity;
    }
  }

  removeFromCart(name, quantity) {
    if (this.cart[name]) {
      if (this.cart[name] <= quantity) {
        delete this.cart[name];
      } else {
        this.cart[name] -= quantity;
      }
    }
  }

  checkout() {
    let total = 0;
    for (const name in this.cart) {
      const { price, discounts } = this.products[name];
      const qty = this.cart[name];
      const discount = this.getDiscount(discounts, qty);
      total += price * qty * ((100 - discount) / 100);
    }
    return total;
  }

  getDiscount(discounts, qty) {
    let discount = 0;
    for (let i = discounts.length - 1; i >= 0; i--) {
      const [threshold, value] = discounts[i];
      if (qty >= threshold) {
        discount = Math.max(discount, value);
        break;
      }
    }
    return discount;
  }
}
