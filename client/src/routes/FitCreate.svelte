<script>
    import Outfit from "./Outfit.svelte";
    import Piece from "./Piece.svelte";
    import fitStore from "./outfitStore.js";
    import dbStore from "./dbStore.js";
    let title = "";
    let currFit = {};

    fitStore.subscribe((_fit) => {currFit = _fit;});

    async function addOutfit(){
        currFit.name = title;
        const response = await fetch('http://localhost:4000/add', {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(currFit)
        });

        const res = await fetch('http://localhost:3003/read');
        const data = await res.json();
        dbStore.set(data);
        dbStore.update((_outfits) => {return _outfits;});
    }

</script>

<div>
    <div>
        <div class = "container">
            <div class = "row">
                <div class="col-sm"> <Piece /> </div>
                <div class="col-sm"> <Outfit {title}/></div>
            </div>
        </div>
        <br>
        <div class="input-group input-group-lg">
            <input type = "text" class = "form-control input-sm" placeholder = "Name Your Outfit :)" bind:value={title} >
        </div>  
        <br>
        <button class = "btn btn-info btn-block btn-lg p-2" on:click={addOutfit}>Add Outfit!</button>
    </div>
</div>

<style>
.btn{
    font-size: 25px;
}
</style>