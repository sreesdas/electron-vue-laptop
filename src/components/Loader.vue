<template>
    <div class="absolute-container d-flex justify-content-center align-items-center">
        <div class="text-center">
            <h4 class="text-white">Loading your system info...</h4>
            <p class="text-white">This might take a while</p>
        </div>
    </div>
</template>

<script>

import { mapActions } from 'vuex';
import axios from 'axios';

export default {

};
</script>

<style>

    .absolute-container {
        position: absolute;
        top:0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.5);
    }

</style>