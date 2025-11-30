import { create } from "zustand"
import {persist} from "zustand/middleware"

const useCartStorage = create(persist((set,get) => {
  return {
    cart: [],

    increaseQuantity: ({ productId }) => {
      const {cart} = get()
      const newCart = cart.map(item => {
        if (item.productId === productId) {
          if (item.quantity >= item.max) return item

          return { ...item, quantity: item.quantity + 1,}
        }
        return item
      });

      set({ cart: newCart })
    },

    addItem: (product)  => {
      const {cart} = get()
      let newCart = [...cart]
      const productIndex = newCart.findIndex(res => res.productId === product.productId)
      const hasProduct = productIndex >= 0

      if (hasProduct) {
        newCart[productIndex] = {
          ...newCart[productIndex],
          quantity: newCart[productIndex].quantity + 1,
        };
      } else {
        const quantity = 1
        const total = product.price * quantity; 
        const newItem = { ...product, quantity, total }

        newCart = [...newCart, newItem]
      }

      set({ cart: newCart })
    },

    decreaseQuantity: ({ productId }) => {
      const {cart} = get()
      let newCart = cart.map(item => {
        if (item.productId === productId) {
          const { quantity } = item;

          if (quantity > 1)  return {...item, quantity: item.quantity - 1}
        }
        return item
      });

      newCart = newCart.filter(item => item.productId !== productId || item.quantity > 1)

      set({ cart: newCart })
    }
  }
},{
  name: "cart"
}));

export default useCartStorage