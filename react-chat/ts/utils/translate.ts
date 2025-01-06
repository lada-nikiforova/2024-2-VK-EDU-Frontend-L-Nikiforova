import { TranslateResponse, TranslateOptions } from './types';

const API_URL = 'https://api.mymemory.translated.net/get';
const cache = new Map<string, string>();

function buildCacheKey({ text, from, to }: TranslateOptions): string {
    return `${from || 'auto'}-${to}-${text}`;
}

async function fetchTranslation(options: TranslateOptions): Promise<string> {
    const { text, from, to } = options;
    const url = `${API_URL}?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
    }

    const data: TranslateResponse = await response.json();
    if (data.responseStatus !== 200) {
        throw new Error(`API error: ${data.error || 'Unknown error'}`);
    }

    return data.responseData.translatedText;
}

export async function translate(options: TranslateOptions): Promise<string> {
    const cacheKey = buildCacheKey(options);

    if (cache.has(cacheKey)) {
        return cache.get(cacheKey)!;
    }

    try {
        const translatedText = await fetchTranslation(options);
        cache.set(cacheKey, translatedText);
        console.log(translatedText);
        return translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        throw error;
    }
}
