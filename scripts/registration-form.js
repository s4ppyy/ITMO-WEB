document.addEventListener('DOMContentLoaded', function () {
    const registrationButton = document.getElementById('registration-button');

    if (registrationButton) {
        registrationButton.addEventListener('click', showRegistrationForm);
    }

    function showRegistrationForm() {
        Swal.fire({
            title: 'Регистрация',
            html:
                '<label for="swal_username">Имя пользователя:</label>' +
                '<input id="swal_username" class="swal2-input" required>' +
                '<label for="swal_email">Электронная почта:</label>' +
                '<input id="swal_email" class="swal2-input" type="email" required>' +
                '<label for="swal_password">Пароль:</label>' +
                '<input id="swal_password" class="swal2-input" type="password" required>',
            focusConfirm: false,

            preConfirm: () => {
                const swalUsername = Swal.getPopup().querySelector('#swal_username').value;
                const swalEmail = Swal.getPopup().querySelector('#swal_email').value;
                const swalPassword = Swal.getPopup().querySelector('#swal_password').value;

                if (swalUsername === "") {
                    Swal.showValidationMessage('Введите имя пользователя');
                    return false;
                }

                if (!isValidEmail(swalEmail)) {
                    Swal.showValidationMessage('Введите корректный адрес электронной почты');
                    return false;
                }

                if (swalPassword === "") {
                    Swal.showValidationMessage('Введите пароль');
                    return false;
                }

                alert('Вы вошли в систему.\n' +
                    `Имя пользователя: ${swalUsername}\n` +
                    `Электронная почта: ${swalEmail}\n` +
                    `Пароль: ${swalPassword}`)
            },
        });
    }
});

function isValidEmail(email) {
    return email.includes('@');
}