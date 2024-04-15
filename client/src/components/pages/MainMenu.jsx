import "../../styles/pages/mainMenu.module.css"
import SearchInput from '../atoms/SearchInput/SearchInput';
import { Link } from "react-router-dom";


const MainMenu = () => {

  return (
    <>
    <SearchInput/>
  <Link to="/dashboard">Go to Dashboard</Link>
    </>
  );
}

export default MainMenu;
