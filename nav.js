document.addEventListener('DOMContentLoaded', function() {
  // 네비게이션 바 로드
  loadNavigation();
});

// 네비게이션 바 로드 함수
function loadNavigation() {
  // 현재 경로에 따라 nav.html 경로 설정
  let navPath = 'nav.html';
  
// 현재 URL이 Ver.1 또는 Ver.2 폴더에 있는 경우 상위 경로 추가
if (window.location.href.includes('/Ver.1/') || window.location.href.includes('/Ver.2/')) {
  navPath = '../nav.html';
}
  
  console.log('네비게이션 바 로드 시도:', navPath);
  
  // nav.html 파일 가져오기
  fetch(navPath)
    .then(response => {
      if (!response.ok) {
        throw new Error('네비게이션 바 로드 실패: ' + response.status);
      }
      return response.text();
    })
    .then(data => {
      console.log('네비게이션 바 로드 성공');
      // 네비게이션 바를 body의 첫 번째 자식으로 삽입
      document.body.insertAdjacentHTML('afterbegin', data);
      
      // 현재 페이지 URL에 따라 활성 버튼 설정
      setActiveButton();
      
      // 메모 내용 저장 기능 추가
      addNotesSaveFunction();
    })
    .catch(error => {
      console.error('네비게이션 바 로드 중 오류 발생:', error);
      // 오류 발생 시 사용자에게 알림
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = 'position: fixed; top: 10px; left: 10px; background: #f44336; color: white; padding: 10px; border-radius: 5px; z-index: 9999;';
      errorDiv.textContent = '네비게이션 바 로드 실패: ' + error.message;
      document.body.appendChild(errorDiv);
    });
}

// 현재 페이지 URL에 따라 활성 버튼 설정
function setActiveButton() {
  // 현재 페이지 URL 가져오기
  const currentUrl = window.location.href;
  console.log('현재 URL:', currentUrl);
  
  // 모든 버튼에서 active 클래스 제거
  const buttons = document.querySelectorAll('.version-btn');
  buttons.forEach(button => {
    button.classList.remove('active');
  });
  
  // 현재 URL에 따라 적절한 버튼에 active 클래스 추가
  if (currentUrl.includes('/Ver.1')) {
    const ver1Btn = document.getElementById('ver1-btn');
    if (ver1Btn) {
      ver1Btn.classList.add('active');
      console.log('버전 1 버튼 활성화');
    } else {
      console.warn('버전 1 버튼을 찾을 수 없음');
    }
  } else if (currentUrl.includes('/Ver.2')) {
    const ver2Btn = document.getElementById('ver2-btn');
    if (ver2Btn) {
      ver2Btn.classList.add('active');
      console.log('버전 2 버튼 활성화');
    } else {
      console.warn('버전 2 버튼을 찾을 수 없음');
    }
  } else if (currentUrl.includes('/Ver.3')) {
    document.getElementById('ver3-btn')?.classList.add('active');
  } else if (currentUrl.includes('/Ver.4')) {
    document.getElementById('ver4-btn')?.classList.add('active');
  } else if (currentUrl.includes('/Ver.5')) {
    document.getElementById('ver5-btn')?.classList.add('active');
  } else if (!currentUrl.includes('/Ver.')) {
    // 루트 디렉토리의 index.html인 경우 버전 3 버튼 활성화
    const ver3Btn = document.getElementById('ver3-btn');
    if (ver3Btn) {
      ver3Btn.classList.add('active');
      console.log('버전 3 버튼 활성화');
    } else {
      console.warn('버전 3 버튼을 찾을 수 없음');
    }
  }
}

// 메모 내용 저장 기능 추가
function addNotesSaveFunction() {
  const noteContents = document.querySelectorAll('.note-content');
  console.log('메모 내용 요소 수:', noteContents.length);
  
  noteContents.forEach(content => {
    // 포커스를 잃을 때 내용 저장
    content.addEventListener('blur', function() {
      const noteId = this.id;
      const noteText = this.innerHTML;
      
      // 로컬 스토리지에 메모 내용 저장
      localStorage.setItem(noteId, noteText);
      console.log('메모 저장:', noteId);
    });
    
    // 저장된 내용 불러오기
    const noteId = content.id;
    const savedContent = localStorage.getItem(noteId);
    if (savedContent) {
      content.innerHTML = savedContent;
      console.log('저장된 메모 로드:', noteId);
    }
  });
}
