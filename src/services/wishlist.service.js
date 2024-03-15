import WishList from "../models/wishlist.model";
import Book from '../models/book.model';

export const addWishlist=async(bookId, userId)=>{
try{
    const book= await Book.findById(bookId);
    //checking book is present or not
    if(!book)
    {
        throw new Error ("book not found");
    }
    //find the user is having the wishlist or not
     let wishlistData= await WishList.findOne({userId: userId});
    //if user not have wishlist create it
     if(!wishlistData)
     {
        let data = await WishList.create({
            userId: userId,
            bookItems:[
                {
                bookId: book._id,
                bookImage : book.bookImage,
                bookName: book.bookName,
                price: book.price
                }
            ]
        });
        console.log(data);
        return data;
     }
     
        const wishlistIndex = wishlistData.bookItems.some(item => item.bookId === book._id);
        //checking book is already in wishlist or not
        if(wishlistIndex)
        {//if it is there just pull it and update
            wishlistData = await WishList.findOneAndUpdate(
                {userId: userId},{$pull:{bookItems :{bookId:bookId}}},
                {new : true}
            );
        }
        //if it is not there then push it to the wishlist
        else{
            wishlistData = await WishList.findOneAndUpdate(
                {userId: userId},{
                    $push:{
                        bookItems:{
                            bookId: book._id,
                            bookImage: book. bookImage,
                            bookName: book.bookName,
                            price: book.price
                        }
                    }
                },{new: true}
            );
            console.log(wishlistData);
            return wishlistData;
        }
    }
    catch(error)
    {
        console.log(error);
        throw new Error ('Field to add WishList')
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