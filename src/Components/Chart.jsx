import React, { useRef } from 'react';
import moment from 'moment';

import { Line } from 'react-chartjs-2';

function Chart({ coinData }) {
  const chartRef = useRef(null);

  const data = (canvas) => {
    const ctx = canvas.getContext('2d');
    const BTCGradient = ctx.createLinearGradient(1300, 0, 30, 0);
    BTCGradient.addColorStop(0, 'rgba(255, 113, 68, 0.1)');
    BTCGradient.addColorStop(0.095, 'rgba(255, 137, 121, 1)');
    BTCGradient.addColorStop(0.24, 'rgba(255, 77, 202, 1)');
    BTCGradient.addColorStop(0.44, 'rgba(233, 48, 255, 1)');
    BTCGradient.addColorStop(0.94, 'rgba(228, 77, 136, 1)');
    BTCGradient.addColorStop(0.97, 'rgba(227, 78, 129, 0.59)');
    BTCGradient.addColorStop(1, 'rgba(227, 80, 122, 0.1)');

    const LTCGradient = ctx.createLinearGradient(1300, 0, 30, 0);
    LTCGradient.addColorStop(0.04, 'rgba(193, 99, 100, 0.2)');
    LTCGradient.addColorStop(0.088, 'rgba(193, 108, 103, 0.56)');
    LTCGradient.addColorStop(0.124, 'rgba(193, 113, 104, 1)');
    LTCGradient.addColorStop(0.828, 'rgba(193, 222, 139, 1)');
    LTCGradient.addColorStop(0.871, 'rgba(193, 233, 143, 1)');
    LTCGradient.addColorStop(0.929, 'rgba(193, 239, 145, 0.9)');
    LTCGradient.addColorStop(1, 'rgba(193, 247, 147, 0.9)');

    const ETHGradient = ctx.createLinearGradient(1300, 0, 30, 0);
    ETHGradient.addColorStop(0, 'rgba(255, 184, 68, 0)');
    ETHGradient.addColorStop(0.06, 'rgba(231, 155, 119, 0.14)');
    ETHGradient.addColorStop(0.13, ' rgba(207, 125, 172, 0.69)');
    ETHGradient.addColorStop(0.24, 'rgba(169, 77, 255, 0.65)');
    ETHGradient.addColorStop(0.54, 'rgba(177, 255, 114, 1)');
    ETHGradient.addColorStop(0.77, 'rgba(80, 194, 241, 1)');
    ETHGradient.addColorStop(0.88, 'rgba(98, 160, 255, 1)');
    ETHGradient.addColorStop(0.94, 'rgba(94, 129, 233, 1)');
    ETHGradient.addColorStop(1, 'rgba(255, 16, 209, 0)');
    return {
      labels: coinData?.timestamp.map((t) => {
        return `${moment(t).startOf('minutes').fromNow()} - ${moment(t).format(
          'LT'
        )}`;
      }),
      datasets: [
        {
          label: 'BTC',
          fill: 'none',
          lineTension: 0.5,
          backgroundColor: BTCGradient,
          borderColor: BTCGradient,
          borderWidth: 4,
          data: coinData.btc,
          pointHoverBackgroundColor: BTCGradient,
          pointHoverBorderColor: BTCGradient,
          pointHoverRadius: 40,
        },
        {
          label: 'ETH',
          hidden: true,
          lineTension: 0.5,
          backgroundColor: ETHGradient,
          borderColor: ETHGradient,
          borderWidth: 4,
          data: coinData.eth,
          pointHoverBackgroundColor: ETHGradient,
          pointHoverBorderColor: ETHGradient,
          pointHoverRadius: 40,
        },
        {
          label: 'LTC',
          hidden: true,
          lineTension: 0.5,
          backgroundColor: LTCGradient,
          borderColor: LTCGradient,
          borderWidth: 4,
          data: coinData.ltc,
          pointHoverBackgroundColor: LTCGradient,
          pointHoverBorderColor: LTCGradient,
          pointHoverRadius: 40,
        },
      ],
    };
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'start',
        padding: 50,
        labels: {
          fillStyle: 'red',
          usePointStyle: true,
          fill: 'red',
          pointStyle: 'circle',
          boxWidth: 8,
          boxHeight: 8,
          padding: 60,
          color: '#59588D',
          font: 14,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          font: 'HelveticaNeue',
          color: '#59588D',
        },
      },
      x: {
        display: false,
        ticks: {
          font: 'HelveticaNeue',
          color: '#59588D',
        },
      },
    },
  };
  return (
    <div className='chart-container'>
      <Line id='myChart' ref={chartRef} data={data} options={options} />
    </div>
  );
}

export default Chart;
