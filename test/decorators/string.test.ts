import { Validator, Email, NotEmpty, Matches } from '../../src/index';

describe('Should validate string constraints', () => {
    const validator = new Validator();

    describe('Should validate email decorator', () => {
        class BookStoreInventory {
            @Email()
            user_email: string;
        }

        it('should validate an email error', () => {
            const bookStoreInventory = new BookStoreInventory();
            bookStoreInventory.user_email = 'ton.stark@avengers';

            const [isValid, errors] = validator.validate(bookStoreInventory);

            expect(isValid).toBeFalsy();
            expect(errors.length).toEqual(1);
            expect(errors[0].property).toEqual('user_email');
        });

        it('should pass an email declaration', () => {
            const bookStoreInventory = new BookStoreInventory();
            bookStoreInventory.user_email = 'tony.stark@avengers.com';

            const [isValid, errors] = validator.validate(bookStoreInventory);

            expect(isValid).toBeTruthy();
            expect(errors.length).toEqual(0);
        });

        it('should validate type for email', () => {
            const bookStoreInventory = {
                user_email: false,
            };

            const [isValid, errors] = validator.validateType(bookStoreInventory, BookStoreInventory);

            expect(isValid).toBeFalsy();
            expect(errors.length).toEqual(1);
            expect(errors[0].property).toEqual('user_email');
        });
    });

    describe('Should validate not empty decorator', () => {
        class BookStoreInventory {
            @NotEmpty()
            user_email: string;
        }

        it('should validate a not empty error', () => {
            const bookStoreInventory = new BookStoreInventory();
            bookStoreInventory.user_email = '          ';

            const [isValid, errors] = validator.validate(bookStoreInventory);

            expect(isValid).toBeFalsy();
            expect(errors.length).toEqual(1);
            expect(errors[0].property).toEqual('user_email');
        });

        it('should pass a not empty declaration', () => {
            const bookStoreInventory = new BookStoreInventory();
            bookStoreInventory.user_email = '            tony.stark@avengers.com    ';

            const [isValid, errors] = validator.validate(bookStoreInventory);

            expect(isValid).toBeTruthy();
            expect(errors.length).toEqual(0);
        });

        it('should validate type for not empty', () => {
            const bookStoreInventory = {
                user_email: false,
            };

            const [isValid, errors] = validator.validateType(bookStoreInventory, BookStoreInventory);

            expect(isValid).toBeFalsy();
            expect(errors.length).toEqual(1);
            expect(errors[0].property).toEqual('user_email');
        });
    });

    describe('Should validate matches decorator', () => {
        class BookStoreInventory {
            @Matches('^[a-z]+.?[a-z]+$')
            username: string;
        }

        it('should validate a match error', () => {
            const bookStoreInventory = new BookStoreInventory();
            bookStoreInventory.username = 'TONy.STarK';

            const [isValid, errors] = validator.validate(bookStoreInventory);

            expect(isValid).toBeFalsy();
            expect(errors.length).toEqual(1);
            expect(errors[0].property).toEqual('username');
        });

        it('should pass a match declaration', () => {
            const bookStoreInventory = new BookStoreInventory();
            bookStoreInventory.username = 'tony.stark';

            const [isValid, errors] = validator.validate(bookStoreInventory);

            expect(isValid).toBeTruthy();
            expect(errors.length).toEqual(0);
        });

        it('should validate type for matches', () => {
            const bookStoreInventory = {
                username: false,
            };

            const [isValid, errors] = validator.validateType(bookStoreInventory, BookStoreInventory);

            expect(isValid).toBeFalsy();
            expect(errors.length).toEqual(1);
            expect(errors[0].property).toEqual('username');
        });
    });
});
