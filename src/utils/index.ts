import { DecoratorProperty, ValidationRule, ValidationRuleOptions } from '../interfaces';

const safeMessageKey = (defaultKey: string, decorator?: DecoratorProperty) => {
    let messageKey = defaultKey;
    if (decorator && decorator.messageKey) {
        messageKey = decorator.messageKey;
    }

    return messageKey;
};

const safeMessage = (decorator?: DecoratorProperty) => {
    let message = '';
    if (decorator && decorator.message) {
        message = decorator.message;
    }

    return message;
};

const safeDecoratorProperties = (defaultDecoratorKey: string, decorator?: DecoratorProperty): DecoratorProperty => {
    const message = safeMessage(decorator);
    const messageKey = safeMessageKey(defaultDecoratorKey, decorator);

    return {
        message,
        messageKey,
    };
};

const buildRuleOptions = <T>(rule: ValidationRule<T>, defaultDecoratorKey: string, value: T = null, properties?: DecoratorProperty): ValidationRuleOptions<T> => {
    const safeProperties = safeDecoratorProperties(defaultDecoratorKey, properties);
    return {
        constraint: value,
        messageKey: safeProperties.messageKey,
        message: safeProperties.message,
        rule,
    };
};

export { safeMessage, safeMessageKey, safeDecoratorProperties, buildRuleOptions };
