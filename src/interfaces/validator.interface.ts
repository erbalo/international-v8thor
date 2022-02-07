export interface ValidationMetadata<T> {
    value: T;
    constraint: T;
}

export interface ValidationRuleOptions<C> {
    constraint: C;
    message?: string;
    messageKey: string;
    rule: ValidationRule<C>;
}

export interface ValidationExchange<C> {
    target: unknown;
    key: string;
    constraint: C;
    typeMessage: string;
    message?: string;
    messageKey: string;
}

export interface ValidationOutput {
    isValid: boolean;
    message?: string;
}

export interface ValidationRule<C> {
    isValid(exchange: ValidationExchange<C>): ValidationOutput;
}

export interface ErrorResult {
    property: string;
    messages: string[];
}
