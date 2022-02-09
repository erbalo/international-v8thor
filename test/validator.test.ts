import { LocaleLoaderError, NotSupportedError, ValidatorError } from '../src/errors';
import { Validator, Required } from '../src/index';

describe('Should validate functionality with locale', () => {
    describe('Should validate instance validator', () => {
        class BookStoreInventory {
            @Required()
            user_email?: string;
        }

        it('should build a validator with spanish locale', () => {
            const validator = new Validator('es');
            expect(validator).toBeInstanceOf(Validator);
        });

        it('should thrown an exception with null locale', () => {
            const execution = () => {
                const bookStoreInventory = new BookStoreInventory();
                bookStoreInventory.user_email = 'test';

                const validator = new Validator(null);
                validator.validate(bookStoreInventory);
            };

            expect(execution).toThrow(LocaleLoaderError);
        });

        it('should thrown an exception with bad locale', () => {
            const execution = () => {
                const bookStoreInventory = new BookStoreInventory();
                bookStoreInventory.user_email = 'test';

                const validator = new Validator('n');
                validator.validate(bookStoreInventory);
            };

            expect(execution).toThrow(LocaleLoaderError);
        });

        it('should thrown an exception with null target', () => {
            const execution = () => {
                const validator = new Validator();
                validator.validate(null);
            };

            expect(execution).toThrow(ValidatorError);
        });

        it('should thrown an exception with object target', () => {
            const execution = () => {
                const validator = new Validator();
                validator.validate({});
            };

            expect(execution).toThrow(NotSupportedError);
        });

        it('should thrown an exception with target as null and valid model', () => {
            const execution = () => {
                const validator = new Validator();
                validator.validateType(null, BookStoreInventory);
            };

            expect(execution).toThrow(ValidatorError);
        });

        it('should thrown an exception with target as null and model type as null', () => {
            const execution = () => {
                const bookStoreInventory = new BookStoreInventory();
                bookStoreInventory.user_email = 'test';

                const validator = new Validator();
                validator.validateType(bookStoreInventory, null);
            };

            expect(execution).toThrow(ValidatorError);
        });
    });
});
