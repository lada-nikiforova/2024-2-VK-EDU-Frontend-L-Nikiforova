export interface TranslateResponse {
    responseData: {
        translatedText: string;
    };
    matches: Array<{ translation: string }>;
    responseStatus: number;
    error?: string;
}

export interface TranslateOptions {
    text: string;
    from?: string; 
    to: string;
    autoDetect?: boolean;
}
