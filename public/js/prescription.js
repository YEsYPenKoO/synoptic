// Function to display the pop-up message
function showPopup() {
    Swal.fire(
        'Request Sent!',
        'Request sent successfully!',
        'success'
    )
}

// Add an event listener to the form submission
document.querySelectorAll(".prescription-form").forEach(form => {
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        var formData = new FormData(this);
        fetch('/prescription/request', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire(
                    'Request Sent!',
                    data.message,
                    'success'
                )
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.message,
                })
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
