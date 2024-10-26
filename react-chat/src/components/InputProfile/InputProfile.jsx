import {useState, useEffect} from 'react';
import './InputProfile.scss';


const InputProfile = (props) => {
    return (
        <div className='container-input'>
            <label for={props.name}>{props.name}</label>
            <textarea id={props.name} name={props.name} rows={props.rows} cols='50' placeholder={props.placeholder} type="text" value={props.value} onChange={props.onChange} autoComplete="off" ></textarea>
        </div>
    );
}
export default InputProfile;