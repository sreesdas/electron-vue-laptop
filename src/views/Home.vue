<template>
  <div class="mt-3 mx-4">
    <table class="table table-striped table-bordered shadow-sm" v-if="isLoaded">
      <thead>
        <tr>
          <th colspan="2">Specifications</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Serial No</td>
          <td v-text="sysInfo.serial"></td>
        </tr>
        <tr>
          <td>CPU</td>
          <td v-text="sysInfo.cpu"></td>
        </tr>
        <tr>
          <td>RAM</td>
          <td> {{ sysInfo.total/(1024*1024*1024) }} GB</td>
        </tr>
        <tr>
          <td>Manufacturer</td>
          <td v-text="sysInfo.manufacturer"></td>
        </tr>
        <tr>
          <td>OS</td>
          <td v-text="sysInfo.codename"></td>
        </tr>
        <tr>
          <td>User</td>
          <td v-text="user.cpfno"></td>
        </tr>
      </tbody>
    </table>
    <p v-else>Loading...</p>
    <button class="btn btn-danger" @click="submit()" v-if="isLoaded">Submit</button>
    <Modal v-if="!user.cpfno" />
  </div>
</template>

<script>
const { ipcRenderer } = require('electron')
const axios = require('axios')

import Modal from '@/components/Modal.vue';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  data: () => ({
    sysInfo: {},
    isLoaded: false,
  }),
  components: {
    Modal
  },
  computed: {
    isValid: function() {
      return (this.sysInfo.total)/(1024*1024*1024) >= 16;
    },
    ...mapState(['user'])
  },
  mounted() {
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      this.sysInfo = arg
      this.isLoaded = true
    })
    ipcRenderer.send('asynchronous-message')
  },
  methods: {
    submit() {
      axios.post('https://covidstatus.ongc.co.in/api/test', this.sysInfo)
      .then(res => alert('success'))
      .catch(err => alert(err))
    }
  }
}
</script>

<style scoped>
  .table > tbody > tr:nth-of-type(odd) {
    background-color: snow;
  }
</style>