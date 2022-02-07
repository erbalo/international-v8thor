import { buildRuleOptions } from '../utils';
import { addValidationRule, AgeLimitValidationRule } from '../core';
import { DecoratorProperty, ValidationRuleOptions } from '../interfaces';
import { DatePropertyDecorator } from './properties';

export const AgeLimit = (properties?: DecoratorProperty): DatePropertyDecorator => {
    return function (target: unknown, key: string) {
        const rule = AgeLimitValidationRule.instance;
        const ruleOptions: ValidationRuleOptions<Date> = buildRuleOptions(rule, 'ageLimit', null, properties);
        addValidationRule(target, key, ruleOptions);
    };
};
