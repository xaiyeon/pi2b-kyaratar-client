<template>
    <div>
        <transition v-if="showTop"
            appear
            enter-active-class="animated bounceInDown"
            leave-active-class="animated bounceOutUp"
        >
            <template v-if="showTop">
                <top-profile :puser="puser" />
            </template>
        </transition>

            <div>
                <q-toolbar color="tertiary">
                    <q-item>
                        <q-btn v-if="!showTop" icon="arrow_drop_down" @click.native="toggleTop" />
                        <q-btn v-if="showTop" icon="arrow_drop_up" @click.native="toggleTop" />
                    </q-item>
                    <q-item class="text-amber bigfont" >
                        {{ puser[0].displayName }}
                    </q-item>                
                    <q-item>
                        <q-btn flat dense @click.native="navigateTo('viewUser')">
                            Central
                        </q-btn>
                    </q-item>
                    <q-item>
                        <q-btn flat dense @click.native="navigateTo('Favorites')">
                            Favorites
                        </q-btn>
                    </q-item>
                    <q-item>
                        <q-btn flat dense @click.native="navigateTo('Lists')">
                            Lists
                        </q-btn>
                    </q-item>
                    <q-item>
                        <q-btn flat dense @click.native="navigateTo('Content')">
                            Content
                        </q-btn>
                    </q-item>
                    <q-item>
                        <q-btn flat dense @click.native="navigateTo('Social')">
                            Social
                        </q-btn>
                    </q-item>
                    <q-item>
                        <q-btn flat dense @click.native="navigateTo('Milestones')">
                            Milestones
                        </q-btn>
                    </q-item>
                    <q-item>
                        <q-btn flat dense @click.native="navigateTo('Contributions')">
                            Contributions
                        </q-btn>
                    </q-item>
                </q-toolbar>
            </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import TopProfile from './TopProfile.vue';

// use this as copy and paste for making .vue files, change name
@Component({
    components: {
        TopProfile,
    },
})
export default class NavProfile extends Vue {
    // data can just be define here using public
    @Prop({default: { options: Object }})
    public puser!: any;

    public showTop = true;

    public toggleTop() {
        this.showTop = !this.showTop;
    }

    public navigateTo(e) {
        if (e === 'viewUser') {
            this.$router.push({
                name: 'viewUser',
                params: {
                    username: this.puser[0].username,
                    user: this.puser,
                },
            });
        }
        if (e === 'Favorites') {
            this.$router.push({
                name: 'Favorites',
                params: {
                    username: this.puser[0].username,
                    user: this.puser,
                },
            });
        }
        if (e === 'Lists') {
            this.$router.push({
                name: 'Lists',
                params: {
                    username: this.puser[0].username,
                    user: this.puser,
                },
            });
        }
        if (e === 'Content') {
            this.$router.push({
                name: 'Content',
                params: {
                    username: this.puser[0].username,
                    user: this.puser,
                },
            });
        }
        if (e === 'Social') {
            this.$router.push({
                name: 'Social',
                params: {
                    username: this.puser[0].username,
                    user: this.puser,
                },
            });
        }
        if (e === 'Milestones') {
            this.$router.push({
                name: 'Milestones',
                params: {
                    username: this.puser[0].username,
                    user: this.puser,
                },
            });
        }
        if (e === 'Contributions') {
            // console.log(this.user[0]);
            this.$router.push({
                name: 'Contributions',
                params: {
                    username: this.puser[0].username,
                    user: this.puser[0],
                },
            });
        }
    }
}
</script>

<style scoped lang="scss">

.bigfont {
    font-weight: bold;
    font-size: 1.3em;
}

</style>