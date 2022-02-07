import { Predicate, ValidationExchange, ValidationMetadata, ValidationOutput } from '../interfaces';

export class GenericConstraintChecker {
    static check = <T>(expectedType: string, predicate: Predicate<ValidationMetadata<T>>, exchange: ValidationExchange<T>): ValidationOutput => {
        const value = exchange.target[exchange.key];
        const type = typeof value;

        if (type !== expectedType) {
            const message = exchange.typeMessage.supplant({ property: exchange.key, type: expectedType, currentType: type });
            return {
                isValid: false,
                message,
            };
        }

        const metadata: ValidationMetadata<T> = {
            value,
            constraint: exchange.constraint,
        };

        if (predicate(metadata)) {
            return {
                isValid: true,
            };
        }

        const message = exchange.message.supplant({ property: exchange.key, constraint: exchange.constraint });
        return {
            isValid: false,
            message,
        };
    };
}
