// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;
type BaseObject = unknown;

type ObjectProperyDecorator = <T extends object & PartialRecord<K, BaseObject>, K extends string>(target: T, key: K) => void;
type NumberPropertyDecorator = <T extends object & PartialRecord<K, number>, K extends string>(target: T, key: K) => void;
type StringPropertyDecorator = <T extends object & PartialRecord<K, string>, K extends string>(target: T, key: K) => void;
type DatePropertyDecorator = <T extends object & PartialRecord<K, Date>, K extends string>(target: T, key: K) => void;

export { ObjectProperyDecorator, NumberPropertyDecorator, StringPropertyDecorator, DatePropertyDecorator };
