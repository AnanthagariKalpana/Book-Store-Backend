// import Book from '../models/book.model'
// import Cart from '../models/cart.model';

// export const addToCart = async (bookId, userId) => {
//     try {
//         const book = await Book.find({ _id: bookId })

//         if (!book) {
//             throw new Error("book not found");
//         }
//         if (book.quantity <= 0) {
//             throw new Error("out of stock");
//         }

//         const cartCheck = await Cart.findOneAndUpdate(

//             { userId: userId, 'bookItems.bookId': bookId },
//             {
//                 $inc: {
//                     'bookItems.$,quantity': 1,
//                     total: book.discountPrice
//                 }
//             }, { new: true }
//         );
//         if (!cartCheck) {
//             const addCart = await Cart.findOne({ userId: userId });
//             if (!addCart) {
//                 addCart = await Cart.create({
//                     userId: userId,
//                     bookItems: [
//                         {
//                             bookId: book._id,
//                             bookImage: book.bookImage,
//                             bookName: book.bookName,
//                             price: book.discountPrice,
//                             quantity: 1
//                         }
//                     ],
//                     total: book.discountPrice
//                 });
//                 return addCart;
//             }
//             addCart.bookItems.push({
//                 bookId: book._id,
//                 bookImage: book.bookImage,
//                 bookName: book.bookName,
//                 price: book.discountPrice,
//                 quantity: 1
//             });
//             addCart.total=addCart.total+book.discountPrice;
//             await addCart.save();

//             return addCart;
//         }
//         return cartCheck;
//     }
//     catch(error)
//     {
//         console.log(error);
//         throw new Error("Filed to Add cart");
//     }

// };


import Book from '../models/book.model';
import Cart from '../models/cart.model';

export const addToCart = async (bookId, userId) => {
  try {
      const book = await Book.findById(bookId); // Use findById instead of find

      if (!book) {
          throw new Error("Book not found");
      }
      if (book.quantity <= 0) {
          throw new Error("Out of stock");
      }

      let addCart = await Cart.findOne({ userId: userId });

      if (!addCart) {
          addCart = await Cart.create({
              userId: userId,
              bookItems: [
                  {
                      bookId: book._id,
                      bookImage: book.bookImage,
                      bookName: book.bookName,
                      price: book.discountPrice,
                      quantity: 1
                  }
              ],
              total: book.discountPrice
          });
      } else {
          const cartItem = addCart.bookItems.find(item => item.bookId.toString() === book._id.toString());

          if (cartItem) {
              // If the book already exists in the cart, increase its quantity
              cartItem.quantity += 1;
          } else {
              // If the book doesn't exist in the cart, add it as a new item
              addCart.bookItems.push({
                  bookId: book._id,
                  bookImage: book.bookImage,
                  bookName: book.bookName,
                  price: book.discountPrice,
                  quantity: 1
              });
          }

          // Recalculate the total by iterating through bookItems
          addCart.total = addCart.bookItems.reduce((total, item) => {
              return total + (item.price * item.quantity);
          }, 0);
      }

      await addCart.save();

      return addCart;

  } catch (error) {
      console.log(error);
      throw new Error("Failed to add to cart");
  }
};


export const getCart = async (userId) => {
    try {
        //console.log(userId);
      const cart = await Cart.findOne({ userId: userId });
  
      if (!cart) {
        throw new Error("Cart not found for this user");
      }
  
      return cart;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get cart");
    }
  };


export const deleteCart = async (userId) => {
  try {
    const deletedCart = await Cart.findOneAndDelete({ userId: userId });

    if (!deletedCart) {
      throw new Error("Cart not found for this user");
    }

    return deletedCart;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete cart");
  }
};


export const removeCartItem = async (bookId, userId) => {
    try {
      const book = await Book.findById(bookId);
      if (!book) {
        throw new Error("Book not found");
      }
  
      const cartData = await Cart.findOne({ userId: userId });
      if (!cartData) {
        throw new Error("Cart not found");
      }
  
      const cartItemIndex = cartData.bookItems.findIndex(item => item.bookId.toString() === bookId.toString());
  
      if (cartItemIndex !== -1) {
        cartData.total -= cartData.bookItems[cartItemIndex].price;
  
        if (cartData.bookItems[cartItemIndex].quantity === 1) {
          cartData.bookItems.splice(cartItemIndex, 1);
        } else {
          cartData.bookItems[cartItemIndex].quantity -= 1;
        }
  
        book.quantity += 1;
  
        await book.save();
        await cartData.save();
  
        console.log("Item removed from cart.");
  
        return cartData;
      } else {
        throw new Error("Item not found in the cart");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error removing from cart");
    }
  };

  export const isPurchase = async (userId) => {
    try {
        const cartData = await Cart.findOne({ userId: userId });
        console.log(userId);

        if (!cartData) {
            throw new Error("Cart not found for this user");
        }

        if (cartData.bookItems.length === 0) {
            throw new Error("Cart is empty");
        }

        cartData.purchase = true;
        await cartData.save();

        return cartData;

    } catch (error) {
        console.log(error);
        throw error;
    }
};


