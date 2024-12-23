import { useState } from "react";
import TranslatorInput from "../../components/TranslatorInput/TranslatorInput";
import TranslatorOutput from "../../components/TranslatorOutput/TranslatotOutput";
import './MainPage.scss';
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import { translate } from "../../utils/translate";
export const MainPage: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLang, setSourceLang] = useState('ru-RU');
    const [targetLang, setTargetLang] = useState('en-GB');
    const [error, setError] = useState<string | null>(null); 
  
    const handleTranslate = async () => {
        if (!inputText || !targetLang) {
          setError('Введите текст и выберите язык перевода.');
          return;
        }
        setError(null);
        setTranslatedText('');
    
        try {
          const translated = await translate({
            text: inputText,
            from: sourceLang,
            to: targetLang,
            autoDetect: !sourceLang, 
          });
          setTranslatedText(translated);
        } catch (err) {
          setError('Ошибка перевода. Попробуйте позже.');
          console.error('Translation error:', err);
        } 
      };
  
    return (
      <div className="main-page">
        <h1>VK Translate</h1>
        <div className="container-input">
            <div className="container-form">
                <LanguageSelector sourceLang={sourceLang} onChangeSourceLang={setSourceLang}/>
                <TranslatorInput onTranslate={handleTranslate} value={inputText} onChange={setInputText}/>
            </div>
            <div>
                <LanguageSelector sourceLang={targetLang} onChangeSourceLang={setTargetLang} showAutodetect={false} />
                <TranslatorOutput translatedText={translatedText}/>
            </div>
            {error && <p className="error">{error}</p>}
        </div>
      </div>
    );
  };