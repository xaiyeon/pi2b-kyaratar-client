<template>
  <div class="root scalepage">
    <div class="wholepage">
      <br>
      <div class="row">
        <div class="col">

        </div>
        <div class="col-lg-6">
          <div class="frontpage">
              <img class="responsive imagemax" src="@/assets/images/main/kyaratar-landv1.png" alt="">
              <div style="font-size: 1.2em; font-weight: 500; font-style: italic;">
                <center>Digitally coexisting in harmony.</center>
              </div>
              <br>
              <div class="text-white">
                <p class="q-pa-md">This website is currently in ALPHA phase. This is a side project that aims to deliver a future web 3.0 cross-platform application.
                  More details will come soon as work progresses...
                </p>
                <div class="q-pa-md">
                  <div class="q-pa-sm shadow-6">
                    <div>
                      <div class="showtext">
                        <span style="color: red; font-size:1.8em !important;">D</span>iscover
                      </div>
                      <div>
                        A plethora of unique characters that you have yet to know about.
                      </div>
                    </div>
                    <br>
                    <div>
                      <div class="showtext">
                        <span style="color: green; font-size:1.8em !important;">E</span>xperience
                      </div>
                      <div>
                        A thriving system with a foundation crafted with love and determination built for better.
                      </div>
                    </div>
                    <br>
                    <div>
                      <div class="showtext">
                        <span style="color: blue; font-size:1.8em !important;">A</span>cquire
                      </div>
                      <div>
                        A fated character whilst making new friends that may share what you like.
                      </div>
                    </div>
                    <br>
                    <div>
                      <div class="showtext">
                        <span style="color: gold; font-size:1.8em !important;">D</span>efine
                      </div>
                      <div>
                        A character and the fate of how that character contributed to the world before being forgotten.
                      </div>
                    </div>
                  </div>
                </div>
                <center>
                  <q-btn color="green-6" glossy class="" @click.native="navigateTo('home')" label="Enter"></q-btn>
                </center>
              </div>
          </div>
        </div>
        <div class="col">

        </div>
      </div>
      <br>
      <br>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';

// This is known as Root and is landing page

@Component
export default class Root extends Vue {
  public words = [
    {id: 1, s: 'Explore Characters' },
    {id: 2, s: 'Create Characters' },
    {id: 3, s: 'Collect Characters' },
    {id: 4, s: 'Battle Characters' },
  ];

  public navigateTo(e) {
      this.$router.push({
      name: e,
      });
  }

  // public startTime =

}
</script>

<style scoped lang="scss">

.showtext {
  font-size: 1.2em;
  font-weight: bold;
  font-style: italic;
}

.frontpage {
  display: block;
  margin: auto;
}

.scalepage {
  width: 100vw;
  height: 100vh;
  min-height: 100%;
}

.wholepage {
  min-height: 100%;
  background-size: cover;
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#e93cec+0,867fef+52,87e5ff+98 */
  background: #e93cec; /* Old browsers */
  background: -moz-linear-gradient(top, #e93cec 0%, #867fef 52%, #87e5ff 98%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, #e93cec 0%,#867fef 52%,#87e5ff 98%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, #e93cec 0%,#867fef 52%,#87e5ff 98%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e93cec', endColorstr='#87e5ff',GradientType=0 ); /* IE6-9 */  
}

.imagemax {
  min-width: 30vw;
  width: 25vw;
  display: block;
  margin: auto;
}
</style>