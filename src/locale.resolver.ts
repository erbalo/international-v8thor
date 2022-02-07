import loadMessages from './bundle';

class LocaleResolver {
    constructor(private defaultLocale: string = 'en') {}

    getMessages = (locale: string = this.defaultLocale): { [key: string]: string } => {
        return loadMessages(locale);
    };

    getDefaultLocale = (): string => {
        return this.defaultLocale;
    };
}

export default LocaleResolver;
