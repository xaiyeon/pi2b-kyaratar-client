<template>
    <div>
        <div style="max-height: 200px;">
            <q-layout >
                <q-page-container>
                    <q-page class="text-center q-pa-lg fixh">
                        <p>Kyaratar is currently in ALPHA stage.</p>
                        <p>This feature is not yet available: sorry for the inconvenience.</p>
                    </q-page>
                </q-page-container>
            </q-layout>
        </div>
    </div>

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// use this as copy and paste for making .vue files, change name
@Component
export default class NotAvailable extends Vue {
    // data can just be define here using public

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

.fixh {
    height: 100px;
}

</style>