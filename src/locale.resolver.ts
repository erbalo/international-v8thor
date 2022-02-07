import { addMessages, loadMessages } from './bundle';

class LocaleResolver {
    private defaultLocale: string;

    constructor(defaultLocale = 'en') {
        this.defaultLocale = defaultLocale.toLowerCase();
    }

    addBundle = (locale: string, bundle: { [key: string]: string }) => {
        addMessages(locale, bundle);
    };

    getMessages = (locale: string = this.defaultLocale): { [key: string]: string } => {
        loadMessages(this.defaultLocale); // to load in cache
        return loadMessages(locale);
    };

    getDefaultLocale = (): string => {
        return this.defaultLocale;
    };
}

export default LocaleResolver;
