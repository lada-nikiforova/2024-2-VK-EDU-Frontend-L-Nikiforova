import { useState } from "react";
import TranslatorInput from "../../components/TranslatorInput/TranslatorInput";
import TranslatorOutput from "../../components/TranslatorOutput/TranslatotOutput";
import './MainPage.scss';
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import { translate } from "../../utils/translate";
import HistoryIcon from '@mui/icons-material/History';
import { Link } from 'react-router-dom';
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
          const data = {from:sourceLang, to:targetLang, text:inputText, translate: translated};
          const historyString = localStorage.getItem('history');
          const load: any[] = historyString ? JSON.parse(historyString) : [];
          const updatedHistory = [...load, data];
          localStorage.setItem('history', JSON.stringify(updatedHistory))
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
        <div className="icon-container">
          <Link to={"/history"} className="history-link">
            <div className="history-circle">
              <HistoryIcon sx={{ fontSize: 40 }} className="icon" />
            </div>
                <p className="history-text">История</p>
          </Link>
        </div>
      </div> 
    );
  };