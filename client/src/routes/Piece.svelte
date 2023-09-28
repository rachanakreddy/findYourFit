<script>
    import { get } from 'svelte/store'
    import fitStore from "./outfitStore.js";
    let currFit = {};
    let select = "";
    let imgSrc = "";
    
    async function search(){
        let searchQ = document.getElementById("search").value;
        let reqBody = {query: searchQ};
        const response = await fetch('http://localhost:5173/search', {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(reqBody)
        });
        const data = await response.json();
        imgSrc = data.url;
    };

    const addToFit = () => {
        currFit = get(fitStore);
        let pieceSrc = document.getElementById("piece").src;
        fitStore.update((_fit) => {
            if(select == "Top"){
                _fit.top = pieceSrc;
            }
            else if(select == "Bottoms"){
                _fit.bottoms = pieceSrc;
            }
            else if(select == "Shoes"){
                _fit.shoes = pieceSrc;
            }
            else{
                if(_fit.acc == undefined){
                    _fit.acc = [];
                }
                _fit.acc.push(pieceSrc);
            }
            return _fit;
        });
	};

    const removeAcc = () => {
        fitStore.update((_fit) => {
            if(_fit.acc !== undefined){ _fit.acc.shift(); }
            return _fit;
        });
    }
    fitStore.subscribe((_fit) => {currFit = _fit});

</script>

<div class = "d-flex justify-content-center">
    <div>
        <h4 class = "text-center">1. Find Your Pieces</h4>
        <div class="input-group mb-3" width = "100">
            <input type = "text" class = "form-control" id = "search">
            <div class="input-group-append">
                <button class = "btn  btn-secondary btn-sml p-1" on:click={search}>Search</button>
            </div>
        </div>
        <div class = "text-center">
            <img id = "piece" class = "mx-auto" src = {imgSrc} alt = "" width = "150" height = "150">
        </div>
        <br>
        <div class = "text-center">
            <div class="dropdown">
                <select bind:value={select} class="form-select-lg" aria-label="Default select example">
                    <option selected>Select a type of piece:</option>
                    <option>Top</option>
                    <option>Bottoms</option>
                    <option>Shoes</option>
                    <option>Accessories</option>
                  </select>
                <button class = "btn btn-success btn-sml p-1" on:click={addToFit}>Add Piece!</button>
            </div>
            <br>
            <button class = "btn  btn-danger btn-sml p-1" on:click={removeAcc}>Remove Recent Accessory</button>
        </div>
    </div>
</div>



