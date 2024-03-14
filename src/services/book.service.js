import Book from '../models/book.model'

export const getAll = async () => {

    const data = await Book.find();
    //console.log(data);
    return data;
}

export const getBookById = async (id) => {

    const data = await Book.findById(id);
    //console.log(data);
    return data;
}

export const sortBookByPrice = async (price) => {

    const books= await Book.find({})
    // Sort books by price in ascending order
    if(price == 1)
    {
        books.sort((a, b) => a.price - b.price)
    }
    // Sort books by price in descending order
    else if(price == -1)
    {
        books.sort((a, b) => b.price - a.price)
    }

    return books;
}

export const searchBook = async (search) => {
    try {
        const searchBook = await Book.find({
           $or:[
            {bookName: { $regex: String(search), $options: 'i' }},
            {author: { $regex: String(search), $options: 'i' }}
            ]
        });
        // console.log(searchBook);
        if (!searchBook) {
            throw new Error('Book not Found');
        }
        return searchBook;
    }
    catch (error) {
        console.log(error);
        throw new Error('An error Occured while searching Book')
    }
}