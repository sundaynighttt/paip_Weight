// 템플릿 로더
async function loadTemplates() {
  try {
    // 왼쪽 패널 로드
    const leftPanelResponse = await fetch('templates/left-panel.html');
    const leftPanelContent = await leftPanelResponse.text();
    document.getElementById('left-panel-container').innerHTML = leftPanelContent;
    
    // 중간 패널 기본 구조 로드
    const middlePanelContent = '<div class="middle-panel" id="farm-categories-container"></div>';
    document.getElementById('middle-panel-container').innerHTML = middlePanelContent;
    
    // 오른쪽 패널들 로드
    const breedingPanelResponse = await fetch('templates/breeding-panel.html');
    const breedingPanelContent = await breedingPanelResponse.text();
    
    const shippingPanelResponse = await fetch('templates/shipping-panel.html');
    const shippingPanelContent = await shippingPanelResponse.text();
    
    document.getElementById('right-panels-container').innerHTML = 
      breedingPanelContent + shippingPanelContent;
    
  } catch (error) {
    console.error('템플릿 로드 중 오류 발생:', error);
  }
}

// UI 초기화
function initializeUI(farmData) {
  const middlePanel = document.getElementById('farm-categories-container');
  
  // 카테고리별로 렌더링
  farmData.categories.forEach(category => {
    if (category.id === 'statistics') {
      renderStatisticsCategory(middlePanel, category);
    } else {
      renderFarmCategory(middlePanel, category);
    }
  });
  
  // 이벤트 리스너 등록
  registerEventListeners();
}

// 농장 카테고리 렌더링
function renderFarmCategory(container, category) {
  const categoryHtml = `
    <div class="data-category">
      <div class="data-category-header">
        <span>${getCategoryDisplayName(category)}</span>
        <button class="toggle-category-btn" onclick="toggleCategory(this)">
          <i class="fas fa-chevron-down"></i>
        </button>
      </div>
      <div class="farm-list">
        ${category.farms.map(farm => renderFarmItem(farm)).join('')}
      </div>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', categoryHtml);
}

// 통계 카테고리 렌더링
function renderStatisticsCategory(container, category) {
  const categoryHtml = `
    <div class="data-category">
      <div class="data-category-header">
        <span>${category.name}</span>
        <button class="toggle-category-btn" onclick="toggleCategory(this)">
          <i class="fas fa-chevron-down"></i>
        </button>
      </div>
      <div class="farm-list">
        ${category.items.map(item => renderStatItem(item)).join('')}
      </div>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', categoryHtml);
}

// 농장 항목 렌더링
function renderFarmItem(farm) {
  const statusClass = farm.status === 'NG' ? 'ng' : 'ok';
  const statusText = farm.status === 'NG' ? 
    `NG (${farm.ngCount}개 동)` : 
    `OK (${farm.dongCount}개 동)`;
  
  const buttonClass = farm.status === 'NG' ? 
    'approve disabled' : 
    'approve';
  
  const buttonStyle = farm.status === 'NG' ? 
    'padding: 3px 8px; font-size: 0.75rem; background-color: #aaa; border-color: #999; color: #666;' : 
    'padding: 3px 8px; font-size: 0.75rem;';
  
  return `
    <div class="data-item" data-farm-id="${farm.id}">
      <div class="farm-item-content">
        <div class="farm-item-info">
          <i class="fas fa-chevron-right farm-toggle-icon"></i>
          <div>
            <div class="farm-item-header">
              <strong>${farm.id}</strong> - ${farm.name}
            </div>
            <div class="farm-item-details">
              <span class="detail-item">회차: ${farm.round}</span>
              <span class="detail-item">일령: ${farm.days}</span>
              <span class="detail-item"><span class="version-badge">${farm.version}</span></span>
            </div>
            <div class="farm-item-status">
              <span class="status ${statusClass}">${statusText}</span>
            </div>
          </div>
        </div>
        <div class="farm-item-actions">
          <button class="action-btn ${buttonClass}" style="${buttonStyle}">승인</button>
        </div>
      </div>
      <div class="dong-list">
        ${farm.dongs.map(dong => renderDongItem(farm, dong)).join('')}
      </div>
    </div>
  `;
}

// 동 항목 렌더링
function renderDongItem(farm, dong) {
  const statusClass = dong.status === 'NG' ? 'ng' : 'ok';
  const errorDisplay = dong.status === 'NG' ? 
    `<span class="error-value">오차: ${dong.error}</span>` : '';
  
  const onclickParams = `'${farm.id}', '${dong.id}', '${farm.name}', ${dong.days}, '${dong.status}', '${dong.error || ''}', '${dong.wm}', '${dong.scale}'`;
  
  const buttonClass = dong.status === 'NG' ? 
    'approve disabled' : 
    'approve';
  
  const buttonStyle = dong.status === 'NG' ? 
    'padding: 3px 8px; font-size: 0.75rem; background-color: #aaa; border-color: #999; color: #666;' : 
    'padding: 3px 8px; font-size: 0.75rem;';
  
  return `
    <div class="data-item dong-item" data-dong-id="${dong.id}" onclick="updateRightPanel(${onclickParams})">
      <div class="farm-item-content">
        <div class="farm-item-info">
          <div>
            <div class="farm-item-header">
              <strong>${dong.id}</strong>
            </div>
            <div class="farm-item-details">
              <span class="detail-item">일령: ${dong.days}</span>
              <span class="detail-item">WM: ${dong.wm}</span>
              <span class="detail-item">체중계: ${dong.scale}</span>
            </div>
            <div class="farm-item-status">
              <span class="status ${statusClass}">${dong.status} ${errorDisplay}</span>
            </div>
          </div>
        </div>
        <div class="farm-item-actions">
          <button class="action-btn ${buttonClass}" style="${buttonStyle}">승인</button>
        </div>
      </div>
    </div>
  `;
}

// 통계 항목 렌더링
function renderStatItem(item) {
  const statusClass = item.status === 'NG' ? 'ng' : 'ok';
  const statusText = item.status === 'NG' ? 
    `NG (${item.ngCount || 0}개 항목)` : 
    item.status;
  
  return `
    <div class="data-item" data-stat-id="${item.id}">
      <div class="farm-item-content">
        <div class="farm-item-info">
          <i class="fas fa-chevron-right farm-toggle-icon"></i>
          <div>
            <div class="farm-item-header">
              <strong>${item.name}</strong>
            </div>
            <div class="farm-item-details">
              <span class="detail-item">데이터 수: ${item.dataCount}</span>
              <span class="detail-item">최근 업데이트: ${item.lastUpdate}</span>
            </div>
            <div class="farm-item-status">
              <span class="status ${statusClass}">${statusText}</span>
            </div>
          </div>
        </div>
        <div class="farm-item-actions">
          <button class="action-btn approve" style="padding: 3px 8px; font-size: 0.75rem;">상세보기</button>
        </div>
      </div>
      <div class="dong-list">
        ${item.details.map(detail => renderStatDetailItem(item, detail)).join('')}
      </div>
    </div>
  `;
}

// 통계 상세 항목 렌더링
function renderStatDetailItem(stat, detail) {
  const statusClass = detail.status === 'NG' ? 'ng' : 'ok';
  const errorDisplay = detail.status === 'NG' ? 
    `<span class="error-value">오차: ${detail.error}</span>` : '';
  
  const onclickParams = `'${stat.id}', '${detail.id}', '${detail.name}', 0, '${detail.status}', '${detail.error || ''}', '${detail.avgWM}', '${detail.avgScale}'`;
  
  return `
    <div class="data-item dong-item" data-stat-detail-id="${detail.id}" onclick="updateRightPanel(${onclickParams})">
      <div class="farm-item-content">
        <div class="farm-item-info">
          <div>
            <div class="farm-item-header">
              <strong>${detail.name}</strong>
            </div>
            <div class="farm-item-details">
              <span class="detail-item">평균 WM: ${detail.avgWM}</span>
              <span class="detail-item">평균 체중계: ${detail.avgScale}</span>
            </div>
            <div class="farm-item-status">
              <span class="status ${statusClass}">${detail.status} ${errorDisplay}</span>
            </div>
          </div>
        </div>
        <div class="farm-item-actions">
          <button class="action-btn approve" style="padding: 3px 8px; font-size: 0.75rem;">상세보기</button>
        </div>
      </div>
    </div>
  `;
}

// 카테고리 표시 이름 가져오기
function getCategoryDisplayName(category) {
  if (category.id === 'breeding') {
    return `1) ${category.name} (${category.count}개농장)`;
  } else if (category.id === 'shipping') {
    return `2) ${category.name} (${category.count}개농장)`;
  }
  return category.name;
}

// 이벤트 리스너 등록
function registerEventListeners() {
  // 농장 항목의 화살표 아이콘에 클릭 이벤트 추가
  document.querySelectorAll('.farm-toggle-icon').forEach(function(icon) {
    icon.addEventListener('click', function(e) {
      e.stopPropagation();
      const farmItem = this.closest('.data-item');
      const dongList = farmItem.querySelector('.dong-list');
      
      // 동 목록 토글
      if (dongList.style.display === 'block') {
        dongList.style.display = 'none';
        this.classList.remove('fa-chevron-down');
        this.classList.add('fa-chevron-right');
      } else {
        dongList.style.display = 'block';
        this.classList.remove('fa-chevron-right');
        this.classList.add('fa-chevron-down');
      }
    });
  });
  
  // 농장 항목 클릭 시 동 목록 토글
  document.querySelectorAll('.data-item[data-farm-id] .farm-item-content, .data-item[data-stat-id] .farm-item-content').forEach(function(content) {
    content.addEventListener('click', function(e) {
      // 버튼 클릭은 제외
      if (e.target.closest('.farm-item-actions')) {
        return;
      }
      
      const farmItem = this.closest('.data-item');
      const dongList = farmItem.querySelector('.dong-list');
      const toggleIcon = farmItem.querySelector('.farm-toggle-icon');
      
      // 동 목록 토글
      if (dongList.style.display === 'block') {
        dongList.style.display = 'none';
        toggleIcon.classList.remove('fa-chevron-down');
        toggleIcon.classList.add('fa-chevron-right');
      } else {
        dongList.style.display = 'block';
        toggleIcon.classList.remove('fa-chevron-right');
        toggleIcon.classList.add('fa-chevron-down');
      }
    });
  });
  
  // 동 항목에 클릭 이벤트 전파 중지 추가
  document.querySelectorAll('.dong-list .data-item').forEach(function(dongItem) {
    dongItem.addEventListener('click', function(e) {
      // 이벤트 전파 중지 (동을 클릭했을 때 동 목록이 접히지 않도록)
      e.stopPropagation();
    });
  });
  
  // 카테고리 초기 상태 설정
  document.querySelectorAll('.data-category').forEach(function(category) {
    const toggleBtn = category.querySelector('.toggle-category-btn');
    const icon = toggleBtn.querySelector('i');
    
    // 초기 상태는 모두 펼쳐진 상태로 설정
    category.classList.add('expanded');
    icon.classList.remove('fa-chevron-up');
    icon.classList.add('fa-chevron-down');
  });
  
  // 초기 flex 비율 설정
  updateCategoryFlexRatio();
}
