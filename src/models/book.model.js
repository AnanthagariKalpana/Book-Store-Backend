import { Schema, model } from 'mongoose';

const bookSchema = new Schema(
    {
        bookName: {
            type: String
        },
        author: {
            type: String
        },
        description: {
            type: String
        },
        quantity: {
            type: Number
        },
        price: {
            type: Number
        },
        discountPrice: {
            type: Number
        },
        admin_user_id: {
            type: String
        },
        bookImage: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export default model('Book', bookSchema, 'book');