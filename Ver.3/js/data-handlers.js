// 사육 패널 특화 업데이트 함수
function updateBreedingSpecific(panelSelector, farmId, dongId) {
  // 사육 카테고리에 특화된 업데이트 로직
  console.log('사육 패널 특화 업데이트:', farmId, dongId);
  
  // 1. 사육 카테고리 특화 정보 가져오기
  const breedingData = getBreedingData(farmId, dongId);
  
  // 2. R2 테이블 업데이트 (사육 카테고리는 더 많은 중량 범위를 표시)
  updateBreedingR2Table(panelSelector, breedingData.r2Ranges);
  
  // 3. 육성률 정보 업데이트 (사육 카테고리만 해당)
  if (breedingData.growthRate) {
    const growthRateElement = document.querySelector(panelSelector + ' .farm-info .growth-rate');
    if (growthRateElement) {
      growthRateElement.textContent = breedingData.growthRate + '%';
    }
  }
  
  // 4. 사육 관련 알림 업데이트
  updateBreedingNotifications(panelSelector, breedingData.notifications);
}

// 출하 패널 특화 업데이트 함수
function updateShippingSpecific(panelSelector, farmId, dongId) {
  // 출하 카테고리에 특화된 업데이트 로직
  console.log('출하 패널 특화 업데이트:', farmId, dongId);
  
  // 1. 출하 카테고리 특화 정보 가져오기
  const shippingData = getShippingData(farmId, dongId);
  
  // 2. R2 테이블 업데이트
  updateShippingR2Table(panelSelector, shippingData.r2Ranges);
  
  // 3. 출하 예정일 정보 업데이트
  if (shippingData.scheduledDate) {
    let scheduledDateElement = document.querySelector(panelSelector + ' .farm-info .scheduled-date');
    if (!scheduledDateElement) {
      const basicInfoRight = document.querySelector(panelSelector + ' .basic-info-right');
      if (basicInfoRight) {
        const dateItem = document.createElement('span');
        dateItem.className = 'info-item';
        dateItem.innerHTML = '<strong>출하 예정일:</strong> <span class="scheduled-date">' + shippingData.scheduledDate + '</span>';
        basicInfoRight.appendChild(dateItem);
      }
    } else {
      scheduledDateElement.textContent = shippingData.scheduledDate;
    }
  }
  
  // 4. 출하 관련 알림 업데이트
  updateShippingNotifications(panelSelector, shippingData.notifications);
  
  // 5. 출하 목표 중량 업데이트
  if (shippingData.targetWeight) {
    const targetWeightElement = document.querySelector(panelSelector + ' .r2-adjust-form .target-weight');
    if (targetWeightElement) {
      targetWeightElement.value = shippingData.targetWeight;
    }
  }
}

// 사육 데이터 가져오기 함수
function getBreedingData(farmId, dongId) {
  // 실제로는 서버에서 데이터를 가져오거나 로컬 데이터베이스에서 조회
  // 현재는 예시 데이터 반환
  return {
    r2Ranges: [
      { range: '1,601g~', r2: 1.020, appliedAt: '25-04-29, 10:30' },
      { range: '1,301g~1,600g', r2: 1.020, appliedAt: '25-04-27, 00:27' },
      { range: '1,001g~1,300g', r2: 0.950, appliedAt: '25-04-25, 16:53' },
      { range: '701g~1,000g', r2: 0.920, appliedAt: '25-04-23, 11:30' },
      { range: '~700g', r2: 0.885, appliedAt: '25-04-20, 11:30' }
    ],
    growthRate: 97.5,
    notifications: [
      {
        type: 'warning',
        title: dongId + ' 동 육성률 감소',
        desc: '전일 대비 1.2% 감소, 사료 섭취량 확인 필요',
        time: '2025-04-22 14:23'
      }
    ]
  };
}

// 출하 데이터 가져오기 함수
function getShippingData(farmId, dongId) {
  // 실제로는 서버에서 데이터를 가져오거나 로컬 데이터베이스에서 조회
  // 현재는 예시 데이터 반환
  return {
    r2Ranges: [
      { range: '1,601g~', r2: 1.020, appliedAt: '25-04-29, 10:30' },
      { range: '1,301g~1,600g', r2: 1.020, appliedAt: '25-04-27, 00:27' },
      { range: '1,001g~1,300g', r2: 0.950, appliedAt: '25-04-25, 16:53' }
    ],
    scheduledDate: '2025-05-05',
    targetWeight: '1,750g',
    notifications: [
      {
        type: 'info',
        title: dongId + ' 동 출하 일정 변경',
        desc: '출하 일정이 2025-05-05로 변경되었습니다.',
        time: '2025-04-23 09:30'
      },
      {
        type: 'warning',
        title: dongId + ' 동 목표 중량 미달',
        desc: '현재 중량이 목표 중량보다 50g 미달입니다.',
        time: '2025-04-22 16:45'
      }
    ]
  };
}

// 사육 R2 테이블 업데이트 함수
function updateBreedingR2Table(panelSelector, r2Ranges) {
  const tableBody = document.querySelector(panelSelector + ' .r2-table tbody');
  if (!tableBody) return;
  
  // 테이블 내용 초기화
  tableBody.innerHTML = '';
  
  // R2 범위 데이터로 테이블 채우기
  r2Ranges.forEach(range => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${range.range}</td>
      <td>${range.r2}</td>
      <td>${range.appliedAt}</td>
      <td><button class="action-btn" style="padding: 1px 4px; font-size: 0.7rem;">자세히 보기</button></td>
    `;
    tableBody.appendChild(row);
  });
}

// 출하 R2 테이블 업데이트 함수
function updateShippingR2Table(panelSelector, r2Ranges) {
  const tableBody = document.querySelector(panelSelector + ' .r2-table tbody');
  if (!tableBody) return;
  
  // 테이블 내용 초기화
  tableBody.innerHTML = '';
  
  // R2 범위 데이터로 테이블 채우기
  r2Ranges.forEach(range => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${range.range}</td>
      <td>${range.r2}</td>
      <td>${range.appliedAt}</td>
      <td><button class="action-btn" style="padding: 1px 4px; font-size: 0.7rem;">자세히 보기</button></td>
    `;
    tableBody.appendChild(row);
  });
}

// 사육 알림 업데이트 함수
function updateBreedingNotifications(panelSelector, notifications) {
  const notificationList = document.querySelector(panelSelector + ' .notification-list');
  if (!notificationList || !notifications || notifications.length === 0) return;
  
  // 기존 알림 유지하면서 사육 특화 알림 추가
  notifications.forEach((notification, index) => {
    // 첫 번째 알림은 이미 updateNotifications 함수에서 처리했으므로 건너뜀
    if (index === 0 && notificationList.children.length > 0) return;
    
    const notificationItem = document.createElement('div');
    notificationItem.className = 'notification-item';
    notificationItem.innerHTML = `
      <div class="notification-icon ${notification.type}">
        <i class="fas fa-${notification.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
      </div>
      <div class="notification-content">
        <div class="notification-title">${notification.title}</div>
        <div class="notification-desc">${notification.desc}</div>
        <div class="notification-time">${notification.time}</div>
      </div>
    `;
    
    // 알림 목록에 추가
    notificationList.appendChild(notificationItem);
  });
}

// 출하 알림 업데이트 함수
function updateShippingNotifications(panelSelector, notifications) {
  const notificationList = document.querySelector(panelSelector + ' .notification-list');
  if (!notificationList || !notifications || notifications.length === 0) return;
  
  // 기존 알림 유지하면서 출하 특화 알림 추가
  notifications.forEach(notification => {
    const notificationItem = document.createElement('div');
    notificationItem.className = 'notification-item';
    notificationItem.innerHTML = `
      <div class="notification-icon ${notification.type}">
        <i class="fas fa-${notification.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
      </div>
      <div class="notification-content">
        <div class="notification-title">${notification.title}</div>
        <div class="notification-desc">${notification.desc}</div>
        <div class="notification-time">${notification.time}</div>
      </div>
    `;
    
    // 알림 목록에 추가
    notificationList.appendChild(notificationItem);
  });
}
