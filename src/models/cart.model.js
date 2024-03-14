import { Schema, model } from 'mongoose';

const cartSchema = new Schema(
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
            },
            quantity:{
                type: Number
            }
        }
    ],
    
    total:{
        type: Number,
        default:0
    },
    purchase:{
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true
  }
);

export default model('Cart', cartSchema);
