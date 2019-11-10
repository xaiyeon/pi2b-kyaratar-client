<template>
    <div>
        <div class="row">
            <div class="q-ma-md ">
            <div class="col">
                <q-toolbar :color=color>
                    <q-toolbar-title class="q-headline q-pa-md">
                        {{ title }}
                    </q-toolbar-title>
                </q-toolbar>
                <div class="row shadow-3">
                    <div class="col">
                        <div class="panelMargins panelBg">
                            <slot>
                                No slot content defined yet.
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
    name: 'EasyPanel',
    props: {
        title: String,
        color: String,
    },
})
export default class EasyPanel extends Vue {
    public name = 'Panel';
    // public title = '';

    @Watch('title', { immediate: true })
    public propertyChange(value: any) {
        // this.title = value;
    }

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

.panelMargins {
    padding: 1.2em 1.2em 1.2em 1.2em;
}

.panelBg {
    background: rgba(255,255,255,0.80);    
}

</style>