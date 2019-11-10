import Vue from 'vue';
import { Watch } from 'vue-property-decorator';
import { Component, Mixin, Mixins } from 'vue-mixin-decorator';
import ConsoleClear from '@/static/helpers/consoleClear';
import consoleClear from '@/static/helpers/consoleClear';

// To enable or disable, change value in static/helpers/settings.ts
@Mixin
export default class ConsoleClearMixin extends Vue {
    @Watch('console.log', { immediate: true })
    public onConsole(value: any) {
        consoleClear.consoleWipe();
    }
    public created() {
        // console.log('Mixin created()');
        ConsoleClear.consoleWipe();
    }
    public mounted() {
        // console.log('Mixin created()');
        ConsoleClear.consoleWipe();
    }
    public mixinMethod() {
        // console.log('Mixin method called.');
    }
}
