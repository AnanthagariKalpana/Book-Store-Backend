import Book from '../models/book.model'

export const getAll= async()=>{

    const data= await Book.find();
    console.log(data);
    return data;
}