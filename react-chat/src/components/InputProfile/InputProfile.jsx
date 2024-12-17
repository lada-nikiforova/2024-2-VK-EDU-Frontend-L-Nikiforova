import './InputProfile.scss';


const InputProfile = (props) => {
    return (
        <div className={`container-input ${props.error ? 'error' : ''}`}>
            <label for={props.name}>{props.textInput}</label>
            <input className ='input-profile' id={props.name} maxLength={150} name={props.name} placeholder={props.placeholder} type="text" value={props.value} onChange={props.onChange} autoComplete="off"/>
            {props.error && <p className="error-text">{props.errorMessage}</p>}
        </div>
    );
}
export default InputProfile;