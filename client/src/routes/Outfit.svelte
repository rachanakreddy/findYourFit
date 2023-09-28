<script>
    import fitStore from "./outfitStore.js";
    export let title = "";
    
    let currFit = {};

    fitStore.subscribe((_fit) => {
        currFit = _fit;
    });

</script>

<h4 class = "text-center">2. Put It All Together</h4>
<div class = "d-flex flex-wrap" id = "outfit-grid"> 
    <img class = "mx-auto" src = {currFit.top} alt = "" width = "150" height = "150">
    <img class = "mx-auto" src = {currFit.bottoms} alt = "" width = "150" height = "150">
    <img class = "mx-auto" src = {currFit.shoes} alt = "" width = "150" height = "150">
    {#if currFit.acc !== undefined}
        {#each currFit.acc as currAcc}
            <img class = "mx-auto" src = {currAcc} alt = "" width = "150" height = "150">
        {/each}
    {/if}
</div>
<br>
<h5 class = "text-center">{title}</h5>


