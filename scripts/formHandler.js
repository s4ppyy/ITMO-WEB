document.addEventListener("DOMContentLoaded", function () {
    const reservationForm = document.getElementById("requestForm");
    const container_form = document.getElementById("container_form");
    const templateTable = document.getElementById('tracklist');

    const savedReservations = JSON.parse(localStorage.getItem("reservations")) || [];

    for (let i = 0; i < savedReservations.length; i++) {
        displayReservationResult(savedReservations[i], i);
    }

    reservationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const requestData = {
            songName: document.getElementById("songName").value,
            songURL: document.getElementById("suggestedURL").value,
            email: document.getElementById("authorEmail").value
        };

        if (requestData.songName === "") {
            alert("Пожалуйста, введите название трека");
            return;
        }

        if (requestData.songURL === "") {
            alert("Пожалуйста, введите ссылку на трек/табы");
            return;
        }

        if (requestData.email === "") {
            alert("Пожалуйста, введите электронную почту");
            return;
        }

        savedReservations.push(requestData);
        localStorage.setItem("reservations", JSON.stringify(savedReservations));

        displayReservationResult(requestData, savedReservations.length - 1);
        reservationForm.reset();
    });

    function displayReservationResult(requestData, index) {
        const reservationResultClone = document.importNode(templateTable.content, true);

        const labels = reservationResultClone.querySelectorAll(".reservation_label");
        // const paragraphs = reservationResultClone.querySelectorAll("p");
        const deleteButton = reservationResultClone.querySelector(".reservation_delete");

        labels[0].textContent = `Трек: ${requestData.songName}`;
        labels[1].textContent = `Ссылка: ${requestData.songURL}`;
        labels[2].textContent = `Электронная почта: ${requestData.email}`;

        deleteButton.dataset.index = index;

        deleteButton.addEventListener("click", function () {
            removeReservation(index);
            reservationResultClone.remove();
        });

        container_form.appendChild(reservationResultClone);
    }

    function removeReservation(index) {
        savedReservations.splice(index, 1);
        localStorage.setItem("reservations", JSON.stringify(savedReservations));
    }
});