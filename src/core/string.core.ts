import { Predicate, ValidationExchange, ValidationMetadata, ValidationOutput, ValidationRule } from '../interfaces';
import { GenericConstraintChecker } from './constraint.checker';

/**
 * Allows
 * 1.  prettyandsimple@example.com
 * 2.  very.common@example.com
 * 3.  disposable.style.email.with+symbol@example.com
 * 4.  other.email-with-dash@example.com
 * 5.  #!$%&'*+-/=?^_`{}|~@example.org
 * 6.  "()[]:,;@\\\"!#$%&'*+-/=?^_`{}| ~.a"@example.org
 * 7.  " "@example.org (space between the quotes)
 * 8.  üñîçøðé@example.com (Unicode characters in local part)
 * 9.  üñîçøðé@üñîçøðé.com (Unicode characters in domain part)
 * 10. Pelé@example.com (Latin)
 * 11. δοκιμή@παράδειγμα.δοκιμή (Greek)
 * 12. 我買@屋企.香港 (Chinese)
 * 13. 甲斐@黒川.日本 (Japanese)
 * 14. чебурашка@ящик-с-апельсинами.рф (Cyrillic)
 */
export class EmailValidationRule implements ValidationRule<string> {
    static instance = new EmailValidationRule();

    isValid(exchange: ValidationExchange<string>): ValidationOutput {
        const predicate: Predicate<ValidationMetadata<string>> = (metadata: ValidationMetadata<string>) => {
            const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
            return re.test(metadata.value);
        };

        return GenericConstraintChecker.check('string', predicate, exchange);
    }
}

export class NotEmptyValidationRule implements ValidationRule<string> {
    static instance = new NotEmptyValidationRule();

    isValid(exchange: ValidationExchange<string>): ValidationOutput {
        const predicate: Predicate<ValidationMetadata<string>> = (metadata: ValidationMetadata<string>) => {
            const re = /^\s*$/g;
            return !re.test(metadata.value);
        };

        return GenericConstraintChecker.check('string', predicate, exchange);
    }
}

export class MatchesValidationRule implements ValidationRule<string> {
    static instance = new MatchesValidationRule();

    isValid(exchange: ValidationExchange<string>): ValidationOutput {
        const predicate: Predicate<ValidationMetadata<string>> = (metadata: ValidationMetadata<string>) => {
            const re = new RegExp(metadata.constraint, 'g');
            return re.test(metadata.value);
        };

        return GenericConstraintChecker.check('string', predicate, exchange);
    }
}
