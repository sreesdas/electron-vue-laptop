<template>
    <div class="absolute-container d-flex justify-content-center align-items-center">
        <div class="card" >
            <div class="card-body">
                <h3 class="mb-4">Login to Continue</h3>
                <form action="" @submit.prevent="getUser(user)">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <label for="cpfno" class="mb-1">CPF No</label>
                            <input type="text" class="form-control" v-model="user.cpfNo" autofocus required>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="password" class="mb-1">Domain Password</label>
                            <input type="password" class="form-control" v-model="user.domainPassword" required>
                        </div>
                    </div>
                    <button class="btn btn-danger mb-4">
                        <span class="spinner-border spinner-border-sm" role="status" v-if="isLoading"></span>
                        <span class="ml-2">Login</span>
                    </button>
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
        isLoading: false,
        user: { cpfNo: null, domainPassword: null }
    }),
    methods: {
        getUser() {
            if(this.user.cpfNo && this.user.domainPassword) {
                this.isLoading = true;
                axios.post('https://laptopregister.ongc.co.in/regapi/api/LaptopFms/Authentication', this.user)
                .then(res => {
                    let user = res.data.EmpInfo[0];
                    user.brands = res.data.Brands;
                    user.locations = res.data.Locations;
                    user.levels = res.data.Levels;
                    this.login(user)
                })
                .catch(err => {
                    if(err.response) alert(err.response.data)
                    else alert(err)
                })
                .finally(() =>  { this.isLoading = false })
            }
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
        height: 100%;
        background: rgba(0,0,0,0.5);
    }

</style>