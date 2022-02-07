import 'reflect-metadata';
import { ValidationRuleOptions } from '../interfaces';

export const addValidationRule = <C>(target: unknown, key: string, ruleOptions: ValidationRuleOptions<C>) => {
    const rules: ValidationRuleOptions<C>[] = Reflect.getMetadata('validation', target, key) || [];
    rules.push(ruleOptions);

    const properties: string[] = Reflect.getMetadata('validation', target) || [];
    const found = properties.find(property => property == key);

    if (!found) {
        properties.push(key);
    }

    Reflect.defineMetadata('validation', properties, target);
    Reflect.defineMetadata('validation', rules, target, key);
};

export * from './generic.core';
export * from './number.core';
export * from './string.core';
export * from './date.core';
export * from './constraint.checker';
