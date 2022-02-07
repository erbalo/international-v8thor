import esMessages from './messages/es';
import enMessages from './messages/en';
import ptMessages from './messages/pt';
import { LocaleLoaderError } from '../errors';
import CacheStrategy from '../commons/cache.strategy';

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

const loadMessages = (locale: string): { [key: string]: string } => {
    const cacheKey = `messages-${locale}`;
    const cachedMessages = CacheStrategy.get(cacheKey);
    if (cachedMessages) {
        return cachedMessages;
    }

    const locales: string[] = locale.split(/-|_/) || [];

    if (locales.length < 1) {
        throw new LocaleLoaderError(`${locale} is not a valid format for locale`);
    }

    const language = locales[0];
    const index = availableLanguages.indexOf(locale);

    if (index > -1) {
        CacheStrategy.put(cacheKey, messages[language]);
        return messages[language] || {};
    }

    throw new LocaleLoaderError(`Language ${locales[0]} is not supported. Choose one from available languages: ${availableLanguages}`);
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

export default loadMessages;
