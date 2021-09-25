import style from '../Style/app.module.css'
import ViewItems from "./ViewItems";

const ViewContainer = propsContainer => {
    const forNoteView = (src) => {
        propsContainer.onUserClick({type: 2, src: src})
    }

    const data_len = propsContainer.data_src.length;
    const main_data = propsContainer.data_src;
    const jsxItems = propsContainer.is_search_stat ? (data_len > 0  ? main_data.map((e, i) => propsContainer.to_show[i]===true &&
            <ViewItems key={i}
                       ind={i}
                       text={e}
                       onDataChange={forNoteView}
                       onDelReq={propsContainer.onDelReq}/>) :
        <h3>Nothing To Show</h3>) : (data_len > 0 ? main_data.map((e, i) => <ViewItems key={i}
                                                                                       ind={i}
                                                                                       text={e}
                                                                                       onDataChange={forNoteView}
                                                                                       onDelReq={propsContainer.onDelReq}/>) :
        <h3>Nothing To Show</h3>)

    return (
        <ul className={`${style['to-do-items']}`}>
            {jsxItems}
        </ul>

    );


}

export default ViewContainer;