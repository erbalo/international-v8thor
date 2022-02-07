import esMessages from './messages/es';
import enMessages from './messages/en';
import ptMessages from './messages/pt';
import { LocaleLoaderError } from '../errors';
import CacheStrategy from '../commons/cache.strategy';
import getLogger from '../commons/logger';

const Logger = getLogger(module);

const availableLanguages = ['en', 'es', 'pt'];

let es = null,
    en = null,
    pt = null;

if (!es) {
    es = esMessages;
}

if (!en) {
    en = enMessages;
}

if (!pt) {
    pt = ptMessages;
}

let messages = null;

if (!messages) {
    messages = {
        es,
        en,
        pt,
    };
}

const searchValidLocale = (locale: string): number => {
    return availableLanguages.indexOf(locale);
};

const loadMessages = (locale: string): { [key: string]: string } => {
    locale = locale.toLowerCase();
    const locales: string[] = locale.split(/-|_/) || [];

    if (locales.length < 1) {
        throw new LocaleLoaderError(`${locale} is not a valid format for locale`);
    }

    let cacheKey = `non-messages-${locale}`;
    const language = locales[0];
    const indexLocale = searchValidLocale(locale);
    const indexLanguage = searchValidLocale(language);

    if (indexLocale > -1) {
        cacheKey = `messages-${locale}`;
    } else if (indexLanguage > -1) {
        cacheKey = `messages-${language}`;
    }

    const cachedMessages = CacheStrategy.get(cacheKey);
    if (cachedMessages) {
        return cachedMessages;
    }

    if (indexLocale > -1) {
        CacheStrategy.put(cacheKey, messages[locale]);
        return messages[locale] || {};
    } else if (indexLanguage > -1) {
        Logger.warn(`Locale [${locale}] not recognized, trying to get the language [${language}]`);
        CacheStrategy.put(cacheKey, messages[language]);
        return messages[language] || {};
    }

    throw new LocaleLoaderError(`Language ${locale} is not supported. Choose one from available languages: ${availableLanguages}`);
};

const addMessages = (locale: string, bundle: { [key: string]: string }) => {
    locale = locale.toLowerCase();
    const index = availableLanguages.indexOf(locale);
    if (index > -1) {
        availableLanguages.splice(index, 1, locale);
    } else {
        availableLanguages.push(locale);
    }

    messages[locale] = bundle;
};

declare global {
    interface String {
        supplant(o: object): string;
    }
}

String.prototype.supplant = function (o: object) {
    return this.replace(/{([^{}]*)}/g, function (a, b) {
        const r = o[b];
        return typeof r === 'string' || typeof r === 'number' ? r : a;
    });
};

export { addMessages, loadMessages };
