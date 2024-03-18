import { Schema, model } from 'mongoose';

const wishlistSchema = new Schema(
  {
    userId:{
        type:String
    },
    bookItems:[
        {
            bookId:{
                type: String
            },
            bookImage:{
                type: String
            },
            bookName:{
                type: String
            },
            price:{
                type: Number
            }
        }
    ],
  },
  {
    timestamps: true
  }
);


export default model('Wishlist', wishlistSchema);
