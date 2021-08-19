/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';

// material
import { Card, CardHeader, Box } from '@material-ui/core';
//
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------


function getOptions(xLabels) {
  return merge(BaseOptionChart(), {
    chart: { id: 'grouptrends' },
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: xLabels,
    xaxis: { type: 'datetime', lables: { format: 'HH:mm:ss' } },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} messages`;
          }
          return y;
        }
      }
    }
  });

}

const TIME_INTERVAL = 10000; // milli seconds
const LABEL_COUNT = 10;

function getTimeSeriesLabels() {
  let baseVal = Math.ceil((new Date().getTime() - (TIME_INTERVAL * (LABEL_COUNT - 1))) / 10000);
  baseVal *= 10000;
  console.log(baseVal);
  let i = 0;
  const labels = [];
  while (i < LABEL_COUNT) {
    const label = baseVal;
    baseVal += TIME_INTERVAL;
    labels.push(label);
    i += 1;
  }
  return labels;

}

function getChartData(trendsData, xLabels) {
  const chartData = [];
  trendsData.forEach((group, gKey) => {
    const grpData = {
      name: group.name,
      type: group.type,
      data: []
    }
    xLabels.forEach((label) => {
      let grpLabelCount = group.data.get(label);
      if (typeof grpLabelCount === "undefined") {
        grpLabelCount = 0;
      }
      grpData.data.push(grpLabelCount);
    });
    chartData.push(grpData);

  });
  return chartData;

}

function getInitialTrendsData(groupConfig) {

  const trendsData = new Map();
  groupConfig.forEach((val) => {
    const groupData = {
      name: val.name,
      type: val.type,
      data: new Map()
    }
    trendsData.set(val.name, groupData);
  });
  console.log(trendsData)
  return trendsData;
}

function GroupTrends(props, ref) {
  console.log('i am rendered');
  const groupConfig = window.$groupConfig;
  let xLabels = getTimeSeriesLabels();
  const trendsData = getInitialTrendsData(groupConfig);
  const chartOptions = getOptions(xLabels);
  let chartData = getChartData(trendsData, xLabels);

  useImperativeHandle(ref, () => ({
    addNewData(gt) {
      console.log('new data added');
      console.log(gt);
      trendsData.get(gt.group).data.set(gt.endTimeStamp, gt.msgCount);
      console.log(trendsData);
      console.log(chartData);
    }
  }), []);



  useEffect(() => {
    console.log(`initializing interval`);
    const interval = setInterval(() => {
      xLabels = getTimeSeriesLabels();
      chartData = getChartData(trendsData, xLabels);
      console.log(xLabels);
      console.log(chartData);
      ApexCharts.exec('grouptrends', 'updateOptions', {
        labels: xLabels
      });
      ApexCharts.exec('grouptrends', 'updateSeries', chartData);
    }, TIME_INTERVAL);

    return () => {
      console.log(`clearing interval`);
      clearInterval(interval);
    };
  });



  return (
    <Card>

      <CardHeader title="Group Trends" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}

export default forwardRef(GroupTrends);
