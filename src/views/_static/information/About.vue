<template>
  <div class="about">
    <div class="row flex">
      <div class="col-md-6">
        <div class="q-pa-lg">
          <h4>Overview of Kyaratar</h4>
          <p>Delivering a unique experience for every single character!</p>
        </div>
      </div>
      <div class="col-md-6">
        <div class="q-pa-lg">
          <h4>From The Founder</h4>
          <p>I talk about what I am doing with this project.</p>
          <div class="responsive text-center">
              <youtube :player-vars="videoOptions" :video-id="videoId"></youtube>
          </div>   
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="q-pa-lg">
          <h4>Branding of Kyaratar</h4>
          <p>The logo of Kyaratar is simple. I designed it to have an emphasis on playfulness but also curiosity. Those two themes naturally
            made sense to include a magnifying glass with an outline of a character holding the handle. You have to imagine the character holding it to
            get the picture. As a mention, recently I always try to use the golden ratio for logo design work, so there is a bit of that in it.
          </p>
          <p>The name Kyaratar was difficult to come up with. As you all know, it takes very intelligent and creative thinking to still be able to find
            a website name in the .com domain. Luckily, I mashed the Japanese word for character, and mixed the English words of character and curator together, and
            came up with Kyaratar. To my surprise, it was available. Right now, this to me, means it was destined to be in my ownership, and I will do my best in creating
            this.
          </p>
        </div>
      </div>
      <div class="col-md-6">
        <div>
          <img class="responsive imagemax" src="@/assets/images/main/kyaratar-landv1.png" alt="">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="q-pa-lg">
          <h4>History of Kyaratar</h4>
          <p>An idea thought about during elementary school during 5th grade in 2004.
            I remember it was during a warm day in the musky classroom that had barely working air conditioning, my classmates and I did journal activities, and at the
            time, I wished there was a game or such that allowed anyone to have their own creative character in a story played out in a game. 14 years later, not much has changed, but now I'm going to try
            and make that wish a reality. Kyaratar will span multiple fields of expertise as well to merge within.
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
export default class About extends Vue {
    // data can just be define here using public
    public videoId = 'n8wVQdw0ywc';
    public videoOptions = {
        start: 0,
        autoplay: 0,
    };

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

</style>
