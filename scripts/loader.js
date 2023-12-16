document.addEventListener('DOMContentLoaded', async function () {
    const preloaderContainer = document.querySelector('.preloader-container'); // preloader - spinner
    const userCardsContainer = document.querySelector('.cards-container');
    const errorMessageContainer = document.querySelector('.error-message');
    const errorText = document.querySelector('.error-text');

    try {
        const fetchString = (Math.floor(Math.random() * 2) === 0) // pseudo-random filtering
            ? 'https://jsonplaceholder.typicode.com/users?id_lte=5'
            : 'https://jsonplaceholder.typicode.com/users?id_gte=6';

        preloaderContainer.style.display = 'flex';
        const response = await fetch(fetchString); // resource request

        await new Promise(resolve => setTimeout(resolve, 2000));

        if (response.ok) {
            const users = await response.json();
            preloaderContainer.style.display = 'none';
            const userCardTemplate = document.getElementById('user-card-template');
            users.forEach(user => {
                const userCard = document.importNode(userCardTemplate.content, true);
                userCard.querySelector('.username').textContent = `Ник пользователя: ${user.username}`;
                userCard.querySelector('.name').textContent = `Имя: ${user.name}`;
                userCard.querySelector('.email').textContent = `Почта: ${user.email}`;
                userCard.querySelector('.phone').textContent = `Телефон: ${user.phone}`;
                userCardsContainer.appendChild(userCard);
            });
        }
        else {
            throw new Error('Network response Error');
        }
    } catch (error) {
        preloaderContainer.style.display = 'none';
        errorMessageContainer.style.display = 'flex';
        errorText.innerText = 'Что-то пошло не так';
        console.log(error);
    }
});