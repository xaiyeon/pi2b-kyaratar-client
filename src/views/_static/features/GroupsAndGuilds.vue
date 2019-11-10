<template>
    <div>
        <div class="row">
            <div class="col-md-3">
                <div>
                    <img class="responsive imagemax" src="@/assets/images/sketch/kyara-m-do-it.png" alt="">
                </div>
            </div>
            <div class="col-md-9">
                <div class="q-pa-lg">
                <h4>Groups and Guilds</h4>
                <p>
                    Groups and guilds are a great way to interact and find people that may share the same interests as you.
                </p>
                <h4>Guidelines</h4>
                <p>
                    Although we allow you to do mostly whatever you want. Creating groups that violate our terms and conditions will be terminated if found, and the
                    people in charge of that group will be notified and given up to a week to fix those changes to adhere to the terms and conditions.
                </p>
                <h4>Groups</h4>
                <p>
                    Groups... Hmmm it's basically the same thing like all other websites and applications. You probably already now how they work.
                    You can create a group, create your own roles for that group, chat, and have a sub-forum for your group (whenever that feature is available)!
                    Groups or more of a way to connect with your users on your interests. We do not encourage you to date, live cam, or share information with other users in a
                    group. If you do decide to do that, you will receive a warning. This is not a dating website, so if you really must do that, do not do it on this application or
                    platform.
                </p>
                <h4>Guilds</h4>
                <p>
                    GUILDS! Battle! Rankings, compete, for glory. Need more than just a group? Maybe you want to be in a guild with a much more stressful environment (well it doesn't have to be).
                    Guilds are what will get you climbing the ladder through the arena with people. You will be able to participate and earn points for your guild. This could be your chance
                    to show people you are fierce, OR you are going to be the next back-to-back three time world champions.
                </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// use this as copy and paste for making .vue files, change name
@Component
export default class GroupsAndGuilds extends Vue {
    // data can just be define here using public

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

</style>