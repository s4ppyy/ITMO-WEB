// $(document).ready(function() {
//
//     const path = window.location.pathname;
//
//     if(path === '/index.html')
//         $('.nav_a__index').addClass('activeNavColor');
//     else if(path === '/html/.html')
//         $('#pageOneNav').addClass('activeNavColor');
//
// });

window.addEventListener("load", () => {
    const currentPage = window.location.href;

    const pages = document.querySelectorAll('a');

    pages.forEach(function (page) {
        const dataId = page.getAttribute('data-id');
        if (currentPage.includes(dataId)) {
            page.classList.add('nav_a__this');
        }
    })
})

