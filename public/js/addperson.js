document.getElementById("create_user").addEventListener("submit", function(event) {
    event.preventDefault();
    Swal.fire(
        'Profile Created!',
        'Your profile has been successfully created.',
        'success'
    ).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "/chooseaccount"; // replace with the URL of your choose account page
        }
    });

    const formData = new URLSearchParams({
        firstname: document.getElementById('firstname').value,
        surname: document.getElementById('surname').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        sex: document.querySelector('input[name="sex"]:checked').value,
        pin: document.getElementById('pin').value,
    });

    fetch('/chooseaccount/add-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Changed this line
        },
        body: formData.toString(),
    });
});
