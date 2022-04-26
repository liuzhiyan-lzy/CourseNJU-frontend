<template>
  <div ref="myChart" style="height: 400px; " />

</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted() {
    const myChart = echarts.init(this.$refs.myChart)

    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: '公寓' },
            { value: 735, name: '别墅' },
            { value: 580, name: '商铺' }
          ]
        }
      ]
    }

    option && myChart.setOption(option)
  }
}
</script>

<style>

</style>
