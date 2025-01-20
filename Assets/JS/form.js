function validateForm() {
    const fields = [
        { id: 'name', message: '請填寫姓名', validate: (value) => value.trim() !== '' },
        { id: 'phone', message: '請輸入有效的手機號碼', validate: (value) => /^\d{10}$/.test(value.trim()) },
        { id: 'email', message: '請輸入正確的電子郵件', validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) },
        { id: 'school', message: '請填寫學校名稱', validate: (value) => value.trim() !== '' },
        { id: 'department', message: '請填寫科系名稱', validate: (value) => value.trim() !== '' },
    ];

    let isValid = true;
    let firstErrorField = null; 

    fields.forEach((field) => {
        const input = document.getElementById(field.id);
        const parent = input.parentNode;

        let errorContainer = parent.querySelector('.error-message');
        
        if (!errorContainer) {
            errorContainer = document.createElement('p');
            errorContainer.className = 'error-message';
            parent.appendChild(errorContainer);
        }

        if (!field.validate(input.value)) {
            parent.classList.add('invalid');
            errorContainer.textContent = field.message;
            isValid = false;

            if (!firstErrorField) {
                firstErrorField = input;
            }
        } else {
            parent.classList.remove('invalid');
            errorContainer.textContent = '';
        }

        input.addEventListener('input', () => {
            if (field.validate(input.value)) {
                parent.classList.remove('invalid');
                errorContainer.textContent = '';
            } else {
                parent.classList.add('invalid');
                errorContainer.textContent = field.message;
            }
        });
    });

    const agreementCheckbox = document.getElementById('agreement-checkbox');
    const agreementContainer = document.querySelector('.agree-check');
    let errorContainer = agreementContainer.querySelector('.error-message');

    if (!errorContainer) {
        errorContainer = document.createElement('p');
        errorContainer.className = 'error-message';
        agreementContainer.insertBefore(errorContainer, agreementContainer.firstChild);
    }

    // 取消 disabled 屬性
    agreementCheckbox.disabled = false;

    // 強制開啟同意事項的 modal
    agreementCheckbox.addEventListener('click', (e) => {
        if (!agreementCheckbox.checked) {
            const modal = document.getElementById('modal');
            const modalOverlay = document.getElementById('modal-overlay');
            const body = document.body;
            modal.style.display = 'flex';
            modalOverlay.style.display = 'block';
            body.style.overflow = 'hidden'; // 防止頁面滾動
        }
    });

    if (!agreementCheckbox.checked) {
        agreementContainer.classList.add('invalid');
        errorContainer.textContent = '請先閱讀並同意個人資料蒐集告知及聲明';
        isValid = false;

        if (!firstErrorField) {
            firstErrorField = agreementCheckbox;
        }
    } else {
        agreementContainer.classList.remove('invalid');
        errorContainer.textContent = '';
    }

    agreementCheckbox.addEventListener('change', () => {
        if (agreementCheckbox.checked) {
            agreementContainer.classList.remove('invalid');
            errorContainer.textContent = '';  
        } else {
            agreementContainer.classList.add('invalid');
            errorContainer.textContent = '請先閱讀並同意個人資料蒐集告知及聲明';
        }
    });

    const agreeButton = document.getElementById('agree-button');
    if (agreeButton) {
        agreeButton.addEventListener('click', () => {
            if (agreementCheckbox.checked) {
                agreementContainer.classList.remove('invalid');
                errorContainer.textContent = ''; 
            }
        });
    }

    if (!isValid && firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return isValid;
}
