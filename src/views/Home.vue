<template>
  <div class="mt-3 mx-4">
    <div v-if="isLoaded">
      <table class="table table-striped table-bordered shadow-sm" >
      <thead>
        <tr>
          <th colspan="2">Specifications</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Serial No</td>
          <td v-text="sysInfo.system.serial"></td>
        </tr>
        <tr>
          <td>CPU</td>
          <td>{{ sysInfo.cpu.manufacturer }} {{ sysInfo.cpu.brand }}</td>
        </tr>
        <tr>
          <td>Harddisk</td>
          <td>
            {{ Math.round((sysInfo.diskLayout[0] ? sysInfo.diskLayout[0].size : 0) / (1000*1000*1000)) }} GB
            {{ sysInfo.diskLayout[0] ? sysInfo.diskLayout[0].type : '' }}</td>
        </tr>
        <tr>
          <td>Model</td>
          <td>{{ sysInfo.system.model }}</td>
        </tr>
        <tr>
          <td>RAM</td>
          <td> {{ Math.round(sysInfo.mem.total/(1024*1024*1024)) }} GB</td>
        </tr>
        <tr>
          <td>OS</td>
          <td>{{ sysInfo.osInfo.distro }} {{ sysInfo.osInfo.release }}</td>
        </tr>
        <tr>
          <td>User Details</td>
          <td>
            <p class="mb-1">{{ user.name }}</p>
            <p>{{ user.designation }}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="card my-3 shadow-sm">
      <div class="card-body">
        <h4 class="mb-3">Additional Details</h4>
        <div class="row">
          <div class="col-12 mb-3">
            <label for="date" class="mb-1 text-muted">Date of Purchase</label>
            <input type="date" class="form-control" v-model="misc.purchase_date">
          </div>
          <div class="col-12 mb-3">
            <label for="brand" class="mb-1 text-muted">Laptop Brand</label>
            <select class="form-control" v-model="misc.brand" required>
              <option value="">-- Select Brand --</option>
              <option :value="brand.code" v-for="brand in user.brands" :key="brand.code"> {{ brand.name }}</option>
            </select>
          </div>
          <div class="col-12 mb-3">
            <label for="sublocation" class="mb-1 text-muted">Sub Location</label>
            <select class="form-control" v-model="misc.sublocation" required>
              <option value="">-- Select Sub Location --</option>
              <option :value="location.sublocation" v-for="location in user.locations" :key="location.email"> {{ location.email }}</option>
            </select>
          </div>
          <div class="col-12 mb-3">
            <label for="level" class="mb-1 text-muted">Level</label>
            <select class="form-control" v-model="misc.level" required>
              <option value="">-- Select Level --</option>
              <option :value="level" v-for="level in user.levels" :key="level"> {{ level }}</option>
            </select>
          </div>
        </div>

        <p class="text-muted">Request Additional Softwares</p>
        <div class="form-check">
          <input class="form-check-input" id="office" type="checkbox" v-model="misc.office">
          <label class="form-check-label" for="office">
            Microsoft Office for Windows
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" id="trendmicro" type="checkbox" v-model="misc.trendmicro">
          <label class="form-check-label" for="trendmicro">
            Trend Micro Antivirus
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" id="sapclient" type="checkbox" v-model="misc.sapclient">
          <label class="form-check-label" for="sapclient">
            SAP GUI Client
          </label>
        </div>

      </div>

    </div>

      <div class="my-3">
        <div class="form-check">
          <input class="form-check-input" id="verification" type="checkbox" v-model="misc.isVerified">
          <label class="form-check-label" for="verification">
            I have verified the Serial No displayed above with Serial No. on the original Invoice
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" id="spec" type="checkbox" v-model="misc.isCorrectSpec">
          <label class="form-check-label" for="spec">
            I have ensured that the Specifications of the laptop are as per the ONGC Laptop Scheme 2021
          </label>
        </div>
      </div>

    </div>
    
    <Loader v-else />
    
    <button class="btn btn-danger mb-4" @click="submit()" v-if="isLoaded && user.cpfno" :disabled="!isChecked && !isSubmitting">
      <span class="spinner-border spinner-border-sm" role="status" v-if="isSubmitting"></span>
      <span class="ml-2">Submit</span>
    </button>

    <Modal v-if="isLoaded && !user.cpfno" />
  </div>
</template>

<script>
const { ipcRenderer } = require('electron')
const axios = require('axios')

import Modal from '@/components/Modal.vue';
import Loader from '@/components/Loader.vue';
import swal from 'sweetalert';

import { mapState } from 'vuex';

export default {
  name: 'Home',
  data: () => ({
    sysInfo: {
      system: {},
      cpu: {},
      mem: {},
      osInfo: {},
      diskLayout: []
    },
    misc: {
      level: null,
      sublocation: null,
      purchase_date: null,
      brand: null,
      office: null,
      trendmicro: null,
      sapclient: null,
      isVerified: false,
      isCorrectSpec: false,
    },
    isLoaded: false,
    isSubmitting: false
  }),
  components: {
    Modal,
    Loader
  },
  computed: {
    isChecked: function() {
      return this.misc.isCorrectSpec && this.misc.isVerified;
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

      var date = new Date(this.misc.purchase_date);
      var today = new Date();
      if((date - today) > 0) {
        swal("Oops!", "Cannot submit on a future date", "warning");
        return
      }

      if(this.misc.level && this.misc.sublocation && this.misc.purchase_date && this.misc.brand && this.user.cpfno && this.isLoaded ) {
        
        swal({
          title: "Are you sure to proceed?",
          text: "Once submitted, the details cannot be modified!",
          icon: "info",
          buttons: ['CANCEL', "OK"],
        }).then(res => {
          if(res) {
            this.postSpec({
              "spec" : this.sysInfo,
              "user" : this.user,
              "misc" : this.misc,
              "version": "1.0.3",
            });
          }
        })
        .catch(err => swal("Oops!", err, "error"));
        

      } else {
        swal("Oops!", "Incomplete data. Did you miss any fields?", "warning");
      }
    },

    postSpec(payload) {
      this.isSubmitting = true
      axios.post('https://laptopregister.ongc.co.in/api/laptop', payload)
      // axios.post('http://localhost:8000/api/laptop', payload)
      .then(res => {
        swal("Success", res.data, "success");
      })
      .catch(err => {
        if(err.response) swal("Oops!", err.response.data.message, "error");
        else  swal("Oops!", err, "error");
      })
      .finally(() => {
        this.isSubmitting = false
      })
    }
  }
}
</script>

<style scoped>
  .table > tbody > tr:nth-of-type(odd) {
    background-color: snow;
  }
</style>