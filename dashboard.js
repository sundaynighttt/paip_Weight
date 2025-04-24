// 페이지 로드 완료 시 실행
document.addEventListener('DOMContentLoaded', function() {
  // 모든 차트 초기화
  initWeightTrendChart();
  initR2TrendChart();
  initR2DistributionChart();
  initErrorDistributionChart();
  initSuccessRateChart();
  initFcrChart();
  initEnvironmentChart();
  
  // 이벤트 리스너 등록
  setupEventListeners();
});

// 이벤트 리스너 설정
function setupEventListeners() {
  // 필터 변경 이벤트
  document.getElementById('farm-select').addEventListener('change', updateDashboard);
  document.getElementById('dong-select').addEventListener('change', updateDashboard);
  document.getElementById('date-range').addEventListener('change', updateDashboard);
  
  // 새로고침 버튼 클릭 이벤트
  document.querySelector('.refresh-btn').addEventListener('click', refreshDashboard);
  
  // 카드 컨트롤 버튼 이벤트
  document.querySelectorAll('.control-btn').forEach(btn => {
    btn.addEventListener('click', handleCardControl);
  });
}

// 중량 추이 차트 초기화
function initWeightTrendChart() {
  const ctx = document.getElementById('weightTrendChart').getContext('2d');
  
  // 날짜 데이터 생성 (최근 10일)
  const dates = generateDates(10);
  
  // 물리 중량값과 계산 최종값 데이터 (예시)
  const physicalWeights = [1580, 1610, 1640, 1660, 1680, 1700, 1720, 1740, 1760, 1780];
  const calculatedWeights = [1590, 1620, 1650, 1670, 1690, 1710, 1730, 1750, 1770, 1790];
  
  // 차트 생성
  const weightTrendChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: '물리 중량',
          data: physicalWeights,
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        },
        {
          label: '계산 최종값',
          data: calculatedWeights,
          borderColor: '#2196f3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + context.raw + 'g';
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: '중량 (g)'
          }
        }
      }
    }
  });
}

// R2값 트렌드 차트 초기화
function initR2TrendChart() {
  const ctx = document.getElementById('r2TrendChart').getContext('2d');
  
  // 날짜 데이터 생성 (최근 10일)
  const dates = generateDates(10);
  
  // R2값 데이터 (예시)
  const r2Values = [0.975, 0.980, 0.985, 0.990, 0.995, 1.000, 1.005, 1.010, 1.015, 1.020];
  
  // 차트 생성
  const r2TrendChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'R2값',
          data: r2Values,
          borderColor: '#ff9800',
          backgroundColor: 'rgba(255, 152, 0, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'R2값'
          }
        }
      }
    }
  });
}

// 동별 R2값 분포 차트 초기화
function initR2DistributionChart() {
  const ctx = document.getElementById('r2DistributionChart').getContext('2d');
  
  // 동 데이터
  const dongs = ['H01', 'H02', 'H03', 'H04', 'H05'];
  
  // R2값 데이터 (예시)
  const r2Values = [0.985, 1.020, 0.990, 1.005, 0.975];
  
  // 차트 생성
  const r2DistributionChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dongs,
      datasets: [
        {
          label: 'R2값',
          data: r2Values,
          backgroundColor: [
            'rgba(76, 175, 80, 0.7)',
            'rgba(255, 87, 34, 0.7)',
            'rgba(33, 150, 243, 0.7)',
            'rgba(156, 39, 176, 0.7)',
            'rgba(255, 193, 7, 0.7)'
          ],
          borderColor: [
            'rgba(76, 175, 80, 1)',
            'rgba(255, 87, 34, 1)',
            'rgba(33, 150, 243, 1)',
            'rgba(156, 39, 176, 1)',
            'rgba(255, 193, 7, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return 'R2값: ' + context.raw;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 0.9,
          max: 1.1,
          title: {
            display: true,
            text: 'R2값'
          }
        }
      }
    }
  });
}

// 오차 분포 차트 초기화
function initErrorDistributionChart() {
  const ctx = document.getElementById('errorDistributionChart').getContext('2d');
  
  // 오차 범위 데이터
  const errorRanges = ['0-20g', '21-40g', '41-60g', '61-80g', '81-100g', '100g+'];
  
  // 오차 분포 데이터 (예시)
  const errorDistribution = [45, 25, 15, 8, 5, 2];
  
  // 차트 생성
  const errorDistributionChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: errorRanges,
      datasets: [
        {
          label: '오차 분포',
          data: errorDistribution,
          backgroundColor: [
            'rgba(76, 175, 80, 0.7)',
            'rgba(76, 175, 80, 0.7)',
            'rgba(255, 235, 59, 0.7)',
            'rgba(255, 235, 59, 0.7)',
            'rgba(255, 87, 34, 0.7)',
            'rgba(244, 67, 54, 0.7)'
          ],
          borderColor: [
            'rgba(76, 175, 80, 1)',
            'rgba(76, 175, 80, 1)',
            'rgba(255, 235, 59, 1)',
            'rgba(255, 235, 59, 1)',
            'rgba(255, 87, 34, 1)',
            'rgba(244, 67, 54, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return '비율: ' + context.raw + '%';
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '비율 (%)'
          }
        }
      }
    }
  });
}

// 성공률 차트 초기화
function initSuccessRateChart() {
  const ctx = document.getElementById('successRateChart').getContext('2d');
  
  // 성공률 차트 생성 (도넛 차트)
  const successRateChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['성공 (80g 이내)', '실패 (80g 초과)'],
      datasets: [
        {
          data: [92.8, 7.2],
          backgroundColor: [
            'rgba(76, 175, 80, 0.7)',
            'rgba(244, 67, 54, 0.7)'
          ],
          borderColor: [
            'rgba(76, 175, 80, 1)',
            'rgba(244, 67, 54, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.raw + '%';
            }
          }
        }
      }
    }
  });
}

// FCR 차트 초기화
function initFcrChart() {
  const ctx = document.getElementById('fcrChart').getContext('2d');
  
  // 동 데이터
  const dongs = ['H01', 'H02', 'H03', 'H04', 'H05'];
  
  // FCR 데이터 (예시)
  const fcrValues = [1.52, 1.57, 1.49, 1.55, 1.60];
  
  // 목표 FCR
  const targetFcr = 1.55;
  
  // 차트 생성
  const fcrChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dongs,
      datasets: [
        {
          label: 'FCR',
          data: fcrValues,
          backgroundColor: fcrValues.map(value => 
            value <= targetFcr ? 'rgba(76, 175, 80, 0.7)' : 'rgba(255, 87, 34, 0.7)'
          ),
          borderColor: fcrValues.map(value => 
            value <= targetFcr ? 'rgba(76, 175, 80, 1)' : 'rgba(255, 87, 34, 1)'
          ),
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return 'FCR: ' + context.raw;
            }
          }
        },
        annotation: {
          annotations: {
            line1: {
              type: 'line',
              yMin: targetFcr,
              yMax: targetFcr,
              borderColor: 'rgba(0, 0, 0, 0.5)',
              borderWidth: 2,
              borderDash: [5, 5],
              label: {
                content: '목표 FCR: ' + targetFcr,
                enabled: true,
                position: 'end'
              }
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 1.4,
          max: 1.7,
          title: {
            display: true,
            text: 'FCR'
          }
        }
      }
    }
  });
}

// 환경 데이터 차트 초기화
function initEnvironmentChart() {
  const ctx = document.getElementById('environmentChart').getContext('2d');
  
  // 날짜 데이터 생성 (최근 7일)
  const dates = generateDates(7);
  
  // 온도 및 습도 데이터 (예시)
  const temperatures = [24.5, 25.2, 24.8, 25.5, 26.1, 25.7, 25.3];
  const humidity = [65, 68, 70, 67, 64, 66, 69];
  
  // 차트 생성
  const environmentChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: '온도 (°C)',
          data: temperatures,
          borderColor: '#ff5722',
          backgroundColor: 'rgba(255, 87, 34, 0.1)',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          yAxisID: 'y'
        },
        {
          label: '습도 (%)',
          data: humidity,
          borderColor: '#2196f3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: '온도 (°C)'
          },
          min: 20,
          max: 30
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: {
            drawOnChartArea: false
          },
          title: {
            display: true,
            text: '습도 (%)'
          },
          min: 50,
          max: 90
        }
      }
    }
  });
}

// 날짜 생성 함수 (최근 n일)
function generateDates(days) {
  const dates = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    dates.push(date.getMonth() + 1 + '/' + date.getDate());
  }
  
  return dates;
}

// 대시보드 업데이트 함수
function updateDashboard() {
  // 선택된 필터 값 가져오기
  const farmId = document.getElementById('farm-select').value;
  const dongId = document.getElementById('dong-select').value;
  const dateRange = document.getElementById('date-range').value;
  
  // 실제 구현에서는 이 값들을 사용하여 서버에서 데이터를 가져와 차트를 업데이트
  console.log('대시보드 업데이트:', { farmId, dongId, dateRange });
  
  // 필터 변경 시 로딩 표시 및 업데이트 애니메이션 추가
  showLoading(true);
  
  // 실제 구현에서는 서버 요청 후 응답을 받아 처리
  // 여기서는 시뮬레이션을 위해 setTimeout 사용
  setTimeout(() => {
    // 차트 업데이트 로직이 들어갈 자리
    
    // 로딩 숨기기
    showLoading(false);
  }, 1000);
}

// 대시보드 새로고침 함수
function refreshDashboard() {
  // 모든 차트 다시 초기화
  showLoading(true);
  
  // 실제 구현에서는 서버 요청 후 응답을 받아 처리
  // 여기서는 시뮬레이션을 위해 setTimeout 사용
  setTimeout(() => {
    initWeightTrendChart();
    initR2TrendChart();
    initR2DistributionChart();
    initErrorDistributionChart();
    initSuccessRateChart();
    initFcrChart();
    initEnvironmentChart();
    
    // 로딩 숨기기
    showLoading(false);
  }, 1500);
}

// 카드 컨트롤 버튼 핸들러
function handleCardControl(event) {
  const button = event.currentTarget;
  const card = button.closest('.dashboard-card');
  const icon = button.querySelector('i');
  
  // 확장 버튼 처리
  if (icon.classList.contains('fa-expand')) {
    // 카드 확장 로직
    console.log('카드 확장:', card.className);
    
    // 실제 구현에서는 모달 또는 전체 화면으로 확장
    alert('카드 확장 기능은 아직 구현되지 않았습니다.');
  }
  
  // 다운로드 버튼 처리
  else if (icon.classList.contains('fa-download')) {
    // 데이터 다운로드 로직
    console.log('데이터 다운로드:', card.className);
    
    // 실제 구현에서는 CSV 또는 Excel 형식으로 다운로드
    alert('데이터 다운로드 기능은 아직 구현되지 않았습니다.');
  }
}

// 로딩 표시 함수
function showLoading(show) {
  let loadingOverlay = document.querySelector('.loading-overlay');
  
  if (!loadingOverlay && show) {
    // 로딩 오버레이 생성
    loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    
    loadingOverlay.appendChild(spinner);
    document.body.appendChild(loadingOverlay);
    
    // 스타일 추가
    const style = document.createElement('style');
    style.textContent = `
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }
      
      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(0, 102, 204, 0.2);
        border-radius: 50%;
        border-top-color: #0066cc;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
  
  if (loadingOverlay) {
    loadingOverlay.style.display = show ? 'flex' : 'none';
  }
}
