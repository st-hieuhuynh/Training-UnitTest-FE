import { FruitShop } from './fruit-shop';

describe('FruitShop', () => {
  let shop;

  beforeEach(() => {
    shop = new FruitShop({
      apple: {
        price: 5000,
        discounts: [
          {
            quantityApply: 1,
            discount: 5
          },
          {
            quantityApply: 2,
            discount: 10
          }
        ]
      },
      banana: {
        price: 3000,
        discounts: [
          {
            quantityApply: 1,
            discount: 5
          },
          {
            quantityApply: 3,
            discount: 10
          }
        ]
      }
    });
    shop.addToCart('apple', 2);
    shop.addToCart('banana', 3);
  });

  test('addProduct', () => {
    shop.addProduct('orange', 6000, [
      {
        quantityApply: 4,
        discount: 15
      },
      {
        quantityApply: 8,
        discount: 25
      }
    ]);
    expect(shop.products).toHaveProperty('orange');
    expect(shop.products['orange'].price).toEqual(6000);
    expect(shop.products['orange'].discounts).toEqual([
      {
        quantityApply: 4,
        discount: 15
      },
      {
        quantityApply: 8,
        discount: 25
      }
    ]);
  });

  test('removeProduct', () => {
    shop.removeProduct('banana');
    expect(shop.products).not.toHaveProperty('banana');
  });

  test('updateProduct', () => {
    shop.updateProduct('apple', 5500, [
      {
        quantityApply: 3,
        discount: 15
      },
      {
        quantityApply: 6,
        discount: 25
      }
    ]);
    expect(shop.products['apple']).toMatchObject({
      price: 5500,
      discounts: [
        {
          quantityApply: 3,
          discount: 15
        },
        {
          quantityApply: 6,
          discount: 25
        }
      ],
    });
  });

  test('addToCart', () => {
    shop.addToCart('apple', 3);
    expect(shop.cart).toMatchObject({
      apple: 5,
      banana: 3,
    });
  });

  test('removeFromCart', () => {
    shop.removeFromCart('banana', 2);
    expect(shop.cart).toMatchObject({
      apple: 2,
      banana: 1,
    });
  });

  test('checkout', () => {
    expect(shop.checkout()).toBe(5000 * 2 * 0.9 + 3000 * 3 * 0.9);
  });
});
