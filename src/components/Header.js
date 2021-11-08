import '../index.css';
import SM_logo from '../SM_logo.png';


export default function Header(){
    return(
    <div className="header">
        <img src={SM_logo} alt="logo" className='imgheader'/>
    </div>
    );
}

