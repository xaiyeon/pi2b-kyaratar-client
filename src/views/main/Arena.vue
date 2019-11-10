<template>
    <div>
        <q-layout>
            <q-page-container>
                <q-page>
                    <not-available/>
                </q-page>
            </q-page-container>
        </q-layout>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NotAvailable from '../../components/_shared/NotAvailable.vue';

@Component({
    components: {
        NotAvailable,
    },
})
export default class Arena extends Vue {
  public data() {
      return {
          title: 'Arena',
      };
  }
}
</script>

<style>

</style>
