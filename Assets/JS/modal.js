const checkbox = document.getElementById('agreement-checkbox');
const openModalLink = document.getElementById('open-modal');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalBtn = document.getElementById('close-modal');
const closeModalFooterBtn = document.getElementById('closeModalFooter'); // 新增的 footer 按鈕
const agreeButton = document.getElementById('agree-button');
const modalContent = document.getElementById('modal-content');
const body = document.body;

const closeErrorModalBtn = document.getElementById('closeErrorModal'); // 新增的錯誤彈窗關閉按鈕
const closeErrorModalFooterBtn = document.getElementById('closeModalFooter'); // 錯誤彈窗footer按鈕

let hasAgreed = false; // Track if the user has agreed before

// Set the initial state of the agreeButton to be disabled
agreeButton.disabled = true;
agreeButton.classList.remove('enabled');

// Open modal
openModalLink.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = 'flex';
  modalOverlay.style.display = 'block';
  body.style.overflow = 'hidden'; // Prevent page scroll when modal is open
});

// Close modal from the close button in the header
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  modalOverlay.style.display = 'none';
  body.style.overflow = ''; // Re-enable page scroll when modal is closed
});

// Close modal from the close button in the footer
closeModalFooterBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  modalOverlay.style.display = 'none';
  body.style.overflow = ''; // Re-enable page scroll when modal is closed
});

// Enable the button when scrolled to the bottom
modalContent.addEventListener('scroll', () => {
  const distanceFromBottom = modalContent.scrollHeight - modalContent.scrollTop - modalContent.clientHeight;
  const triggerDistance = 100; // When scrolled 100px from the bottom, enable the button
  if (distanceFromBottom <= triggerDistance) {
    agreeButton.disabled = false;
    agreeButton.classList.add('enabled');
  }
});

// Confirm agreement
agreeButton.addEventListener('click', () => {
  modal.style.display = 'none';
  modalOverlay.style.display = 'none';
  checkbox.checked = true;
  checkbox.disabled = false;
  hasAgreed = true; // Mark that the user has agreed
  body.style.overflow = ''; // Re-enable page scroll after agreement
});

// Prevent opening modal again if the user has already agreed
checkbox.addEventListener('click', (e) => {
  if (!hasAgreed) {
    e.preventDefault();
    modal.style.display = 'flex';
    modalOverlay.style.display = 'block';
    body.style.overflow = 'hidden'; // Prevent page scroll when modal is open
  }
});





//error-modal-test 僅測試

// Close error modal
// closeErrorModalBtn.addEventListener('click', () => {
//   document.getElementById("serverErrorOverlay").style.display = "none";  
//   document.getElementById("serverErrorModal").style.display = "none";    
//   body.style.overflow = '';  // 恢復頁面滾動
// });

// Close error modal from footer button
// closeErrorModalFooterBtn.addEventListener('click', () => {
//   document.getElementById("serverErrorOverlay").style.display = "none";  
//   document.getElementById("serverErrorModal").style.display = "none";    
//   body.style.overflow = '';  
// });

// function simulateServerRequest() {
//   return new Promise((resolve, reject) => {
//       setTimeout(() => {
//           reject(new Error("Server Error"));
//       }, 1000); 
//   });
// }

// simulateServerRequest()
//   .then(() => {
//       console.log("伺服器請求成功");
//   })
//   .catch((error) => {
//       console.error(error.message);
//       document.getElementById("serverErrorOverlay").style.display = "none"; // block
//       document.getElementById("serverErrorModal").style.display = "none"; //flex
//       body.style.overflow = 'none'; //hidden
//   });
