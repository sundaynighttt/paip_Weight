// 선택된 동 강조 표시 함수
function highlightSelectedDong(dongId) {
  // 모든 동 항목에서 선택 클래스 제거
  document.querySelectorAll('.dong-item').forEach(item => {
    item.classList.remove('selected');
  });
  
  // 선택된 동에 선택 클래스 추가
  const selectedItems = document.querySelectorAll(`.dong-item[data-dong-id="${dongId}"]`);
  selectedItems.forEach(item => {
    item.classList.add('selected');
  });
  
  // 통계 항목도 처리
  const selectedStatItems = document.querySelectorAll(`.dong-item[data-stat-detail-id="${dongId}"]`);
  selectedStatItems.forEach(item => {
    item.classList.add('selected');
  });
}

// 기본 정보 업데이트 함수
function updateBasicInfo(panelSelector, farmId, farmName, dongId, days) {
  document.querySelector(panelSelector + ' .farm-id').textContent = farmId;
  document.querySelector(panelSelector + ' .farm-name').textContent = farmName;
  document.querySelector(panelSelector + ' .dong').textContent = dongId;
  document.querySelector(panelSelector + ' .days').textContent = days;
}

// 상태 업데이트 함수
function updateStatus(panelSelector, status, errorValue) {
  const statusElement = document.querySelector(panelSelector + ' .basic-info-right .status');
  if (status === 'NG') {
    statusElement.className = 'status ng';
    statusElement.innerHTML = 'NG <span class="error-value">오차: ' + errorValue + '</span>';
  } else {
    statusElement.className = 'status ok';
    statusElement.textContent = 'OK';
  }
}

// R2 조정 폼 업데이트 함수
function updateR2Form(panelSelector, wmValue, scaleValue) {
  const wmInput = document.querySelector(panelSelector + ' .r2-adjust-form .wm-value');
  const scaleInput = document.querySelector(panelSelector + ' .r2-adjust-form .scale-value');
  
  if (wmInput) wmInput.value = wmValue;
  if (scaleInput) scaleInput.value = scaleValue;
}

// 알림 섹션 업데이트 함수
function updateNotifications(panelSelector, dongId, errorValue) {
  const notificationTitle = document.querySelector(panelSelector + ' .notification-list .notification-item:first-child .notification-title');
  const notificationDesc = document.querySelector(panelSelector + ' .notification-list .notification-item:first-child .notification-desc');
  
  if (notificationTitle) notificationTitle.textContent = dongId + ' 동 중량 오차 발생';
  if (notificationDesc) notificationDesc.textContent = '오차: ' + errorValue + ', 확인이 필요합니다.';
}

// 적절한 패널 표시 함수
function showCorrectPanel(isBreeding) {
  const breedingPanel = document.querySelector('.breeding-panel');
  const shippingPanel = document.querySelector('.shipping-panel');
  
  // 로딩 상태 표시
  showLoading(true);
  
  // 패널 전환
  if (isBreeding) {
    breedingPanel.style.display = 'block';
    shippingPanel.style.display = 'none';
    
    // 패널 활성화 클래스 추가/제거
    setTimeout(() => {
      breedingPanel.classList.add('active');
      shippingPanel.classList.remove('active');
    }, 50);
  } else {
    breedingPanel.style.display = 'none';
    shippingPanel.style.display = 'block';
    
    // 패널 활성화 클래스 추가/제거
    setTimeout(() => {
      breedingPanel.classList.remove('active');
      shippingPanel.classList.add('active');
    }, 50);
  }
  
  // 로딩 상태 숨김 (0.5초 후)
  setTimeout(() => {
    showLoading(false);
  }, 500);
}

// 로딩 상태 표시 함수
function showLoading(show) {
  let loadingOverlay = document.querySelector('.loading-overlay');
  
  // 로딩 오버레이가 없으면 생성
  if (!loadingOverlay && show) {
    loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);
    
    // 로딩 오버레이 스타일 적용
    const style = document.createElement('style');
    style.textContent = `
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }
      .loading-overlay.visible {
        opacity: 1;
      }
      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #0066cc;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .right-panel {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }
      .right-panel.active {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
    
    // 기존 패널에 active 클래스 추가
    const visiblePanel = document.querySelector('.right-panel[style*="display: block"]') || document.querySelector('.right-panel:not([style*="display: none"])');
    if (visiblePanel) {
      visiblePanel.classList.add('active');
    }
  }
  
  // 로딩 오버레이 표시/숨김
  if (loadingOverlay) {
    if (show) {
      loadingOverlay.classList.add('visible');
    } else {
      loadingOverlay.classList.remove('visible');
      
      // 0.3초 후 완전히 제거
      setTimeout(() => {
        if (loadingOverlay.parentNode) {
          loadingOverlay.parentNode.removeChild(loadingOverlay);
        }
      }, 300);
    }
  }
}
