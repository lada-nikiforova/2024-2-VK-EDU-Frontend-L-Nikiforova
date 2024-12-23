import './TranslatorOutput.scss'
interface TranslatorOutputProps {
  translatedText: string;
}

export const TranslatorOutput: React.FC<TranslatorOutputProps> = ({ translatedText }) => (
    <form className="form" >
        <textarea className='input-form' disabled value={translatedText || 'Текст перевода появится здесь'} />                                  
    </form>
);

export default TranslatorOutput;