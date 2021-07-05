<template>
    <div class="absolute-container d-flex justify-content-center align-items-center">
        <div class="card" >
            <div class="card-body">
                <h3 class="mb-4">Login to Continue</h3>
                <form action="" @submit.prevent="getUser(user)">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <label for="cpfno" class="mb-1">CPF No</label>
                            <input type="text" class="form-control" v-model="user.cpfno" autofocus required>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="password" class="mb-1">Domain Password</label>
                            <input type="password" class="form-control" v-model="user.password" required>
                        </div>
                    </div>
                    <button class="btn btn-outline-danger">Submit</button>  
                </form>          
            </div>
        </div>
    </div>
</template>

<script>

import { mapActions } from 'vuex';
import axios from 'axios';

export default {
    data: () => ({
        user: { cpfno: null, password: null }
    }),
    methods: {
        getUser() {
            axios.get('/data/user.json')
            .then(res => {
                this.login(res.data)
            })
            .catch(err => alert(err))
        },
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