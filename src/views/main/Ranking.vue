<template>
    <div>
        <q-layout>
            <q-page-container>
                <q-page>
                    <q-toolbar color="secondary">
                    <q-item>
                        <q-btn flat dense @click.native="navigateTo('ranking-characters')">
                            Characters
                        </q-btn>
                    </q-item>
                    <q-item>
                        <q-btn flat dense @click.native="navigateTo('ranking-users')">
                            Users
                        </q-btn>
                    </q-item>
                    </q-toolbar>
                        <div>
                            <router-view></router-view>
                        </div>
                    <!-- <not-available/> -->
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
export default class Ranking extends Vue {

    public navigateTo(e) {
        if (e === 'ranking-characters') {
            this.$router.push({
                name: 'ranking-characters',
            });
        }
        if (e === 'ranking-users') {
            this.$router.push({
                name: 'ranking-users',
            });
        }
    }

}
</script>

<style>

</style>
