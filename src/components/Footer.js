import {IoIosAddCircleOutline} from 'react-icons/all'
import style from './Style/app.module.css'
const Footer = propsFooter =>{
    const forADD = ()=>{
        propsFooter.onUserClick({type:1,src:''})
    }
    return (
        <footer className={style.AppFooter}>
            <IoIosAddCircleOutline title='ADD New' onClick={forADD} className = {style.IMG_ADD}/>
        </footer>

    );
}

export default Footer;