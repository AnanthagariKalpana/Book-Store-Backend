import WishList from "../models/wishlist.model";
import Book from '../models/book.model';

export const addWishlist = async (bookId, userId) => {
    try {
        const book = await Book.findById(bookId);
        
        // Check if the book exists
        if (!book) {
            throw new Error("Book not found");
        }

        // Check if the user has a wishlist
        let wishlistData = await WishList.findOne({ userId: userId });

        if (!wishlistData) {
            // If the user does not have a wishlist, create one
            const data = await WishList.create({
                userId: userId,
                bookItems: [{
                    bookId: book._id,
                    bookImage: book.bookImage,
                    bookName: book.bookName,
                    price: book.price
                }]
            });
            
            return data; // Return created wishlist
        }

        // Check if the book is already in the wishlist
        const isBookInWishlist = wishlistData.bookItems.some(item => item.bookId.toString() === book._id.toString());

        if (isBookInWishlist) {
            // If the book is already in the wishlist, return a message
            return { message: "This book is already in your wishlist" };
        } else {
            // If the book is not in the wishlist, add it
            wishlistData = await WishList.findOneAndUpdate(
                { userId: userId },
                {
                    $push: {
                        bookItems: {
                            bookId: book._id,
                            bookImage: book.bookImage,
                            bookName: book.bookName,
                            price: book.price
                        }
                    }
                },
                { new: true }
            );
            
            return wishlistData; // Return updated wishlist
        }
    } catch (error) {
        console.log(error);
        throw new Error('Failed to add to Wishlist');
    }
};



export const getWishlist = async (userId) => {
    try {
       // console.log(userId);
      const like = await WishList.findOne({ userId: userId });
  
      if (!like) {
        throw new Error("Wishlist not found for this user");
      }
  
      return like;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get wishlist");
    }
  }; 

  export const deleteWishlist = async (userId) => {
    try {
       // console.log(userId);
      const like = await WishList.findOneAndDelete({ userId: userId });
  
      if (!like) {
        throw new Error("Wishlist not found for this user");
      }
  
      return like;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete wishlist");
    }
  };