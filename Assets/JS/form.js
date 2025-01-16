
function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        name: urlParams.get('name'),
        phone: urlParams.get('phone'),
        email: urlParams.get('email'),
        school: urlParams.get('school'),
        department: urlParams.get('department'),
        style: urlParams.get('style'),
    };
}


function displayData() {
    const params = getQueryParams();
    if (document.getElementById("confirm-name")) {
        document.getElementById("confirm-name").textContent = params.name;
        document.getElementById("confirm-phone").textContent = params.phone;
        document.getElementById("confirm-email").textContent = params.email;
        document.getElementById("confirm-school").textContent = params.school;
        document.getElementById("confirm-department").textContent = params.department;
        document.getElementById("confirm-style").textContent = params.style;
    }
    if (document.getElementById("result-name")) {
        document.getElementById("result-name").textContent = params.name;
        document.getElementById("result-phone").textContent = params.phone;
        document.getElementById("result-email").textContent = params.email;
        document.getElementById("result-school").textContent = params.school;
        document.getElementById("result-department").textContent = params.department;
        document.getElementById("result-style").textContent = params.style;
    }
}

function validateForm() {
    const fields = [
        { id: 'name', message: '請填寫姓名', validate: (value) => value.trim() !== '' },
        { id: 'phone', message: '請輸入有效的手機號碼', validate: (value) => /^\d{10}$/.test(value.trim()) },
        { id: 'email', message: '請輸入正確的電子郵件', validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) },
        { id: 'school', message: '請填寫學校名稱', validate: (value) => value.trim() !== '' },
        { id: 'deparment', message: '請填寫科系名稱', validate: (value) => value.trim() !== '' },
    ];

    let isValid = true;
    let firstInvalidField = null;

  
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
            if (!firstInvalidField) {
                firstInvalidField = input; 
            }
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

  
    if (!isValid && firstInvalidField) {
        firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

   
    if (isValid) {
        const name = encodeURIComponent(document.getElementById("name").value);
        const phone = encodeURIComponent(document.getElementById("phone").value);
        const email = encodeURIComponent(document.getElementById("email").value);
        const school = encodeURIComponent(document.getElementById("school").value);
        const department = encodeURIComponent(document.getElementById("deparment").value);
        const style = encodeURIComponent(document.querySelector('input[name="styleToggle"]:checked').nextElementSibling.innerText);

      
        const url = `agreement.html?name=${name}&phone=${phone}&email=${email}&school=${school}&department=${department}&style=${style}`;

        
        window.location.href = url;
    }
}


function goToResult() {
    const params = getQueryParams();
    const resultUrl = `result.html?name=${params.name}&phone=${params.phone}&email=${params.email}&school=${params.school}&department=${params.department}&style=${params.style}`;
    window.location.href = resultUrl;
}


window.onload = displayData;
