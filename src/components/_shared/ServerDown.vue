<template>
    <div>
        <q-page>
            <div class="centerof">
                <easy-panel color="primary" title="Service is Offline">
                    <div>
                        <p>Sorry Master, but the service is either down or unavailable at the moment.</p>
                    </div>
                </easy-panel>
            </div>
        </q-page>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import EasyPanel from './EasyPanel.vue';

// use this as copy and paste for making .vue files, change name
@Component({
    components: {
        EasyPanel,
    },
})
export default class ServerDown extends Vue {
    // data can just be define here using public

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

.centerof {
    margin: 0;
    display: inline;
}

</style>