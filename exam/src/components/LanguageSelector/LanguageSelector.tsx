import languages from '../../assets/languages.json';

interface LanguageSelectorProps {
    sourceLang: string;
    onChangeSourceLang: (lang: string) => void;
    showAutodetect?: boolean;
  }
  
  export const LanguageSelector: React.FC<LanguageSelectorProps> = ({sourceLang, onChangeSourceLang, showAutodetect = true}) => {
    const languageEntries = Object.entries(languages).filter(([code]) => showAutodetect || code !== 'Autodetect');
    return (
      <div className="language-selector">
        <select value={sourceLang} onChange={(e) => onChangeSourceLang(e.target.value)}>
          {languageEntries.map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
        
      </div>
    );
  };

  export default LanguageSelector;