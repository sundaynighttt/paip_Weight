// 데이터 가져오기 및 처리 함수들

// 농장 데이터 가져오기
async function fetchFarmData() {
  try {
    // 실제 환경에서는 API 호출
    // const response = await fetch('/api/farms');
    // return await response.json();
    
    // 샘플 데이터 반환
    return {
      farms: [
        { id: 'FA0300', name: '대성농장', status: 'NG', version: 'V2.3' },
        { id: 'FA0701', name: '미래농장', status: 'NG', version: 'V2.3' },
        { id: 'FA0401', name: '해피농장', status: 'OK', version: 'V2.3' },
        { id: 'FA0502', name: '그린농장', status: 'OK', version: 'V2.3' },
        { id: 'FA0603', name: '청정농장', status: 'OK', version: 'V2.2' }
      ]
    };
  } catch (error) {
    console.error('농장 데이터 가져오기 실패:', error);
    return { farms: [] };
  }
}

// 동별 데이터 가져오기
async function fetchDongData(farmId) {
  try {
    // 실제 환경에서는 API 호출
    // const response = await fetch(`/api/farms/${farmId}/dongs`);
    // return await response.json();
    
    // 샘플 데이터 반환
    const dongData = {
      'FA0300': [
        { id: 'H01', days: 33, wm: 1620, scale: 1710, error: -118, status: 'NG' },
        { id: 'H02', days: 33, wm: 1610, scale: 1625, error: -15, status: 'OK' },
        { id: 'H03', days: 33, wm: 1605, scale: 1625, error: -20, status: 'OK' }
      ],
      'FA0701': [
        { id: 'H01', days: 34, wm: 1680, scale: 1765, error: -85, status: 'NG' },
        { id: 'H02', days: 34, wm: 1670, scale: 1765, error: -95, status: 'NG' }
      ]
    };
    
    return dongData[farmId] || [];
  } catch (error) {
    console.error('동별 데이터 가져오기 실패:', error);
    return [];
  }
}

// 중량 추이 데이터 가져오기
async function fetchWeightTrendData(farmId, dongId, days = 7) {
  try {
    // 샘플 데이터 반환
    return {
      dates: generateDateRange(days),
      wm: generateRandomData(1500, 1700, days),
      scale: generateRandomData(1520, 1720, days),
      wc: generateRandomData(1510, 1710, days)
    };
  } catch (error) {
    console.error('중량 추이 데이터 가져오기 실패:', error);
    return { dates: [], wm: [], scale: [], wc: [] };
  }
}

// R2 트렌드 데이터 가져오기
async function fetchR2TrendData(farmId, dongId, days = 7) {
  try {
    // 샘플 데이터 반환
    return {
      dates: generateDateRange(days),
      r2: generateRandomData(0.97, 0.99, days, 3)
    };
  } catch (error) {
    console.error('R2 트렌드 데이터 가져오기 실패:', error);
    return { dates: [], r2: [] };
  }
}

// 오차 분포 데이터 가져오기
async function fetchErrorDistributionData() {
  try {
    // 샘플 데이터 반환
    return {
      ranges: ['-120g~-80g', '-80g~-40g', '-40g~0g', '0g~40g', '40g~80g', '80g~120g'],
      counts: [2, 5, 12, 15, 3, 1]
    };
  } catch (error) {
    console.error('오차 분포 데이터 가져오기 실패:', error);
    return { ranges: [], counts: [] };
  }
}

// 성공률 데이터 가져오기
async function fetchSuccessRateData() {
  try {
    // 샘플 데이터 반환
    return {
      total: 92.8,
      breeding: 94.2,
      shipping: 89.5
    };
  } catch (error) {
    console.error('성공률 데이터 가져오기 실패:', error);
    return { total: 0, breeding: 0, shipping: 0 };
  }
}

// FCR 데이터 가져오기
async function fetchFCRData(farmId) {
  try {
    // 샘플 데이터 반환
    return {
      dongs: ['H01', 'H02', 'H03', 'H04', 'H05'],
      values: [1.57, 1.62, 1.54, 1.59, 1.61]
    };
  } catch (error) {
    console.error('FCR 데이터 가져오기 실패:', error);
    return { dongs: [], values: [] };
  }
}

// 알림 데이터 가져오기
async function fetchNotificationData(limit = 10) {
  try {
    // 샘플 데이터 반환
    return [
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
  } catch (error) {
    console.error('알림 데이터 가져오기 실패:', error);
    return [];
  }
}

// 유틸리티 함수들
function generateDateRange(days) {
  const dates = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split('T')[0].slice(5)); // MM-DD 형식
  }
  
  return dates;
}

function generateRandomData(min, max, count, decimals = 0) {
  const data = [];
  
  for (let i = 0; i < count; i++) {
    const value = min + Math.random() * (max - min);
    data.push(decimals > 0 ? Number(value.toFixed(decimals)) : Math.round(value));
  }
  
  return data;
}

// 데이터 포맷팅 함수들
function formatWeight(weight) {
  return `${weight.toLocaleString()}g`;
}

function formatError(error) {
  return `${error > 0 ? '+' : ''}${error}g`;
}

function formatR2(r2) {
  return r2.toFixed(3);
}

function formatPercentage(value) {
  return `${value.toFixed(1)}%`;
}
