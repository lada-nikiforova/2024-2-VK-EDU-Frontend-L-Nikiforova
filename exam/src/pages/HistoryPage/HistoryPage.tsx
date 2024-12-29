import { useState } from 'react';
import languages from '../../assets/languages.json';
import './HistoryPage.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
const languageMap: Record<string, string> = languages;
interface TranslationHistory {
    from: string;
    to: string;
    text: string;
    translate: string;
}
export const HistoryPage: React.FC = () => {
    const [load, setLoad] = useState<TranslationHistory[]>(() => {
        const historyString = localStorage.getItem("history");
        return historyString ? JSON.parse(historyString) : [];
    });
    
    const handleTranslate = () => {
        localStorage.removeItem("history"); 
        setLoad([]); 
    };
    return (
      <div className="history-page">
        <div className="container-header">
          <Link to={"/"} className="back-link">
              <ArrowBackIcon sx={{ fontSize: 30}} className="icon" />
          </Link>
          <h1>История переводов</h1>
        </div>
        
        <div className='button-container'>
            <button onClick={handleTranslate} className='button-clean'>Очистить историю</button>
        </div>
        <div className='list'>
            {load?.map(obj=>(
                <div className='container-translate'>
                    <div className="language">{`${languageMap[obj.from]} → ${languageMap[obj.to]}`}</div>
                    <div className="text">{obj.text}</div>
                    <div className="translate">{obj.translate}</div>
            </div>))}
        </div>
        
      </div>
    );
  };