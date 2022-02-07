import 'reflect-metadata';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { ErrorResult, ValidationExchange, ValidationRuleOptions } from './interfaces';
import { NotSupportedError, ValidatorError } from './errors';
import LocaleResolver from './locale.resolver';
import CacheStrategy from './commons/cache.strategy';

export class Validator extends LocaleResolver {
    constructor(defaultLocale?: string) {
        super(defaultLocale);
    }

    private searchMessage = (messageKey: string, locale?: string): string => {
        if (!locale) {
            locale = this.getDefaultLocale();
        }
        const cacheKey = `${messageKey}-${locale}`;

        let message = CacheStrategy.get(cacheKey);

        if (message) {
            return message;
        }

        const messages = this.getMessages(locale);
        message = messages[messageKey];

        if (message) {
            CacheStrategy.put(cacheKey, message);
            return message;
        }

        throw new ValidatorError(`[${messageKey}] key not exists in message definition for locale [${this.getDefaultLocale()}]`);
    };

    private compute = <T, C>(target: T, locale?: string): ErrorResult[] => {
        const properties = Reflect.getMetadata('validation', target) as string[];
        const errorMessages: ErrorResult[] = [];

        if (Array.isArray(properties)) {
            for (const property of properties) {
                const ruleOptions = Reflect.getMetadata('validation', target, property) as ValidationRuleOptions<C>[];

                if (!Array.isArray(ruleOptions)) {
                    continue;
                }

                const error: ErrorResult = {
                    property,
                    messages: [],
                };

                for (const ruleOption of ruleOptions) {
                    const exchange: ValidationExchange<C> = {
                        key: property,
                        target: target,
                        typeMessage: this.searchMessage('type', locale),
                        message: ruleOption.message,
                        messageKey: ruleOption.messageKey,
                        constraint: ruleOption.constraint,
                    };

                    if (!exchange.message) {
                        exchange.message = this.searchMessage(exchange.messageKey, locale);
                    }

                    const output = ruleOption.rule.isValid(exchange);
                    if (output && !output.isValid) {
                        error.messages.push(output.message);
                        break;
                    }
                }

                errorMessages.push(error);
            }
        }

        return errorMessages.filter(error => error.messages.length != 0);
    };

    validate = <T>(target: T, locale?: string): [boolean, ErrorResult[]] => {
        if (!target) {
            throw new ValidatorError('Target should not be null');
        }

        if (!target.constructor && !target.constructor.name) {
            throw new ValidatorError('Target is not identified as object');
        }

        if (target.constructor.name === 'Object') {
            throw new NotSupportedError('This method does not support an object as target, you can use validateType(obj, Class)');
        }

        const errors = this.compute(target, locale);

        if (errors.length > 0) {
            return [false, errors];
        }

        return [true, []];
    };

    validateType = <T>(obj: object, model: ClassConstructor<T>, locale?: string): [boolean, ErrorResult[]] => {
        if (!obj) {
            throw new ValidatorError('obj should not be null');
        }

        if (!model) {
            throw new ValidatorError('model should not be null');
        }

        const res = plainToClass(model, obj, { enableImplicitConversion: false });
        return this.validate(res, locale);
    };
}
