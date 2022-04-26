<template>
  <div>
    <div ref="myChart" style="height: 400px; " />
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  mounted() {
    const myChart = echarts.init(this.$refs.myChart)

    const option = {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ['product', '公寓', '别墅', '商铺'],
          ['1000', 10, 65, 3],
          ['2000', 21, 44, 5],
          ['3000', 55, 55, 10],
          ['4000', 65, 33, 65],
          ['5000', 4, 10, 32]
        ]
      },

      xAxis: { type: 'category' },
      yAxis: {},
      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
    }

    myChart.setOption(option)
  }
}
</script>

<style>

</style>
