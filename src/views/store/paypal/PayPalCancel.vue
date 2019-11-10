<template>
    <div>
        <q-page>
            <div class="q-pa-md">
                Your PayPal transaction was cancelled.
                <br>
                If it failed, it was also cancelled, sorry.
            </div>
        </q-page>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// use this as copy and paste for making .vue files, change name
@Component
export default class PayPalCancel extends Vue {
    // data can just be define here using public

    public mounted() {
        // get those parameters
        try {
            console.log(this.$route.query);
            if (this.$route.query.token === undefined) {
                this.navigateTo('home');
            }
        } catch (error) {
            // an error
        }
    }

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

</style>