import style from '../Style/app.module.css'

const SearchItem = propsSearchItem => {
    const offSearchStat = () => {
        propsSearchItem.search_Text.length<1 && propsSearchItem.current_stat  && propsSearchItem.swichStat(false);
    }
    const handleSearchText = (e) => {
        propsSearchItem.search_Text.length>0 && !propsSearchItem.current_stat  && propsSearchItem.swichStat(true);
        propsSearchItem.set_serch_Text(e.nativeEvent.target.value)
    }


    return (
        <div className={style['search-bar-container']}>
            <input
                type="text"
                className={style["search-bar"]}
                placeholder="Search"
                aria-label="search"
                value={propsSearchItem.search_Text}
                onChange={handleSearchText}
                onBlur={offSearchStat}
            />
            <button className={style["search-bar-icon"]} aria-label="submit-search">
                <i className="fa fa-search"/>
            </button>
        </div>


    );
}

export default SearchItem;