// 동을 클릭했을 때 오른쪽 패널 업데이트 함수
function updateRightPanel(farmId, dongId, farmName, days, status, errorValue, wmValue, scaleValue) {
  // 농장 ID로 카테고리 구분 (사육 또는 출하)
  const isBreeding = isBreedingFarm(farmId);
  
  // 적절한 패널 표시
  showCorrectPanel(isBreeding);
  
  // 패널 선택 (사육 또는 출하)
  const panelSelector = isBreeding ? '.breeding-panel' : '.shipping-panel';
  
  // 선택된 동 강조 표시
  highlightSelectedDong(dongId);
  
  // 각 섹션 업데이트
  updateBasicInfo(panelSelector, farmId, farmName, dongId, days);
  updateStatus(panelSelector, status, errorValue);
  updateR2Form(panelSelector, wmValue, scaleValue);
  
  // 알림 섹션 업데이트
  if (status === 'NG') {
    updateNotifications(panelSelector, dongId, errorValue);
  }
  
  // 카테고리별 특화 업데이트
  if (isBreeding) {
    updateBreedingSpecific(panelSelector, farmId, dongId);
  } else {
    updateShippingSpecific(panelSelector, farmId, dongId);
  }
}

// 농장 ID로 카테고리 구분 (사육 또는 출하)
function isBreedingFarm(farmId) {
  // 출하 카테고리에 속하는 농장 ID 목록
  const shippingFarmIds = ['FA0326', 'FA0401']; // 신농장, 한마음농장
  
  // 출하 카테고리에 속하면 false, 사육 카테고리에 속하면 true 반환
  return !shippingFarmIds.includes(farmId);
}

// 카테고리 토글 함수
function toggleCategory(button) {
  const category = button.closest('.data-category');
  const icon = button.querySelector('i');
  
  if (category.classList.contains('collapsed')) {
    // 펼치기
    category.classList.remove('collapsed');
    category.classList.add('expanded');
    icon.classList.remove('fa-chevron-up');
    icon.classList.add('fa-chevron-down');
  } else {
    // 접기
    category.classList.remove('expanded');
    category.classList.add('collapsed');
    icon.classList.remove('fa-chevron-down');
    icon.classList.add('fa-chevron-up');
    
    // 접힌 카테고리의 인라인 스타일 즉시 제거
    category.style.removeProperty('flex');
  }
  
  // 펼쳐진 카테고리들의 flex 비율 조정
  updateCategoryFlexRatio();
}

// 펼쳐진 카테고리들의 flex 비율을 조정하는 함수
function updateCategoryFlexRatio() {
  const categories = document.querySelectorAll('.data-category');
  const expandedCategories = document.querySelectorAll('.data-category.expanded');
  const expandedCount = expandedCategories.length;
  
  // 모든 카테고리 처리
  categories.forEach(category => {
    // 접힌 카테고리는 인라인 스타일 제거
    if (category.classList.contains('collapsed')) {
      category.style.removeProperty('flex');
    }
  });
  
  // 모든 카테고리가 접혀있는 경우 처리
  if (expandedCount === 0) {
    return;
  }
  
  // 펼쳐진 카테고리들에 동등한 flex 비율 적용
  expandedCategories.forEach(category => {
    category.style.flex = `1 1 0`;
  });
}
