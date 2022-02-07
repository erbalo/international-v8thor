import { Predicate, ValidationExchange, ValidationMetadata, ValidationOutput, ValidationRule } from '../interfaces';
import { GenericConstraintChecker } from './constraint.checker';

export class MinValidationRule implements ValidationRule<number> {
    static instance = new MinValidationRule();

    isValid(exchange: ValidationExchange<number>): ValidationOutput {
        const predicate: Predicate<ValidationMetadata<number>> = (metadata: ValidationMetadata<number>) => {
            return metadata.value >= metadata.constraint;
        };

        return GenericConstraintChecker.check('number', predicate, exchange);
    }
}

export class MaxValidationRule implements ValidationRule<number> {
    static instance = new MaxValidationRule();

    isValid(exchange: ValidationExchange<number>): ValidationOutput {
        const predicate: Predicate<ValidationMetadata<number>> = (metadata: ValidationMetadata<number>) => {
            return metadata.value <= metadata.constraint;
        };

        return GenericConstraintChecker.check('number', predicate, exchange);
    }
}
