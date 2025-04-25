// 차트 색상 팔레트
const chartColors = {
  primary: '#6a3fe5',
  secondary: '#7a7a7a',
  success: '#34c759',
  warning: '#ffcc00',
  danger: '#ff3b30',
  info: '#5856d6',
  grid: '#e8e8e8',
  text: '#2c2c2c'
};

// 차트 옵션 기본 설정
const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 10,
      bottom: 10
    }
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: {
          size: 12,
          family: 'Inter'
        },
        color: chartColors.text,
        padding: 20,
        usePointStyle: true
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: chartColors.text,
      bodyColor: chartColors.text,
      borderColor: chartColors.grid,
      borderWidth: 1,
      padding: 10,
      titleFont: {
        size: 13,
        weight: '500'
      },
      bodyFont: {
        size: 12
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: chartColors.grid,
        drawBorder: false
      },
      ticks: {
        font: {
          size: 11
        },
        color: chartColors.secondary
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 11
        },
        color: chartColors.secondary
      }
    }
  }
};

// 차트 초기화 함수
function initializeCharts() {
  // 중량 추이 차트
  createWeightTrendChart();
  
  // R2값 트렌드 차트
  createR2TrendChart();
  
  // 오차 분포 차트
  createErrorDistributionChart();
  
  // 성공률 차트
  createSuccessRateChart();
  
  // FCR 차트
  createFCRChart();
}

// 중량 추이 차트 생성
function createWeightTrendChart() {
  const ctx = document.getElementById('weightTrendChart').getContext('2d');
  const chartContainer = ctx.canvas.parentElement;
  chartContainer.style.height = '300px';
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['04-18', '04-19', '04-20', '04-21', '04-22', '04-23', '04-24'],
      datasets: [
        {
          label: 'WM',
          data: [1520, 1545, 1580, 1620, 1650, 1670, 1680],
          borderColor: chartColors.primary,
          backgroundColor: 'transparent',
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5
        },
        {
          label: '체중계',
          data: [1530, 1560, 1600, 1710, 1720, 1765, 1765],
          borderColor: chartColors.success,
          backgroundColor: 'transparent',
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5
        },
        {
          label: 'WC',
          data: [1525, 1550, 1585, 1625, 1655, 1675, 1685],
          borderColor: chartColors.warning,
          backgroundColor: 'transparent',
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5
        }
      ]
    },
    options: {
      ...defaultChartOptions,
      scales: {
        ...defaultChartOptions.scales,
        y: {
          ...defaultChartOptions.scales.y,
          title: {
            display: true,
            text: '중량 (g)',
            font: {
              size: 12
            },
            color: chartColors.secondary
          }
        }
      }
    }
  });
}

// R2값 트렌드 차트 생성
function createR2TrendChart() {
  const ctx = document.getElementById('r2TrendChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['04-18', '04-19', '04-20', '04-21', '04-22', '04-23', '04-24'],
      datasets: [{
        label: 'R2',
        data: [0.980, 0.982, 0.985, 0.987, 0.988, 0.983, 0.985],
        borderColor: chartColors.primary,
        backgroundColor: 'transparent',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5
      }]
    },
    options: {
      ...defaultChartOptions,
      scales: {
        ...defaultChartOptions.scales,
        y: {
          ...defaultChartOptions.scales.y,
          min: 0.95,
          max: 1.0,
          ticks: {
            stepSize: 0.01
          },
          title: {
            display: true,
            text: 'R2 값',
            font: {
              size: 12
            },
            color: chartColors.secondary
          }
        }
      }
    }
  });
}

// 오차 분포 차트 생성
function createErrorDistributionChart() {
  const ctx = document.getElementById('errorDistributionChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['-120g~-80g', '-80g~-40g', '-40g~0g', '0g~40g', '40g~80g', '80g~120g'],
      datasets: [{
        label: '농장 수',
        data: [2, 5, 12, 15, 3, 1],
        backgroundColor: chartColors.primary,
        borderRadius: 4
      }]
    },
    options: {
      ...defaultChartOptions,
      scales: {
        ...defaultChartOptions.scales,
        y: {
          ...defaultChartOptions.scales.y,
          title: {
            display: true,
            text: '농장 수',
            font: {
              size: 12
            },
            color: chartColors.secondary
          }
        },
        x: {
          ...defaultChartOptions.scales.x,
          title: {
            display: true,
            text: '오차 범위',
            font: {
              size: 12
            },
            color: chartColors.secondary
          }
        }
      }
    }
  });
}

// 성공률 차트 생성
function createSuccessRateChart() {
  const ctx = document.getElementById('successRateChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['성공', '실패'],
      datasets: [{
        data: [92.8, 7.2],
        backgroundColor: [chartColors.success, chartColors.danger],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      },
      cutout: '70%'
    }
  });
}

// FCR 차트 생성
function createFCRChart() {
  const ctx = document.getElementById('fcrChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['H01', 'H02', 'H03', 'H04', 'H05'],
      datasets: [{
        label: 'FCR',
        data: [1.57, 1.62, 1.54, 1.59, 1.61],
        backgroundColor: chartColors.primary,
        borderRadius: 4
      }]
    },
    options: {
      ...defaultChartOptions,
      scales: {
        ...defaultChartOptions.scales,
        y: {
          ...defaultChartOptions.scales.y,
          min: 1.4,
          max: 1.8,
          title: {
            display: true,
            text: 'FCR',
            font: {
              size: 12
            },
            color: chartColors.secondary
          }
        },
        x: {
          ...defaultChartOptions.scales.x,
          title: {
            display: true,
            text: '동',
            font: {
              size: 12
            },
            color: chartColors.secondary
          }
        }
      }
    }
  });
}
