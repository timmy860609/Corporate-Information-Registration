
function goToResult(event) {
    event.preventDefault();

    if (validateForm()) {
        const formData = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            school: document.getElementById("school").value,
            department: document.getElementById("department").value,
            style: document.querySelector('input[name="styleToggle"]:checked')?.nextElementSibling.innerText || '',
        };

        localStorage.setItem("formData", JSON.stringify(formData));
        window.location.href = "result.html";
    } else {
        console.log("表單驗證失敗");
    }
}
