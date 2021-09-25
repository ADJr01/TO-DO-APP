import React, {Fragment, useState} from "react";
import ReactDOM from "react-dom";
import styles from '../Style/Fragment.module.css'
import {MdDone} from 'react-icons/all'

const ItemFragment = propsItemView => {
    const [edit_text, setEditText] = useState(propsItemView.event.src.text_src ||'');
    const [iseditAssigned,setIsEditAssigned] = useState(false);
    const [current_text, setCurrentText] = useState('');
    const updateCurrentText = e => {
        setCurrentText(e.nativeEvent.target.value);
    }

    const onEditData = ()=>{
        const edited_data = {...propsItemView.event,new_text_src:edit_text}
        propsItemView.onEditData(edited_data)
        setIsEditAssigned(false);
        setEditText('');
    }


    const onBackDropOrDone = () => {
        propsItemView.onInputChange({type: 0, src: current_text});
        setCurrentText('');
    }


    const back_drop = <div className={styles.overLay} onClick={onBackDropOrDone}/>;
    if (propsItemView.event.type === 0) {
        return ''
    } else if (propsItemView.event.type === 1) {
        return ReactDOM.createPortal(<Fragment>
            {back_drop}
            <div className={`${styles.fragment}  container-md`}>
                <MdDone className={styles.editable_nav_icon} onClick={onBackDropOrDone}/>
                <textarea className={styles.editable} onChange={updateCurrentText}/>
            </div>


        </Fragment>, document.getElementById('portal'));

    } else if (propsItemView.event.type === 2) {
        if(edit_text === '' && !iseditAssigned){
            setEditText(propsItemView.event.src.text_src)
            setIsEditAssigned(true)
        }
        const handleEditChange = e => {
            setEditText(e.nativeEvent.target.value)

        }
        return ReactDOM.createPortal(<Fragment>
            <div className={styles.overLay} onClick={onEditData}/>
            <div className={`${styles.fragment}  container-md`}>
                <MdDone className={styles.editable_nav_icon} onClick={onEditData} />
                <textarea className={styles.editable} value={edit_text}
                          onChange={handleEditChange}/>
            </div>


        </Fragment>, document.getElementById('portal'));
    }
}

export default ItemFragment;

