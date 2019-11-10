<template>
    <div>
        <q-layout>
            <q-page-container>
                <q-page>
                    <div class="q-pa-lg">
                        <div class="row">
                            <div class="col-lg-6">
                                <div style="font-size:1.2em; font-weight:bold">
                                    Invite Key Distribution Chart
                                </div>
                                <template>
                                    <invitekeystats v-if="!this.compData.values.length" :invitekeyData="tempKeyData" />
                                    <ivkeypiechart :chartData="tempKeyData" :options="pieChartOptions" />
                                    <vue-frappe
                                            id="invitekeychart"
                                            :labels="[
                                                'Total Keys', 'Used Keys', 'Available Keys',
                                            ]"
                                            title="Invite Key Chart"
                                            type="pie"
                                            :height="500"
                                            :colors="['#1AA8E7', '#06D71F', '#D70642']"
                                            :dataSets="this.tempKeyData">
                                    </vue-frappe>
                                </template>
                            </div>
                            <div class="col-lg-6">
                                <div style="font-size:1.2em; font-weight:bold">
                                    User Number Statistics
                                </div>
                                <div>
                                    <br>
                                    <q-list class="shadow-5">
                                        <q-item>
                                            <div>
                                                Total Users: {{ totalUsers }}
                                            </div>
                                        </q-item>
                                    </q-list>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-lg-12">
                        <div class="headingtitle">
                            Character Data Statistics
                        </div>                                
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4">
                                <div>
                                    <br>
                                    <q-list class="shadow-5">
                                        <q-item>
                                            <div>
                                                Total Characters: {{ totalCharacters }}
                                            </div>
                                        </q-item>
                                    </q-list>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="q-pa-md">
                                    <div class="minisubheading">
                                        Character Category Distribution Chart
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="q-pa-md">
                                    <div class="minisubheading">
                                        Character Tag Distribution Chart
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </q-page>
            </q-page-container>
        </q-layout>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import inviteKeyStats from '@/components/_analytics/inviteKeyStats.vue';
import NotAvailable from '../../components/_shared/NotAvailable.vue';
import AnalyticsService from '../../_services/analyticsService';
import inviteKeyPieChart from '@/components/_shared/charts/analyticsPieChart.vue';

// import VueCharts from 'vue-chartjs';
// import { Pie } from 'vue-chartjs';
// import { Chart } from 'frappe-charts';

@Component({
    components: {
        invitekeystats: inviteKeyStats,
        NotAvailable,
        ivkeypiechart: inviteKeyPieChart,
    },
})
export default class Analytics extends Vue {
  public totalUsers = 0;
  public totalCharacters = 0;

  public inviteKeyValues = [];
  public pieChartOptions = {
      responsive: true,
    };

  public keyOnce = false;
  public tempKeyData = [];

  public compData = [
        {
            name: 'Invite Key Statistics',
            chartType: 'pie',
            values: this.tempKeyData,
        },
    ];

  @Watch('inviteKeyValues', { immediate: true })
  public onChangeIKData(value: any) {
      // nothing
      this.inviteKeyValues = value;
  }

  public async mounted() {
      try {
        this.getUserCount();
        this.getCharacterStats();
        this.getKeyData();
      } catch (error) {
          // error
      }
  }

  public async getCharacterStats() {
      try {
          const response = (await AnalyticsService.characterStats()).data;
          console.log(response);
          this.totalCharacters = response.characterCount;
      } catch (error) {
          // error
      }
  }

  public async getUserCount() {
      try {
          const response = (await AnalyticsService.usercount()).data;
          // console.log(response);
          this.totalUsers = response.usercount;
      } catch (error) {
          // error
      }
  }

//   public loadKeyData() {
//       if (!this.keyOnce) {
//         this.keyOnce = true;
//         this.getKeyData().then(() => {
//             return this.compData;
//         });
//       } else {
//         return this.compData;
//       }
//   }

  public async getKeyData() {
      try {
        const response = (await AnalyticsService.invitekeyStats()).data;
        // console.log(response); // totalKeys, usedKeys, availKeys
        this.tempKeyData.push(response.totalKeys);
        this.tempKeyData.push(response.usedKeys);
        this.tempKeyData.push(response.availKeys);
        console.log(this.tempKeyData);
      } catch (error) {
          // error
      }
  }

  @Watch('tempKeyData', { immediate: true })
  public onChangeIK(value: any) {
      // this.loadKeyData();
  }

  public async beforeCreate() {
    // nothing
    try {
        // const chart = new Chart('#invitekeychart');
        // const response = (await AnalyticsService.invitekeyStats()).data;
        // console.log(response); // totalKeys, usedKeys, availKeys
        // this.inviteKeyValues.push(response.totalKeys);
        // this.inviteKeyValues.push(response.usedKeys);
        // this.inviteKeyValues.push(response.availKeys);
        // chart.update(this.invitekeyData);
        // console.log(this.inviteKeyValues);
    } catch (error) {
        // error
    }
  }
}
</script>

<style>

.minisubheading {
    font-size: 1.1em;
    font-weight: 500;
}

.headingtitle {
    font-size: 1.2em;
    font-weight: bold;
}

</style>
