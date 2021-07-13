<template>
  <div class="about m-3">
        <h4 class="card-title mb-3">Please Note</h4>
        <ul class="list-group">
          <li class="list-group-item">
            <p class="my-2">
              1. This software has to be executed from <b class="text-danger"><u>YOUR NEWLY PURCHASED LAPTOP UNDER ONGC Scheme</u></b>
            </p>
          </li>
          <li class="list-group-item">
            <p class="my-2">
              2. Specifications of the purchased laptop are as per the ONGC Laptop Scheme under the Order No <a target="_blank" href="#">DDN/CORP-ER/ESTT-POLICY/2021/LAPTOP/748978</a>
            </p>
          </li>
          <li class="list-group-item">
            <p class="my-2">
              3. 
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
    }
  }
}

</script>