
class Search{
    constructor(array,keys) {
        this.Source = array;
        this.Keys = keys
    }

    set setSource(array){
        this.Source = array;
        return this;
    }
    set keys(array){
        this.Keys = array;
        return this;
    }

    find_then_serve(){
        return this.Source.map(e=>e.toLowerCase().includes(this.Keys.toLowerCase()))
    }


}

export default Search