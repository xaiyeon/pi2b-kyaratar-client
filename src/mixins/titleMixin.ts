import Vue from 'vue';
import { Component, Mixin, Mixins } from 'vue-mixin-decorator';

@Mixin
export default class TitleMixin extends Vue {
    public getTitle(vm) {
        const { title } = vm.$options;
        if (title) {
            return typeof title === 'function'
            ? title.call(vm)
            : title;
        }
    }

    public created() {
        // console.log('Mixin created()');
        const title = this.getTitle(this);
        if (title) {
          document.title = title;
        }
    }
    public mixinMethod() {
        // console.log('Mixin method called.');
    }
}
