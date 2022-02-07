import { ValidationExchange, ValidationOutput, ValidationRule } from '../interfaces';

export class RequiredValidationRule implements ValidationRule<object> {
    static instance = new RequiredValidationRule();

    isValid(exchange: ValidationExchange<object>): ValidationOutput {
        const value = exchange.target[exchange.key];

        if (typeof value !== 'undefined' && value != null && value != undefined) {
            return {
                isValid: true,
            };
        }

        const message = exchange.message.supplant({ property: exchange.key }) || '';
        return {
            isValid: false,
            message,
        };
    }
}
