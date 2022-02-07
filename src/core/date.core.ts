import { Predicate, ValidationExchange, ValidationMetadata, ValidationOutput, ValidationRule } from '../interfaces';
import { GenericConstraintChecker } from './constraint.checker';

export class AgeLimitValidationRule implements ValidationRule<Date> {
    static instance = new AgeLimitValidationRule();

    isValid(exchange: ValidationExchange<Date>): ValidationOutput {
        const predicate: Predicate<ValidationMetadata<Date>> = (metadata: ValidationMetadata<Date>): boolean => {
            const month = metadata.value.getMonth();
            const year = metadata.value.getFullYear();

            const now = new Date();
            const currentYear = now.getFullYear();
            const currentMonth = now.getMonth();

            const years = currentYear - year;
            return (years > 0 && years < 100) || (currentMonth > month && years >= 100);
        };

        return GenericConstraintChecker.check('object', predicate, exchange);
    }
}
