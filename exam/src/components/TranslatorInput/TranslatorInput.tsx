import './TranslatorInput.scss'

interface TranslatorInputProps {
    value: string;
    onChange: (text: string) => void;
    onTranslate: () => void;
}

export const TranslatorInput: React.FC<TranslatorInputProps> = ({ value, onChange, onTranslate }) => {
  return (
    <div>
        <form className="form" onSubmit={(e)=>{ e.preventDefault(); onTranslate}}>
            <textarea className='input-form' value={value}  onChange={(e) => onChange(e.target.value)} placeholder="Введите текст для перевода" onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault(); 
                        onTranslate(); 
                    }
                }}/>                                  
        </form>
    </div>
  );
};

export default TranslatorInput;