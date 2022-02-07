import { buildRuleOptions } from '../utils';
import { addValidationRule, RequiredValidationRule } from '../core';
import { DecoratorProperty, ValidationRuleOptions } from '../interfaces';
import { ObjectProperyDecorator } from './properties';

export function Required(properties?: DecoratorProperty): ObjectProperyDecorator {
    return function (target: unknown, key: string) {
        const rule = RequiredValidationRule.instance;
        const ruleOptions: ValidationRuleOptions<object> = buildRuleOptions(rule, 'required', null, properties);
        addValidationRule(target, key, ruleOptions);
    };
}
