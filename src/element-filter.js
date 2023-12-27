import removeIfDonation from './donation-remover.js';
import removeIfGender from './gender-remover.js';
import displayChatOneLine from './chat-one-line.js';
import setChatColor from './chat-color-setter.js';

// TODO: 필터링 목록 선택할 수 있도록 조정
const targetNode = document.getElementById('chat_area');

const observerConfig = { attributes: false, childList: true, subtree: true };

const callback = function (mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        removeIfDonation(node);
        removeIfGender(node);
        displayChatOneLine(node);
        setChatColor(node);
      });
    }
  }
};

// 옵저버 인스턴스 생성
const observer = new MutationObserver(callback);

// 옵저버 시작
observer.observe(targetNode, observerConfig);