<template>
    <div class="absolute-container d-flex justify-content-center align-items-center">
        <div class="card" >
            <div class="card-body">
                <h3 class="mb-4">Login to Continue</h3>
                <div class="row">
                    <div class="col-12 mb-3">
                        <label for="cpfno" class="mb-1">CPF No</label>
                        <input type="text" class="form-control" v-model="user.cpfno" autofocus>
                    </div>
                    <div class="col-12 mb-3">
                        <label for="password" class="mb-1">Domain Password</label>
                        <input type="password" class="form-control" v-model="user.password">
                    </div>
                </div>
                <button class="btn btn-outline-danger" @click="login(user)">Submit</button>            
            </div>
        </div>
    </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
    data: () => ({
        user: { cpfno: null, password: null }
    }),
    methods: {
        ...mapActions(['login'])
    }
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