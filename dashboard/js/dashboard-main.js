// 대시보드 초기화 함수
async function initializeDashboard() {
  console.log('대시보드 초기화 시작');
  try {
    // 템플릿 로드
    await loadTemplates();
    console.log('템플릿 로드 완료');
    
    // 네비게이션 이벤트 설정
    setupNavigationEvents();
    
    // 차트 초기화
    console.log('차트 초기화 시작');
    initializeCharts();
    console.log('차트 초기화 완료');
    
    // 데이터 로드 및 표시
    console.log('데이터 로드 시작');
    await loadDashboardData();
    console.log('데이터 로드 완료');
    
  } catch (error) {
    console.error('대시보드 초기화 중 오류 발생:', error);
  }
}

// 템플릿 로드 함수
async function loadTemplates() {
  console.log('템플릿 로드 시작');
  try {
    // 좌측 네비게이션 로드
    console.log('네비게이션 템플릿 로드 시도');
    const navResponse = await fetch('templates/dashboard-nav.html');
    console.log('네비게이션 템플릿 응답:', navResponse.status);
    const navHtml = await navResponse.text();
    document.getElementById('left-nav-container').innerHTML = navHtml;
    console.log('네비게이션 템플릿 적용 완료');
    
    // 대시보드 카드 로드
    console.log('카드 템플릿 로드 시도');
    const cardsResponse = await fetch('templates/dashboard-cards.html');
    console.log('카드 템플릿 응답:', cardsResponse.status);
    const cardsHtml = await cardsResponse.text();
    document.getElementById('dashboard-cards-container').innerHTML = cardsHtml;
    console.log('카드 템플릿 적용 완료');
    
  } catch (error) {
    console.error('템플릿 로드 중 오류 발생:', error);
  }
}

// 네비게이션 이벤트 설정
function setupNavigationEvents() {
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      // 모든 항목에서 active 클래스 제거
      navItems.forEach(nav => nav.classList.remove('active'));
      
      // 클릭된 항목에 active 클래스 추가
      this.classList.add('active');
      
      // 뷰 전환 처리
      const view = this.getAttribute('data-view');
      switchView(view);
    });
  });
}

// 뷰 전환 함수
function switchView(viewName) {
  console.log('뷰 전환:', viewName);
  
  // 대시보드가 아닌 다른 뷰로 전환 시 버전3 해당 페이지로 이동
  if (viewName !== 'dashboard') {
    // 버전3 페이지로 이동
    window.location.href = `../Ver.3/index.html#${viewName}`;
  }
}

// 대시보드 데이터 로드
async function loadDashboardData() {
  try {
    // 농장 모니터 데이터 로드
    loadFarmMonitorData();
    
    // 알림 데이터 로드
    loadNotificationData();
    
  } catch (error) {
    console.error('데이터 로드 중 오류 발생:', error);
  }
}

// 농장 모니터 데이터 로드
function loadFarmMonitorData() {
  const farmData = [
    { farm: 'FA0701 미래농장', dong: 'H01', days: 34, wm: '1,680g', scale: '1,765g', error: '-85g', status: 'NG' },
    { farm: 'FA0701 미래농장', dong: 'H02', days: 34, wm: '1,670g', scale: '1,765g', error: '-95g', status: 'NG' },
    { farm: 'FA0300 대성농장', dong: 'H01', days: 33, wm: '1,620g', scale: '1,710g', error: '-118g', status: 'NG' },
    { farm: 'FA0300 대성농장', dong: 'H03', days: 33, wm: '1,605g', scale: '1,625g', error: '-20g', status: 'OK' },
    { farm: 'FA0401 해피농장', dong: 'H01', days: 35, wm: '1,750g', scale: '1,750g', error: '0g', status: 'OK' }
  ];
  
  const farmStatusGrid = document.querySelector('.farm-status-grid');
  
  farmData.forEach(data => {
    const row = document.createElement('div');
    row.className = 'farm-status-row';
    
    row.innerHTML = `
      <div class="farm-col">${data.farm}</div>
      <div class="dong-col">${data.dong}</div>
      <div class="days-col">${data.days}</div>
      <div class="wm-col">${data.wm}</div>
      <div class="scale-col">${data.scale}</div>
      <div class="error-col ${data.status.toLowerCase()}">${data.error}</div>
      <div class="status-col"><span class="status-badge ${data.status.toLowerCase()}">${data.status}</span></div>
    `;
    
    farmStatusGrid.appendChild(row);
  });
}

// 알림 데이터 로드
function loadNotificationData() {
  const notifications = [
    {
      type: 'error',
      title: '오차 임계값 초과',
      desc: 'FA0300-H01 동의 오차가 -118g으로 임계값을 초과했습니다.',
      time: '2025-04-24 08:30'
    },
    {
      type: 'warning',
      title: '오차 증가 추세',
      desc: 'FA0701-H02 동의 오차가 지속적으로 증가하고 있습니다.',
      time: '2025-04-24 09:15'
    },
    {
      type: 'info',
      title: '시스템 업데이트 완료',
      desc: '시스템이 V2.3 버전으로 업데이트되었습니다.',
      time: '2025-04-23 02:00'
    }
  ];
  
  const notificationList = document.querySelector('.notification-list');
  
  notifications.forEach(notification => {
    const item = document.createElement('div');
    item.className = `notification-item ${notification.type}`;
    
    const iconMap = {
      error: 'fa-exclamation-circle',
      warning: 'fa-exclamation-triangle',
      info: 'fa-info-circle'
    };
    
    item.innerHTML = `
      <div class="notification-icon">
        <i class="fas ${iconMap[notification.type]}"></i>
      </div>
      <div class="notification-content">
        <div class="notification-title">${notification.title}</div>
        <div class="notification-desc">${notification.desc}</div>
        <div class="notification-time">${notification.time}</div>
      </div>
    `;
    
    notificationList.appendChild(item);
  });
}
