<template>
    <div class="q-ma-md shadow-3 row inline flex column wrap">
        <q-layout class="fit">
            <q-layout-header>
                <q-toolbar :color=color>
                    <q-toolbar-title class="q-headline q-pa-md">
                        {{ title }}
                    </q-toolbar-title>
                </q-toolbar>
            </q-layout-header>
            <q-page-container class="fit">
                <q-page class="fit">
                    <div class="row fit panelBg">
                        <div class="col fit">
                            <div class="panelMargins fit">
                                <slot>
                                    No slot content defined yet.
                                </slot>
                            </div>
                        </div>
                    </div>
                </q-page>
            </q-page-container>
        </q-layout>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    name: 'Panel',
    props: {
        title: String,
        color: String,
    },
})
export default class Panel extends Vue {
    public name = 'Panel';
    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

.panelMargins {
    margin: 2em 2em 2em 2em;
}

.panelBg {
    background: rgba(255,255,255,0.80);    
}

</style>