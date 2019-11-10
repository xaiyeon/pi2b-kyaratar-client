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
                <h4>Developer and Change Log (Static Page)</h4>
                <p>This is used as a development log for when the website is updated.</p>
                </div>
                <div class="q-pa-md">
                    <q-timeline responsive color="secondary">

                    <q-timeline-entry
                        title="Front-End Design and Project Break"
                        subtitle="December 9, 2018"
                        side="left"
                    >
                        <div>
                            Making the web application look modern and professional, while still working
                            on polishing the back-end. Project break to experiment with new technologies on
                            another project.
                        </div>
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="Addition of Subscription Plans and More Planning"
                        subtitle="December 6, 2018"
                        side="left"
                    >
                        <div>
                            Integration of trusted third-party payment APIs and planning of subscription based
                            micro-services that do not limit any site features. More planning of additional algorithms for
                            overall structure of the application.
                        </div>
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="Small Feature Polishing and Testing"
                        subtitle="November 7, 2018"
                        side="left"
                    >
                        <div>
                            Starting to polish and finish all skeleton features currently implemented and let
                            people test the application.
                        </div>
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="Settings and OnePage"
                        subtitle="October 30, 2018"
                        side="left"
                    >
                        <div>
                            User settings and more site settings being worked on and the implementation and
                            design on user OnePages.
                        </div>
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="Rankings and Spotlight"
                        subtitle="October 1, 2018"
                        side="left"
                    >
                        <div>
                            Character ranking features is being implemented with use of AI packages, and the Spotlight
                            page is in the works.
                        </div>
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="Groups and More"
                        subtitle="September 1, 2018"
                        side="left"
                    >
                        <div>
                            Started adding all the functionality that is planned for groups. Have some features
                            working, but still need polishing.
                        </div>
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="Database Design Re-Do"
                        subtitle="August 1, 2018"
                        side="left"
                    >
                        <div>
                            Redid the database design structure for better practices and security: not the best,
                            but better than before.
                        </div>
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="Refactor from JavaScript to TypeScript"
                        subtitle="July 15, 2018"
                        side="left"
                    >
                        <div>
                            I love OOP and strong static typing or moreso less, primitive data types -- kinda.
                        </div>
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="Features and Planning"
                        subtitle="July 1, 2018"
                        side="left"
                    >
                        <div>
                            Started adding features, which is mostly simple CRUD, and then design own
                            alogorithms for upcoming features that complement the database design.
                        </div>
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="Design and Architecture"
                        subtitle="June 1, 2018"
                        side="left"
                    >
                        <div>
                            Designing of the web application and what technologies to use. Sketched a
                            layout for what the site could look like, then design logo and more.
                        </div>
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="Domain Purchase and Development"
                        subtitle="May 15, 2018"
                        side="left"
                    >
                        <div>
                            Purchase of the Kyaratar.com domain name and initial start
                            of development.
                        </div>
                    </q-timeline-entry>
                    </q-timeline>
                </div>
                <br>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// use this as copy and paste for making .vue files, change name
@Component
export default class DevAndChangeLog extends Vue {
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