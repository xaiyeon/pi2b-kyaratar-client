<template>
    <div>
        <q-layout>
            <q-page-container>
                <q-page>
                    <div class="row topHeading">
                        <div class="col-lg-12">
                            <div class="">
                                <div class="float-left">
                                    <div class="q-pa-md">
                                            <transition
                                            appear
                                            enter-active-class="animated fadeIn"
                                            leave-active-class="animated fadeOut"
                                            >
                                            <!-- Wrapping only one DOM element, defined by QBtn -->
                                                <q-chip square color="primary">< Imagination is Endless > | Find Kyaratar Online: </q-chip>
                                            </transition>
                                    </div> 
                                </div>
                                <div class="float-right">
                                    <div class="q-pa-md">
                                        <q-chip square color="tertiary">Need Help? kyaratarhelpdesk@gmail.com</q-chip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="row shadow-6">
                        <div class="col-lg-12">
                            <div class="backgroundFixing" :style="{'background-image': 'url(' + require('@/assets/images/main/Explore_1.png') + ')'}">
                                <q-jumbotron>
                                    <div class="q-pa-lg">
                                        <div>
                                            <span class="whiteBig">Welcome Honorable Guest,</span>
                                            <br>
                                            <span style="color: whitesmoke;">Kyaratar is a multi-platform application that aims to connect
                                                the dead and non-existant characters to the present day in a meaningful and fun manner.
                                                <br>
                                                We do this in a number of ways:
                                                <ul>
                                                    <li>
                                                        We are a user invite-only platform that accepts character suggestions freely
                                                    </li>
                                                    <li>
                                                        We utilize Artificial Intelligence and our well-crafted algorithms to define character entities
                                                    </li>
                                                    <li>
                                                        We designed features that are useful to our users, the community
                                                    </li>
                                                    <li>
                                                        We research history-proven methods and integrate them into the system
                                                    </li>
                                                </ul>
                                            </span>
                                        </div>
                                    </div>
                                </q-jumbotron>
                            </div>                            
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div>
                                <q-parallax :src="require('@/assets/images/main/black_mountain.gif')" :height="auto">
                                    <div style="text-align: center; z-index: 3; color: white; padding-top: 20em">
                                        <div style="font-size: 3em; font-weight: bold;">
                                            THE WORLD OF KYARATAR
                                        </div>
                                        You can do things like...
                                    </div>
                                    <br>
                                    <img class="imageBlack" src="@/assets/images/main/team_black.png" alt="">
                                </q-parallax>
                            </div>
                        </div>
                    </div>
                    <div class="row blackout flex wrap">
                        <div class="col-sm-3">
                            <q-card>
                            <q-card-title>
                                <div class="beCenter">
                                    <img class="responsive" :src="require('@/assets/images/main/friend-show.gif')" alt="">
                                    <br>
                                    <span class="cardHeader1">Make New Friends!</span>
                                </div>
                            </q-card-title>
                            <q-card-separator />
                            <q-card-main class="cardContentOver">
                                Make authentic real friends! Never worry about being friends
                                with a fake bot user due to our special invite system!
                            </q-card-main>
                            </q-card>
                        </div>
                        <div class="col-sm-3">
                            <q-card>
                            <q-card-title>
                                <div class="beCenter">
                                    <img class="responsive" :src="require('@/assets/images/main/tfc-show.gif')" alt="">
                                    <br>
                                    <span class="cardHeader2">Favorite Characters!</span>
                                </div>
                            </q-card-title>
                            <q-card-separator />
                            <q-card-main class="cardContentOver">
                                Explore over billions of character entities from all over the world.
                                Show your love for your chosen favorite characters!
                            </q-card-main>
                            </q-card>
                        </div>
                        <div class="col-sm-3">
                            <q-card>
                            <q-card-title>
                                <div class="beCenter">
                                    <img class="responsive" :src="require('@/assets/images/main/group-show.gif')" alt="">
                                    <br>
                                    <span class="cardHeader3">Join Groups!</span>
                                </div>
                            </q-card-title>
                            <q-card-separator />
                            <q-card-main class="cardContentOver">
                                Take the friendship to a whole nother level with many group features.
                                Join a group with similar-minded people and prosper!
                            </q-card-main>
                            </q-card>
                        </div>
                        <div class="col-sm-3">
                            <q-card>
                            <q-card-title>
                                <div class="beCenter">
                                    <img class="responsive" :src="require('@/assets/images/main/page-show.gif')" alt="">
                                    <br>
                                    <span class="cardHeader4">Build A OnePage!</span>
                                </div>
                            </q-card-title>
                            <q-card-separator />
                            <q-card-main class="cardContentOver">
                                Personalize your own OnePage that expresses yourself.
                                Show the world what you do as a passion or become a meme legend!
                            </q-card-main>
                            </q-card>
                        </div>
                        <!-- <div class="col-sm-12">
                            <div class="q-pa-md">
                                <q-card inline style="width: 23vw">
                                <q-card-title>
                                    <div class="beCenter">
                                        <img class="responsive" :src="require('@/assets/images/main/friend-show.gif')" alt="">
                                        <br>
                                        <span class="cardHeader1">Make New Friends!</span>
                                    </div>
                                </q-card-title>
                                <q-card-separator />
                                <q-card-main class="cardContentOver">
                                    Make authentic real friends! Never worry about being friends
                                    with a fake bot user due to our special invite system!
                                </q-card-main>
                                </q-card>
                                <q-card inline style="width: 23vw">
                                <q-card-title>
                                    <div class="beCenter">
                                        <img class="responsive" :src="require('@/assets/images/main/tfc-show.gif')" alt="">
                                        <br>
                                        <span class="cardHeader2">Favorite Characters!</span>
                                    </div>
                                </q-card-title>
                                <q-card-separator />
                                <q-card-main class="cardContentOver">
                                    Explore over billions of character entities from all over the world.
                                    Show your love for your chosen favorite characters!
                                </q-card-main>
                                </q-card>
                                <q-card inline style="width: 23vw">
                                <q-card-title>
                                    <div class="beCenter">
                                        <img class="responsive" :src="require('@/assets/images/main/group-show.gif')" alt="">
                                        <br>
                                        <span class="cardHeader3">Join Groups!</span>
                                    </div>
                                </q-card-title>
                                <q-card-separator />
                                <q-card-main class="cardContentOver">
                                    Take the friendship to a whole nother level with many group features.
                                    Join a group with similar-minded people and prosper!
                                </q-card-main>
                                </q-card>
                                <q-card inline style="width: 23vw">
                                <q-card-title>
                                    <div class="beCenter">
                                        <img class="responsive" :src="require('@/assets/images/main/page-show.gif')" alt="">
                                        <br>
                                        <span class="cardHeader4">Build A OnePage!</span>
                                    </div>
                                </q-card-title>
                                <q-card-separator />
                                <q-card-main class="cardContentOver">
                                    Personalize your own OnePage that expresses yourself.
                                    Show the world what you do as a passion or become a meme legend!
                                </q-card-main>
                                </q-card>
                            </div>
                        </div> -->
                    </div>
                    <div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="manyBreak q-pa-sm">
                                    <br>
                                    <span class="hvr-pulse-grow">THAT'S NOT ALL: THERE ARE MANY MORE FEATURES!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div>
                                <q-parallax :src="require('@/assets/images/main/Explain_1.png')" :height="auto">
                                    <h3>
                                        Kyaratar is Fun and Joining is Easy!
                                    </h3>
                                    <div class="scroller">
                                        <img class="responsive shadow-6" src="@/assets/images/main/how_to_kyara.png" alt="">
                                    </div>
                                </q-parallax>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="manyBreak q-pa-sm">
                                    <span class="hvr-pulse-grow">
                                        <span class="rainbowWow">SO WHAT ARE YOU WAITING FOR?</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div>
                                <q-parallax :src="require('@/assets/images/main/join_bg.gif')" :height="auto">
                                    <h3>
                                        <img class="responsive imagePos" src="@/assets/images/main/do_it.png" alt="">
                                    </h3>
                                    <div class="">
                                        <q-btn color="tertiary" size="xl" label="Register today, it is free!" @click="navigateTo('register')"></q-btn>
                                    </div>
                                </q-parallax>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="row">
                        <div class="col-lg-6">
                            <div class=" q-pa-lg">
                                <div>
                                    Welcome guest! <span> Consider </span> <span style="font-size:1.3em; font-weight: bold;"> registering </span> <span> to unlock the features </span>
                                    <span style="color: red"> AND your potential!</span>
                                </div>
                                <div>
                                    <h4>Why should you register?</h4>
                                    <img class="responsive shadow-6" src="@/assets/images/main/kyaratar-why-register-img1.jpg" alt="">
                                    <br>
                                    <p>You can now register upon special permission! I (creator) hope to innovate only the best ideas and methods from history to forge the best community. 
                                        We will be transparent: no complex rules;
                                        life is simple, so we strive for simplicity and tackle the difficult problems together. Kyaratar is more than just a character database, it's a 
                                        future entity to be a part of.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="q-pa-lg">
                                <br>
                                <h4>Please Explain Kyaratar: What is it?</h4>
                                <img class="responsive shadow-6" src="@/assets/images/main/what-is-kyaratar-img2.jpg" alt="">
                                <br>
                                <p>
                                    Our system will help define yourself and pre-existing characters created by our users, humans, and anyone that possess the cognitive ability to register, read,
                                    and think.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="q-pa-lg">
                                <div style="text-align: center">
                                    <p>What are you waiting for? Oh, an invite key? Ask someone within the community or an admin, it's pretty simple.</p>
                                    <p>Get an invite key and register now!</p>
                                    <q-btn color="tertiary" size="lg" label="Register" @click="navigateTo('register')"></q-btn>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </q-page>
            </q-page-container>
        </q-layout>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// use this as copy and paste for making .vue files, change name
@Component
export default class Welcome extends Vue {
    // data can just be define here using public

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

$cardHeaderSize: 1.7em;

.beCenter {
    text-align: center;
}

.blackout {
    background: rgba($color: #000000, $alpha: 1.0);
}

.imageBlack {
    position: absolute;
    top: -40px;
    left: 0px;
    right: 0px;
}

.imagePos {
    position: absolute;
    top: -100px;
    left: 0px;
    right: 0px;
}

.scroller {
    overflow-y: scroll;
}

@keyframes rainbow{
	0%{
		color: #ff000090;
	}
	16.7%{
		color: #FFA50090;
	}
	33.3%{
		color: #ffff0090;
	}
	50%{
		color: #0000ff90;
	}
	66.7%{
		color: #00ff0090;
	}
	83.4%{
		color: #00416A90;
	}
	100%{
		color: #EE82EE90;
	}
}

.rainbowWow {
	color: #ff000090;
	animation-name: rainbow;
	animation-duration: 1.75s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
	animation-delay: .25s;
}

.cardHeader1 {
    font-weight: bold;
    font-size: $cardHeaderSize;
    color: rgb(48, 134, 47);
}

.cardHeader2 {
    font-weight: bold;
    font-size: $cardHeaderSize;
    color: rgb(119, 51, 51);
}

.cardHeader3 {
    font-weight: bold;
    font-size: $cardHeaderSize;
    color: rgb(155, 67, 150);
}

.cardHeader4 {
    font-weight: bold;
    font-size: $cardHeaderSize;
    color: rgb(39, 89, 151);
}

.manyBreak {
    text-align: center;
    font-size: 2.0em;
    font-weight: bold;
    background: rgba($color: #000000, $alpha: 1.0);
    color: white;    
}

.cardContentOver {
    float: left !important;
    color: white;
    font-size: 1.3em;
}

.topHeading {
    font-size: 1.1em;
    font-weight: 500;
    background: rgba($color: #ffffff, $alpha: 1.0);
    color: black;
}

.backgroundFixing {
    background-repeat: no-repeat;
    background-size: cover;
}

.whiteBig {
    font-size: 1.3em;
    color: whitesmoke;
    font-weight: bold;
}

</style>