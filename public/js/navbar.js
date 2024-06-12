document.addEventListener("DOMContentLoaded", function () {
    // Get the title of the page
    let title = document.title;
    let navbarNames = document.querySelectorAll(".navbar-name");
    navbarNames.forEach((navbarName) => {
        if (title.includes(navbarName.textContent)) {
            let parent = navbarName.parentElement;
            parent.classList.add("selected");
        }
    });
});

function logout() {
    console.log("Logging out");
    fetch("/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (response.status === 200) {
            window.location.href = "/login";
        }
    });
}

function goToDashboard() {
    fetch('/get-profile-id')
        .then(response => response.json())
        .then(data => {
            if (data.profileId) {
                window.location.href = `/dashboard?profile_id=${data.profileId}`;
            } else {
                alert('Profile ID not found');
            }
        })
        .catch(error => console.error('Error:', error));
}
