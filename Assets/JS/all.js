
// -------------------------------toggletoken------------------------------

// 學歷
const radios1 = document.querySelectorAll('input[name="styleToggle"]');
radios.forEach(radio => {
    radio.addEventListener('change', () => {
        alert(`選擇了 ${radio.nextElementSibling.innerText}`);
    });
});
