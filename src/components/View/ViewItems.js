
import style from '../Style/app.module.css'
import {RiDeleteBin6Line} from 'react-icons/all'



const ViewItems = propsItems=>{
    const item_src = {
        text_src : propsItems.text,
        text_index : propsItems.ind

    }
    const deleteThis = ()=>{
        propsItems.onDelReq(propsItems.ind)
    }

    const pass_Data = ()=>{
        propsItems.onDataChange(item_src);
    }

    let text = '';
    if(propsItems.text.length>40){
        text = propsItems.text.split('').slice(0,37).join('') + ' ...'
    }else{
        text = propsItems.text
    }


    return <div className={`${style.item}`}>
        <h3 onClick={pass_Data}> {text.trim()}</h3> <RiDeleteBin6Line onClick={deleteThis} className = {style.IMG_DEl} />

    </div>

}

export  default ViewItems;