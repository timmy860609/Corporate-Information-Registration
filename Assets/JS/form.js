function validateForm() {
    const fields = [
        { id: 'name', message: '請填寫姓名', validate: (value) => value.trim() !== '' },
        { id: 'phone', message: '請輸入有效的手機號碼', validate: (value) => /^\d{10}$/.test(value.trim()) },
        { id: 'email', message: '請輸入正確的電子郵件', validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) },
        { id: 'school', message: '請填寫學校名稱', validate: (value) => value.trim() !== '' },
        { id: 'deparment', message: '請填寫科系名稱', validate: (value) => value.trim() !== '' },
    ];

    let isValid = true;

    fields.forEach((field) => {
        const input = document.getElementById(field.id);
        const parent = input.parentNode;
        let errorContainer = parent.querySelector('.error-message');
        
        if (!errorContainer) {
            errorContainer = document.createElement('p');
            errorContainer.className = 'error-message';
            errorContainer.textContent = field.message;
            parent.appendChild(errorContainer);
        }

        if (!field.validate(input.value)) {
            parent.classList.add('invalid');
            isValid = false;
        } else {
            parent.classList.remove('invalid');
        }

        input.addEventListener('input', () => {
            if (field.validate(input.value)) {
                parent.classList.remove('invalid');
            }
        });
    });

    if (isValid) {
        const formData = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            school: document.getElementById("school").value,
            department: document.getElementById("deparment").value,
            style: document.querySelector('input[name="styleToggle"]:checked').nextElementSibling.innerText,
        };

        localStorage.setItem("formData", JSON.stringify(formData));
        window.location.href = "agreement.html";
    }
}

function goToResult() {
    window.location.href = "result.html";
}

function displayData() {
    const formData = JSON.parse(localStorage.getItem("formData"));
    if (formData) {
        document.getElementById("result-name").textContent = formData.name;
        document.getElementById("result-phone").textContent = formData.phone;
        document.getElementById("result-email").textContent = formData.email;
        document.getElementById("result-school").textContent = formData.school;
        document.getElementById("result-department").textContent = formData.department;
        document.getElementById("result-style").textContent = formData.style;

        // 清空 localStorage
        localStorage.removeItem("formData");
    } else {
        console.error("No form data found");
    }
}

window.onload = displayData;
