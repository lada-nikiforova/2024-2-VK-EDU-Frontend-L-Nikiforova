import "./index.scss"
import Auth from "../../components/Auth/Auth";
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from "../../api/apiUser";



const PageAuth = ({onAuthSuccess}) => {
  const navigate = useNavigate();
  const handleAuthSuccess = async() => {
    onAuthSuccess(); 
    await getCurrentUser(); 
    navigate("/");    
  };
  return (
    <div id="chat-auth">
        <Auth onAuthSuccess={handleAuthSuccess}/>
    </div>
);
}

export default PageAuth;