<template>
  <div class="about m-3">
        <h4 class="card-title mb-3">Please Note</h4>
        <ul class="list-group">
          <li class="list-group-item">
            <p class="my-2">
              1. This software has to be executed from <b class="text-danger"><u>YOUR NEWLY PURCHASED LAPTOP UNDER ONGC Scheme 2021</u></b>
            </p>
          </li>
          <li class="list-group-item">
            <p class="my-2">
              2. <b class="text-danger"><u>DO NOT</u></b> run this software on Office PC or Corporate VPN
            </p>
          </li>
          <li class="list-group-item">
            <p class="my-2">
              3. Ensure that the Specifications of the purchased laptop are as per the ONGC Laptop Scheme under the Order No <button class="btn btn-sm btn-link" @click="openOfficeOrder()" href="#">Office Order No. DDN/Corp-ER/Estt-Policy/2021/Laptop/748978</button> dtd. 07.04.2021
            </p>
          </li>
          <li class="list-group-item">
            <p class="my-2">
              4. Please go through the <button class="btn btn-outline-primary btn-sm" @click="openHelpGuide()">Help Guide</button> before submitting. Once submitted, the details cannot be modified.
            </p>
          </li>
          <li class="list-group-item">
            <p class="my-2">
              5. In case of any issues, kindly contact us at <span class="text-danger"><b><u>help_laptopfms@ongc.co.in</u></b></span>
            </p>
          </li>
        </ul>
        <button ref="agreeBtn" class="btn btn-danger mt-3" disabled @click="goHome()">
          <span v-text="'Registration will be enabled after ' + secondsLeft + 's'" v-if="secondsLeft>0"></span>
          <span v-else>Go to Registration</span>
        </button>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import axios from 'axios';

const shell = require("electron").shell

export default {
  name: 'About',
  data: () => ({
    secondsLeft: 10
  }),
  mounted() {
    let timer = setInterval(() => {
      this.secondsLeft--;
      if(this.secondsLeft <= 0) {
        clearInterval(timer);
        this.$refs.agreeBtn.disabled = false;
      }
    }, 1000)
  },
  methods: {
    goHome() {
      this.$router.push('/home');
    },
    openHelpGuide() {
      shell.openExternal("https://laptopregister.ongc.co.in/api/helpguide")
    },
    openOfficeOrder() {
      shell.openExternal("https://laptopregister.ongc.co.in/api/officeorder")
    }
  }
}

</script>