import Book from '../models/book.model'

export const getAll= async()=>{

    const data= await Book.find();
    //console.log(data);
    return data;
}

export const getBookById= async(id)=>{

    const data= await Book.findById(id);
    //console.log(data);
    return data;
}

export const sortBookByPrice= async(price)=>{
    // Sort books by price in ascending order
    const data= await Book.find().sort({price : 1})
    // Sort books by price in descending order
    //const data= await Book.find().sort({price: -1})
    return data;

    // const books= await Book.find({})
    // // Sort books by price in ascending order
    // if(price == 1)
    // {
    //     books.sort((a, b) => a.price - b.price)
    // }
    // // Sort books by price in descending order
    // else if(price == -1)
    // {
    //     books.sort((a, b) => b.price - a.price)
    // }
    
    ///return books;
}