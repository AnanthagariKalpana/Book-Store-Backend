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
            const cartItemIndex = addCart.bookItems.findIndex(item => item.bookId === book._id);

            if (cartItemIndex !== -1) {
                // If the book already exists in the cart, increase its quantity
                addCart.bookItems[cartItemIndex].quantity += 1;
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

            // Update the total by adding the book's discount price
            addCart.total += book.discountPrice;
        }

        await addCart.save();

        return addCart;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to add to cart");
    }
};
