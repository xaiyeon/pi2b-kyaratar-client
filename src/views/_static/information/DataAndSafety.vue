<template>
    <div>
        <div class="row">
            <div class="col-md-3">
                <div>
                    <img class="responsive imagemax" src="@/assets/images/sketch/kyara-m-data.png" alt="">
                </div>
            </div>
            <div class="col-md-9">
                <div class="q-pa-lg">
                <h4>Your Data and Your Safety</h4>
                <p>
                    Take a step back into the early days of the internet. Remember the times when you didn't have to care about personal information? We encourage you to not
                    submit any personal information! Here we clearly know what data we value and it's not you. The only real data we ever store is your birth date and email address.
                    Those two little things is all we would like to keep authentic.
                </p>
                <p>
                    Thereof, although you can create a custom page and profile with your real photos and information, it is completely up to you! Since we use the "invite-only method" for
                    acquiring users (thank you), that means we can be certain (to a degree) it is a real person and not a bot, or etc. If you do have real information or photos of yourself, posted by yourself
                    then it's your responsibility on whatever consequences happens (like drama or getting roasted on). If for some reason, there is another user or account pretending to be you,
                    contact support and we will resolve the problem 100%. 
                </p>
                <p>
                    Of course, your data is your data and you can download a copy of your data whenever you want to (when that feature gets added, high priority). There is also a setting
                    if you want to opt-in OR opt-out of being included in our analytics research and data science (for whatever reason).
                </p>
                <h5>But Why?</h5>
                <p>
                    We need your email to send you updates, changes, notices, and all the good stuff when it happens. As for the birth date, well how else can we check for certain laws?
                    Other than that, go back to the old times AND give yourself that fancy and edgy name once again like 'xSwaggerBoyx42', but of course... We will filter some bad words, and
                    revoke your user (or account) if your username, display name, or anything you enter has dirty words in it!
                </p>
                <h4>Transactions and Middle-Anything</h4>
                <p>
                    So if you have subscriptions and transactions, how does that not collect personal information? Since, as of now, this application is just an ant, when we make requests
                    using popular APIs like Amazon, Google, PayPal, or better companies, we make the transaction using what we call an "isolated data exchange". Wow, more jargon?
                    Simply put, when you buy something we will have you do the entire process, which should not take more than one minute, and after you finish paying or selling we process it
                    on our server and do the neccessary updates. Keep in mind, we have to store your information from that popular API you used to further verify momentarily. After the transaction is finished, we delete, YES 100% will delete your billing
                    information, and anything related to using that popular API. We don't want data about you, because we have no interest in that type of data. 
                </p>
                <h4>So What Data Are You Interested In</h4>
                <p>
                    We are interested in data of our platform and that means we focus on the output (what you do) and not you (the input). 
                    You alone, using the website or application makes us happy because we collect data from your usage of just this website
                    and application. We know and have carefully observed other companies 
                    and what they do to secure their data and want to avoid what they have done wrong (hopefully); but here you can easily rest assured both ways.
                    In conclusion, anyone can see the analytics page to see how Kyaratar is doing.
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
export default class DataAndSafety extends Vue {
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