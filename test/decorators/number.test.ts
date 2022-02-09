import { Validator, Min, Max } from '../../src/index';

describe('Should validate number constraints', () => {
    const validator = new Validator();

    describe('Should validate min decorator', () => {
        class BookStoreInventory {
            @Min(5)
            books: number;
        }

        it('should validate a min error', () => {
            const bookStoreInventory = new BookStoreInventory();
            bookStoreInventory.books = 1;

            const [isValid, errors] = validator.validate(bookStoreInventory);

            expect(isValid).toBeFalsy();
            expect(errors.length).toEqual(1);
            expect(errors[0].property).toEqual('books');
        });

        it('should pass a min declaration', () => {
            const bookStoreInventory = new BookStoreInventory();
            bookStoreInventory.books = 5;

            const [isValid, errors] = validator.validate(bookStoreInventory);

            expect(isValid).toBeTruthy();
            expect(errors.length).toEqual(0);
        });

        it('should validate type for min', () => {
            const bookStoreInventory = {
                books: 'sasa',
            };

            const [isValid, errors] = validator.validateType(bookStoreInventory, BookStoreInventory);

            expect(isValid).toBeFalsy();
            expect(errors.length).toEqual(1);
            expect(errors[0].property).toEqual('books');
        });
    });

    describe('Should validate max decorator', () => {
        class BookStoreInventory {
            @Max(5)
            books: number;
        }

        it('should validate a max error', () => {
            const bookStoreInventory = new BookStoreInventory();
            bookStoreInventory.books = 6;

            const [isValid, errors] = validator.validate(bookStoreInventory);

            expect(isValid).toBeFalsy();
            expect(errors.length).toEqual(1);
            expect(errors[0].property).toEqual('books');
        });

        it('should pass a max declaration', () => {
            const bookStoreInventory = new BookStoreInventory();
            bookStoreInventory.books = 5;

            const [isValid, errors] = validator.validate(bookStoreInventory);

            expect(isValid).toBeTruthy();
            expect(errors.length).toEqual(0);
        });

        it('should validate type for max', () => {
            const bookStoreInventory = {
                books: 'sasa',
            };

            const [isValid, errors] = validator.validateType(bookStoreInventory, BookStoreInventory);

            expect(isValid).toBeFalsy();
            expect(errors.length).toEqual(1);
            expect(errors[0].property).toEqual('books');
        });
    });
});
