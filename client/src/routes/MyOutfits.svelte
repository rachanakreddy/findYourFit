<script>
    import { onMount } from 'svelte';
    import dbStore from './dbStore.js';
    let outfits = {};

    onMount(async() => {
        const res = await fetch('http://localhost:3003/read');
        const data = await res.json();
        dbStore.set(data);
    });

    dbStore.subscribe((_outfits) => {
        outfits = _outfits;
    });

</script>

<h2 class = "text-center">My Outfits</h2>
<div class="d-flex flex-row flex-wrap justify-content-between">
    {#each Object.entries(outfits) as [_,fit]}
      <div class="card post">
        <div class="card-body">
          <h3>{fit.name}</h3>
            <img class = "mx-auto" src = {fit.top} alt = "" width = "50" height = "50">
            <img class = "mx-auto" src = {fit.bottoms} alt = "" width = "50" height = "50">
            <img class = "mx-auto" src = {fit.shoes} alt = "" width = "50" height = "50">
            {#if fit.acc.length !== 0 }
                {#each fit.acc as currAcc}
                    <img class = "mx-auto" src = {currAcc} alt = "" width = "50" height = "50">
                {/each}
            {/if}
        </div>
      </div>
    {/each}
  </div>
  
  <style>
    .post {
      margin-bottom: 20px;
      width: 30%;
    }
  </style>
  

