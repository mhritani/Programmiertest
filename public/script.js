window.addEventListener("click", (evt) => {
    if (!(evt.target instanceof HTMLDivElement) || !evt.target.classList.contains("box")) {
        return;
    }
    evt.preventDefault();
    const { id } = evt.target.dataset;
    fetch("http://localhost:8001/games", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ tuer: id }),
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            if (response.success == "1") {
                if (response.info) {
                    return alert(response.info);
                }
                if (response.win) {
                    return alert("Du hast gewonnen!");
                }
                alert(`Du hasts verloren,${2 - response.tries} Versuchen gebleiben`);
            } else {
                alert("Invalid Credentials!");
            }
        });
});
