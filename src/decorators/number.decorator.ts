import { buildRuleOptions } from '../utils';
import { addValidationRule, MaxValidationRule, MinValidationRule } from '../core';
import { DecoratorProperty, ValidationRuleOptions } from '../interfaces';
import { NumberPropertyDecorator } from './properties';

export const Min = (value: number, properties?: DecoratorProperty): NumberPropertyDecorator => {
    return function (target: unknown, key: string) {
        const rule = MinValidationRule.instance;
        const ruleOptions: ValidationRuleOptions<number> = buildRuleOptions(rule, 'min', value, properties);
        addValidationRule(target, key, ruleOptions);
    };
};

export const Max = (value: number, properties?: DecoratorProperty): NumberPropertyDecorator => {
    return (target: unknown, key: string) => {
        const rule = MaxValidationRule.instance;
        const ruleOptions: ValidationRuleOptions<number> = buildRuleOptions(rule, 'max', value, properties);
        addValidationRule(target, key, ruleOptions);
    };
};
