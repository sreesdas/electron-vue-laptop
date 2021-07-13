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
          <td>Storage</td>
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
              <option :value="brand.Brand_Name" v-for="brand in user.brands" :key="brand.code"> {{ brand.Brand_Name }}</option>
            </select>
          </div>
          <div class="col-12 mb-3">
            <label for="sublocation" class="mb-1 text-muted">Sub Location</label>
            <select class="form-control" v-model="misc.sublocation" required>
              <option value="">-- Select Sub Location --</option>
              <option :value="location.Email_Id" v-for="location in user.locations" :key="location.helpdesk"> {{ location.Email_Id }}</option>
            </select>
          </div>
          <div class="col-12 mb-3">
            <label for="level" class="mb-1 text-muted">Level</label>
            <select class="form-control" v-model="misc.level" required>
              <option value="">-- Select Level --</option>
              <option :value="level.Level" v-for="level in user.levels" :key="level.id"> {{ level.Level }}</option>
            </select>
          </div>
        </div>

        <p class="text-muted">Request Additional Softwares</p>
        <div class="form-check">
          <input class="form-check-input" id="office2010" type="checkbox" v-model="misc.office2010">
          <label class="form-check-label" for="office2010">
            Microsoft Office 2010 for Windows
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" id="office2013" type="checkbox" v-model="misc.office2013">
          <label class="form-check-label" for="office2013">
            Microsoft Office 2013 for Windows
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
            I have verified the Serial No displayed above with the original Invoice
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" id="spec" type="checkbox" v-model="misc.isSpec">
          <label class="form-check-label" for="spec">
            Specifications of the laptop are as per the ONGC Laptop Scheme
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" id="own" type="checkbox" v-model="misc.isOwn">
          <label class="form-check-label" for="own">
            I will be able to bring the laptop to office in case requested
          </label>
        </div>
      </div>

    </div>
    
    <Loader v-else />
    
    <button class="btn btn-danger mb-4" @click="submit()" v-if="isLoaded && user.cpfno" :disabled="!isChecked">
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
      office2010: null,
      office2013: null,
      trendmicro: null,
      sapclient: null,
      isVerified: false,
      isSpec: false,
      isOwn: false,
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
      return this.misc.isOwn && this.misc.isVerified && this.misc.isVerified;
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
        alert('Cannot submit on a future date!');
        return
      }

      if(this.misc.level && this.misc.sublocation && this.misc.purchase_date && this.misc.brand && this.user.cpfno && this.isLoaded ) {
        this.sysInfo.system.serial = btoa(btoa(btoa(this.sysInfo.system.serial)))
        this.postSpec({
          "spec" : this.sysInfo,
          "user" : this.user,
          "misc" : this.misc
        });
      } else {
        alert('Incomplete data. Did you miss any fields?');
      }
    },

    postSpec(payload) {
      this.isSubmitting = true
      axios.post('https://laptopregister.ongc.co.in/regapi/api/laptopfms/registration', payload)
      .then(res => {
        alert(res.data);
      })
      .catch(err => {
        if(err.response) alert(err.response.data)
        else alert(err)
      })
      .finally(() => {
        this.isSubmitting = false
        this.sysInfo.system.serial = atob(atob(atob(this.sysInfo.system.serial)))
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