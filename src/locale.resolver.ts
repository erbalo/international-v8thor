import { addMessages, loadMessages } from './bundle';
import { LocaleLoaderError } from './errors';

class LocaleResolver {
    private defaultLocale: string;

    constructor(defaultLocale = 'en') {
        if (!defaultLocale) {
            throw new LocaleLoaderError('Locale should not be null');
        }
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
