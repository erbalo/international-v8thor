
# International v8thor

*Coverage*

![Statements](https://img.shields.io/badge/statements-93.33%25-brightgreen.svg?style=flat&logo=jest) ![Branches](https://img.shields.io/badge/branches-83.03%25-yellow.svg?style=flat&logo=jest) ![Functions](https://img.shields.io/badge/functions-92.85%25-brightgreen.svg?style=flat&logo=jest) ![Lines](https://img.shields.io/badge/lines-93.33%25-brightgreen.svg?style=flat&logo=jest)

The library have the intention to validate a class or an object using a locale for typescript

The inspiration comes from joi-i18n and class-validator-multi-lang, these libraries have the objective to tranform and
validate an object with a locale and the output message will be translated.

So, this library mix some other features like javax validation api:

1. Custom messages keys
2. Custom messages
3. Uses decorators (or annotations)
4. Default locales for provided decorators (english, spanish, portuguese)

## Supported decorators

| Decorator | Target type  | Description  |
| :---:   | :-: | :-: |
| `Required` | all objects | Indicates a mandatory field |
| `Min` | number | Acepts a min value field |
| `Max` | number | Acepts a max value field |
| `Email` | string | Validates an email field |
| `NotEmpty` | string | Validates an string including multiple blank spaces |
| `Matches` | string | Validates an string giving a regex |
| `AgeLimit` | date | Validates 0-100 years for age limit |


