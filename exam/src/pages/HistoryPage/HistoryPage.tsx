import languages from '../../assets/languages.json';
import './HistoryPage.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
const languageMap: Record<string, string> = languages;
export const HistoryPage: React.FC = () => {
    const historyString = localStorage.getItem('history');
    const load: any[] = historyString ? JSON.parse(historyString) : [];
    console.log(load)
    const handleTranslate =  () => {
        localStorage.removeItem('history');
    }
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