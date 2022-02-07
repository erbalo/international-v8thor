import { buildRuleOptions } from '../utils';
import { addValidationRule, EmailValidationRule, MatchesValidationRule, NotEmptyValidationRule } from '../core';
import { DecoratorProperty, ValidationRuleOptions } from '../interfaces';
import { StringPropertyDecorator } from './properties';

export const Email = (properties?: DecoratorProperty): StringPropertyDecorator => {
    return function (target: unknown, key: string) {
        const rule = EmailValidationRule.instance;
        const ruleOptions: ValidationRuleOptions<string> = buildRuleOptions(rule, 'email', null, properties);
        addValidationRule(target, key, ruleOptions);
    };
};

export const NotEmpty = (properties?: DecoratorProperty): StringPropertyDecorator => {
    return function (target: unknown, key: string) {
        const rule = NotEmptyValidationRule.instance;
        const ruleOptions: ValidationRuleOptions<string> = buildRuleOptions(rule, 'notEmpty', null, properties);
        addValidationRule(target, key, ruleOptions);
    };
};

export const Matches = (regex: string, properties?: DecoratorProperty): StringPropertyDecorator => {
    return function (target: unknown, key: string) {
        const rule = MatchesValidationRule.instance;
        const ruleOptions: ValidationRuleOptions<string> = buildRuleOptions(rule, 'match', regex, properties);
        addValidationRule(target, key, ruleOptions);
    };
};
