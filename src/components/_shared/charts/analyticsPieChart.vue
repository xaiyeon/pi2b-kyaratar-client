<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Pie } from 'vue-chartjs';

// use this as copy and paste for making .vue files, change name
@Component
export default class AnalyticsPieChart extends Pie {
    // data can just be define here using public
    @Prop()
    public chartData!: any;

    @Prop()
    public options!: any;

    public mounted() {
        this.renderChart(this.chartData, this.options);
        console.log(this.chartData);
    }

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

</style>