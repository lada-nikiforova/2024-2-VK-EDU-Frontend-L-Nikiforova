import EditIcon from '@mui/icons-material/Edit';
import './EditButton.scss';

const EditButton = ({ onClick }) => {
    
    return (
        <button className="edit-button icon-button" onClick={onClick}>
            <EditIcon sx={{ fontSize: 40 }} className="icon" />
        </button>
    );
};

export default EditButton;