/* eslint-disable no-console */
import { Validator, Min, Max } from '../src/index';

class BookStoreInventory {
    @Min(5)
    books: number;

    @Max(10)
    articles: number;
}

const validator = new Validator();

const bookStoreInventory = new BookStoreInventory();
bookStoreInventory.books = 1;

const [isValid, errors] = validator.validate(bookStoreInventory);

if (!isValid) {
    console.error('Errors =>', errors);
}

/**
 * Output
 * Errors => [
 *  {
 *     property: 'books',
 *     messages: [ 'books must be greater or equal than 5' ]
 *  },
 *  {
 *     property: 'articles',
 *     messages: [
 *       'articles does not have a correct type, it should be [number] instead of [undefined]'
 *     ]
 *  }
 */
