// 페이지 로드 시 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function() {
  // 모든 농장 항목의 화살표 아이콘에 클릭 이벤트 추가
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
});

// 농장 상세 정보 표시 함수
function showFarmDetails(farmName) {
  console.log(`${farmName} 상세 정보 표시`);
  // 여기에 오른쪽 패널 업데이트 로직 추가
}

// 동 상세 정보 표시 함수
function showDongDetails(farmName, dongName) {
  console.log(`${farmName} ${dongName} 상세 정보 표시`);
  // 여기에 오른쪽 패널 업데이트 로직 추가
}

// 동 승인 함수
function approveDong(farmName, dongName) {
  console.log(`${farmName} ${dongName} 승인 처리`);
  // 여기에 승인 처리 로직 추가
  event.stopPropagation();
}

// 통계 상세 정보 표시 함수
function showStatDetails(statName) {
  console.log(`${statName} 상세 정보 표시`);
  // 여기에 오른쪽 패널 업데이트 로직 추가
}

// 통계 세부 항목 상세 정보 표시 함수
function showStatSubDetails(statName, subItemName) {
  console.log(`${statName} ${subItemName} 상세 정보 표시`);
  // 여기에 오른쪽 패널 업데이트 로직 추가
}
