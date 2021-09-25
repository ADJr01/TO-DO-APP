import React, {useEffect, useState} from "react";
import styles from './components/Style/app.module.css'
import ViewContainer from "./components/View/ViewContainer";
import Footer from "./components/Footer";
import ItemFragment from "./components/Modify/ItemFragment";
import SearchItem from "./components/View/SearchItem";
import Search from "./components/Utils/Search";

const initialtodo = [
    'To Do APP', 'Build With React.Js'
];


function App() {
    const [data, updateData] = useState(JSON.parse(localStorage.getItem('notes')) || initialtodo);
    const [item, updateItem] = useState([]);

    const [searchStat, setSearchStat] = useState(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const search_data = setTimeout(() => {
            if (searchStat) {
                updateItem(new Search(data, searchText).find_then_serve())
            }
        }, 350);

        if (!searchStat && item !== []) {
            updateItem([]);
        }

        return () => clearTimeout(search_data);


    },[data,searchStat,searchText])


    const [popUpStat, setPopUpStat] = useState({open: false, type: 0, src: ''});
    const onPopStatChange = (stat) => {
        setPopUpStat(prev => {
            return {...prev, open: stat.type !== 0, type: stat.type, src: stat.src}
        })
    }
    const newItemToAdd = (item) => {
        if (item.src.trim().length > 0) {
            updateData(prev => {
                return [item.src, ...prev];
            });
        }
        onPopStatChange({type: 0, src: ''})
    }
    const onEditItem = (Changeitem) => {
        onPopStatChange({type: 0, src: ''})
        if (Changeitem.src.text_src !== Changeitem.new_text_src && Changeitem.new_text_src !== '') {
            const indexToUpdate = parseInt(Changeitem.src.text_index, 10);
            updateData(prev => {
                return prev.map((e, i) => i === indexToUpdate ? Changeitem.new_text_src : e)
            });



        } else if (Changeitem.new_text_src === '') {
            const index = parseInt(Changeitem.src.text_index, 10);
            updateData(prev => {
                return prev.filter((e, i) => i !== index)
            });
        }
    }
    const onDeleteRequest = (index) => {
        updateData(prev => {
            return prev.filter((e, i) => i !== index)
        });

    }

    useEffect(() => {
        document.title = data.length === 0 ? 'TO-DO' : `(${data.length}) TO-DO`
        localStorage.setItem('notes', JSON.stringify(data));
        return () => {
        }
    }, [data, data.length])

    useEffect(()=>{
        popUpStat.type === 1 && searchStat && setSearchText('') && setSearchStat(false)

    },[popUpStat,searchStat])


    return (
        <div className={`${styles.App} container-md container-sm`}>
            <header className={styles.heading}>
                <h1>To-Do</h1>
                <SearchItem swichStat = {setSearchStat} current_stat = {searchStat} set_serch_Text = {setSearchText} search_Text = {searchText}/>
            </header>
            <ItemFragment event={popUpStat} onInputChange={newItemToAdd} onEditData={onEditItem}/>

            <ViewContainer onUserClick={onPopStatChange} is_search_stat = {searchStat} to_show={item} data_src={data} onDelReq={onDeleteRequest}/>


            <Footer onUserClick={onPopStatChange}/>
        </div>
    );
}

export default App;
