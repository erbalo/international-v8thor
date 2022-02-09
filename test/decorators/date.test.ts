import { Validator, AgeLimit } from '../../src/index';

describe('Should validate date constraints', () => {
    const validator = new Validator();

    describe('Should validate age limit decorator', () => {
        class Profile {
            @AgeLimit()
            birth_date: Date;
        }

        it('should validate an age limit error', () => {
            const profile = new Profile();
            profile.birth_date = new Date('1900-08-28');

            const [isValid, errors] = validator.validate(profile);

            expect(isValid).toBeFalsy();
            expect(errors.length).toEqual(1);
            expect(errors[0].property).toEqual('birth_date');
        });

        it('should pass an age limit declaration', () => {
            const profile = new Profile();
            profile.birth_date = new Date('2000-08-28');

            const [isValid, errors] = validator.validate(profile);

            expect(isValid).toBeTruthy();
            expect(errors.length).toEqual(0);
        });

        it('should validate type for age limit', () => {
            const profile = {
                birth_date: false,
            };

            const [isValid, errors] = validator.validateType(profile, Profile);

            expect(isValid).toBeFalsy();
            expect(errors.length).toEqual(1);
            expect(errors[0].property).toEqual('birth_date');
        });
    });
});
