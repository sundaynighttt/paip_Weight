// 차트 박스 추가 함수
function addChartBox(panelSelector) {
  const chartContainer = document.querySelector(panelSelector + ' .chart-boxes-container');
  const currentBoxes = chartContainer.querySelectorAll('.chart-box').length;
  
  // 최대 3개까지만 추가 가능
  if (currentBoxes >= 3) {
    const addButton = document.querySelector(panelSelector + ' .add-chart-box-btn');
    addButton.disabled = true;
    addButton.setAttribute('title', '최대 3개까지만 추가할 수 있습니다');
    alert('최대 3개의 차트 박스까지만 추가할 수 있습니다.');
    return;
  }
  
  // 새 차트 박스 생성
  const newBox = document.createElement('div');
  newBox.className = 'chart-box';
  newBox.id = `${panelSelector.includes('breeding') ? 'breeding' : 'shipping'}-chart-${currentBoxes + 1}`;
  newBox.innerHTML = `
    <div class="chart-placeholder" style="height: 200px; border: 1px solid #eee; border-radius: 2px; display: flex; align-items: center; justify-content: center; color: #999; background-color: #fafafa; position: relative; margin-bottom: 5px;">
      [최근 7일간 WM, 체중계, WC 값 추이 그래프]
      <div style="position: absolute; right: 5px; top: 5px; background-color: rgba(255,255,255,0.8); border: 1px solid #ddd; border-radius: 2px; padding: 3px; font-size: 0.7rem;">
        <div style="margin-bottom: 2px; color: #666;">버전 변경 포인트</div>
        <div><span style="display: inline-block; width: 8px; height: 8px; background-color: red; border-radius: 50%; margin-right: 3px;"></span> V2.2 → V2.3 (04-20)</div>
        <div><span style="display: inline-block; width: 8px; height: 8px; background-color: blue; border-radius: 50%; margin-right: 3px;"></span> M1.4 → M1.5 (04-20)</div>
      </div>
      <button class="chart-box-remove-btn" onclick="removeChartBox(this)">×</button>
    </div>
  `;
  
  // 차트 박스 추가
  chartContainer.appendChild(newBox);
  
  // 애니메이션 효과
  setTimeout(() => {
    newBox.style.opacity = '1';
  }, 50);
}

// 차트 박스 제거 함수
function removeChartBox(button) {
  const chartBox = button.closest('.chart-box');
  const chartContainer = chartBox.parentElement;
  const panelSelector = chartContainer.closest('.right-panel').classList.contains('breeding-panel') ? '.breeding-panel' : '.shipping-panel';
  
  // 애니메이션 효과
  chartBox.style.opacity = '0';
  chartBox.style.transform = 'scale(0.9)';
  
  setTimeout(() => {
    chartBox.remove();
    
    // 추가 버튼 활성화 체크
    const remainingBoxes = chartContainer.querySelectorAll('.chart-box').length;
    if (remainingBoxes < 3) {
      const addButton = document.querySelector(panelSelector + ' .add-chart-box-btn');
      addButton.disabled = false;
      addButton.removeAttribute('title');
    }
    
    // ID 재정렬
    rearrangeChartBoxIds(panelSelector);
  }, 300);
}

// 차트 박스 ID 재정렬 함수
function rearrangeChartBoxIds(panelSelector) {
  const chartContainer = document.querySelector(panelSelector + ' .chart-boxes-container');
  const chartBoxes = chartContainer.querySelectorAll('.chart-box');
  
  chartBoxes.forEach((box, index) => {
    box.id = `${panelSelector.includes('breeding') ? 'breeding' : 'shipping'}-chart-${index + 1}`;
  });
}
