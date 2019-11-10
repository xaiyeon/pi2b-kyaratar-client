<template>
    <div>
        <div style="max-height: 200px;">
            <q-page class="text-center q-pa-lg fixh">
                <div class="q-pa-md">
                    <p>Master! What are you doing here?</p>
                    <img src="@/assets/images/sub/saber_service.gif" alt="">
                </div>
            </q-page>
        </div>
    </div>

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// use this as copy and paste for making .vue files, change name
@Component
export default class UserRankDenial extends Vue {
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