const radios1 = document.querySelectorAll('input[name="styleToggle"]');

if (radios1.length > 0) {
    radios1.forEach(radio => {
        radio.addEventListener('change', () => {
            console.log(`選擇了 ${radio.nextElementSibling.innerText}`);
        });
    });
} else {
    console.warn('未找到任何 name="styleToggle" 的單選按鈕');
}
