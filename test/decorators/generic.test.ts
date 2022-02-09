import { Validator, Required } from '../../src/index';

describe('Should validate generic constraints', () => {
    const validator = new Validator();

    describe('Should validate required decorator', () => {
        class BookStoreInventory {
            @Required()
            user_email?: string;
        }

        it('should validate a required error', () => {
            const bookStoreInventory = new BookStoreInventory();

            const [isValid, errors] = validator.validate(bookStoreInventory);

            expect(isValid).toBeFalsy();
            expect(errors.length).toEqual(1);
            expect(errors[0].property).toEqual('user_email');
        });

        it('should pass a required declaration', () => {
            const bookStoreInventory = new BookStoreInventory();
            bookStoreInventory.user_email = 'tony.stark@avengers.com';

            const [isValid, errors] = validator.validate(bookStoreInventory);

            expect(isValid).toBeTruthy();
            expect(errors.length).toEqual(0);
        });
    });
});
