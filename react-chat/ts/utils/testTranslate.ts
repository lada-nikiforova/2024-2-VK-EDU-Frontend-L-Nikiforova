import TranslateUtils from './index';

async function testTranslate() {
    try {
        const translated = await TranslateUtils.translate({
            text: 'Cat',
            from: 'en',
            to: 'fr',
        }
        );
        console.log('Translated text:', translated);
    } catch (error) {
        console.error('Error during translation:', error);
    }
}

testTranslate();