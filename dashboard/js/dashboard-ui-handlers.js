// UI 이벤트 핸들러 및 업데이트 함수들

// 컨트롤 버튼 이벤트 설정
function setupControlButtons() {
  // 확장 버튼
  document.querySelectorAll('.control-btn .fa-expand').forEach(btn => {
    btn.parentElement.addEventListener('click', function() {
      const card = this.closest('.dashboard-card');
      toggleFullscreen(card);
    });
  });
  
  // 다운로드 버튼
  document.querySelectorAll('.control-btn .fa-download').forEach(btn => {
    btn.parentElement.addEventListener('click', function() {
      const card = this.closest('.dashboard-card');
      downloadCardData(card);
    });
  });
}

// 전체화면 토글
function toggleFullscreen(element) {
  if (!document.fullscreenElement) {
    element.requestFullscreen().catch(err => {
      console.error('전체화면 전환 실패:', err);
    });
  } else {
    document.exitFullscreen();
  }
}

// 카드 데이터 다운로드
function downloadCardData(card) {
  // 차트 데이터 추출
  const canvas = card.querySelector('canvas');
  if (canvas) {
    const link = document.createElement('a');
    link.download = `${card.querySelector('h3').textContent}_${new Date().toISOString().slice(0, 10)}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
  
  // 테이블 데이터 추출
  const table = card.querySelector('table');
  if (table) {
    const csv = tableToCSV(table);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.download = `${card.querySelector('h3').textContent}_${new Date().toISOString().slice(0, 10)}.csv`;
    link.href = URL.createObjectURL(blob);
    link.click();
  }
}

// 테이블을 CSV로 변환
function tableToCSV(table) {
  const rows = Array.from(table.querySelectorAll('tr'));
  return rows.map(row => {
    const cells = Array.from(row.querySelectorAll('th, td'));
    return cells.map(cell => {
      // 셀 내용에서 쉼표와 줄바꿈 처리
      let content = cell.textContent.trim();
      if (content.includes(',') || content.includes('\n')) {
        content = `"${content.replace(/"/g, '""')}"`;
      }
      return content;
    }).join(',');
  }).join('\n');
}

// 농장 모니터 업데이트
function updateFarmMonitor(data) {
  const grid = document.querySelector('.farm-status-grid');
  
  // 헤더 행 유지하고 데이터 행만 초기화
  const headerRow = grid.querySelector('.farm-status-row.header');
  grid.innerHTML = '';
  grid.appendChild(headerRow);
  
  // 데이터 행 추가
  data.forEach(item => {
    const row = createFarmStatusRow(item);
    grid.appendChild(row);
  });
}

// 농장 상태 행 생성
function createFarmStatusRow(data) {
  const row = document.createElement('div');
  row.className = 'farm-status-row';
  
  row.innerHTML = `
    <div class="farm-col">${data.farm}</div>
    <div class="dong-col">${data.dong}</div>
    <div class="days-col">${data.days}</div>
    <div class="wm-col">${formatWeight(data.wm)}</div>
    <div class="scale-col">${formatWeight(data.scale)}</div>
    <div class="error-col ${data.status.toLowerCase()}">${formatError(data.error)}</div>
    <div class="status-col">
      <span class="status-badge ${data.status.toLowerCase()}">${data.status}</span>
    </div>
  `;
  
  return row;
}

// 알림 목록 업데이트
function updateNotifications(notifications) {
  const list = document.querySelector('.notification-list');
  list.innerHTML = '';
  
  notifications.forEach(item => {
    const notification = createNotificationItem(item);
    list.appendChild(notification);
  });
}

// 알림 항목 생성
function createNotificationItem(data) {
  const item = document.createElement('div');
  item.className = `notification-item ${data.type}`;
  
  const iconMap = {
    error: 'fa-exclamation-circle',
    warning: 'fa-exclamation-triangle',
    info: 'fa-info-circle'
  };
  
  item.innerHTML = `
    <div class="notification-icon">
      <i class="fas ${iconMap[data.type]}"></i>
    </div>
    <div class="notification-content">
      <div class="notification-title">${data.title}</div>
      <div class="notification-desc">${data.desc}</div>
      <div class="notification-time">${data.time}</div>
    </div>
  `;
  
  return item;
}

// 오차 통계 업데이트
function updateErrorStats(stats) {
  // 평균 오차 업데이트
  const avgError = document.querySelector('.error-stats .error-stat-item:nth-child(1) .error-stat-value');
  if (avgError) avgError.textContent = formatError(stats.average);
  
  // 최대 오차 업데이트
  const maxError = document.querySelector('.error-stats .error-stat-item:nth-child(2) .error-stat-value');
  if (maxError) maxError.textContent = formatError(stats.max);
  
  // 최소 오차 업데이트
  const minError = document.querySelector('.error-stats .error-stat-item:nth-child(3) .error-stat-value');
  if (minError) minError.textContent = formatError(stats.min);
  
  // 게이지 바 업데이트
  updateErrorGauges(stats);
}

// 오차 게이지 업데이트
function updateErrorGauges(stats) {
  const avgGauge = document.querySelector('.error-stats .error-stat-item:nth-child(1) .error-gauge-bar');
  const maxGauge = document.querySelector('.error-stats .error-stat-item:nth-child(2) .error-gauge-bar');
  const minGauge = document.querySelector('.error-stats .error-stat-item:nth-child(3) .error-gauge-bar');
  
  if (avgGauge) {
    const avgPercent = (Math.abs(stats.average) / 150) * 100; // 150g 기준
    avgGauge.style.width = `${Math.min(avgPercent, 100)}%`;
  }
  
  if (maxGauge) {
    const maxPercent = (Math.abs(stats.max) / 150) * 100;
    maxGauge.style.width = `${Math.min(maxPercent, 100)}%`;
  }
  
  if (minGauge) {
    const minPercent = (Math.abs(stats.min) / 150) * 100;
    minGauge.style.width = `${Math.min(minPercent, 100)}%`;
  }
}

// 성공률 통계 업데이트
function updateSuccessRateStats(stats) {
  const totalRate = document.querySelector('.success-stat-item:nth-child(1) .success-stat-value');
  const breedingRate = document.querySelector('.success-stat-item:nth-child(2) .success-stat-value');
  const shippingRate = document.querySelector('.success-stat-item:nth-child(3) .success-stat-value');
  
  if (totalRate) totalRate.textContent = formatPercentage(stats.total);
  if (breedingRate) breedingRate.textContent = formatPercentage(stats.breeding);
  if (shippingRate) shippingRate.textContent = formatPercentage(stats.shipping);
}

// 로딩 상태 표시
function showLoading(element) {
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.innerHTML = `
    <div class="loading-spinner">
      <i class="fas fa-spinner fa-spin"></i>
    </div>
  `;
  element.appendChild(overlay);
}

// 로딩 상태 제거
function hideLoading(element) {
  const overlay = element.querySelector('.loading-overlay');
  if (overlay) {
    overlay.remove();
  }
}

// 에러 메시지 표시
function showError(element, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.innerHTML = `
    <i class="fas fa-exclamation-triangle"></i>
    <span>${message}</span>
  `;
  element.appendChild(errorDiv);
}

// 에러 메시지 제거
function hideError(element) {
  const errorDiv = element.querySelector('.error-message');
  if (errorDiv) {
    errorDiv.remove();
  }
}

// 데이터 새로고침
function refreshDashboardData() {
  // 농장 모니터 데이터 새로고침
  loadFarmMonitorData();
  
  // 차트 데이터 새로고침
  refreshCharts();
  
  // 알림 데이터 새로고침
  loadNotificationData();
}

// 자동 새로고침 설정
function setupAutoRefresh(interval = 300000) { // 5분마다
  setInterval(refreshDashboardData, interval);
}

// 반응형 레이아웃 처리
function handleResponsiveLayout() {
  const width = window.innerWidth;
  const grid = document.querySelector('.dashboard-grid');
  
  if (width < 768) {
    grid.style.gridTemplateColumns = '1fr';
  } else if (width < 1200) {
    grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
  } else {
    grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
  }
}

// 윈도우 리사이즈 이벤트 처리
window.addEventListener('resize', handleResponsiveLayout);

// 초기화 시 UI 설정
document.addEventListener('DOMContentLoaded', function() {
  setupControlButtons();
  handleResponsiveLayout();
  setupAutoRefresh();
});
