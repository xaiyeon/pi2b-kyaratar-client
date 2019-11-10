<template>
    <div>
        <div class="row">
            <div class="col-md-3">
                <div>
                    <img class="responsive imagemax" src="@/assets/images/sketch/kyara-m-paper.png" alt="">
                </div>
            </div>
            <div class="col-md-9">
                <div class="q-pa-lg">
                <h4>Terms and Conditions</h4>
                <p>
                    Our terms and conditions are much simpler than any laws. Please read them below.
                </p>
                <p>
                    <ul>
                        <li>
                            1. Respect each other and have fun: no hurting others physically or mentally, or any other way.
                        </li>
                        <li>
                            2. Think before you act, especially when in the moment.
                        </li>
                        <li>
                            3. Do not give away your account or user information to anyone else, unless you are seeking help from an official at Kyaratar.
                        </li>
                        <li>
                            4. Seek assistance if you have trouble with anything with this application or platform.
                        </li>
                        <li>
                            5. The first five terms and conditions will never be changed or altered in anyway.
                        </li>
                        <li>
                            6. Other users (or accounts) will be able to propose new terms and conditions and will be added after number six by using popular majority voting:
                            if it passes, there will be a check for herd mentality and assure the new term and condition fits the first five.
                        </li>
                    </ul>
                </p>
                <h5>More On Invite Keys: Terms</h5>
                <p>
                    I have a bunch of friends and I want to generate an invite key for ALL of them! But why can't I do that?
                    Because we believe, a community that interacts with each other will obviously be more fun. In special events or
                    occassions, we will give out invite keys for you to distribute (obviously never more than five at any given time on the same event).
                </p>
                <p>
                    Terms and restrictions for invite keys are still being thought of. For now, one user will be able to generate an invite key once per week to give
                    away.
                </p>
                <p>
                    Any valid user or account that uses your invite key will be linked to your account or user. You will be rewarded points (or whatever we end up calling it) that
                    you can use on the application or platform to spend on whatever we have (when that feature is ready).
                </p>
                <p>
                    If we ever find invite keys or users and accounts with suspicious patterns of reuse or matching data (or related); all those invite keys, users, and accounts 
                    within the neccesary time frame will be deleted to oblivion (and possibly banned).
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
export default class TermsAndConditions extends Vue {
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