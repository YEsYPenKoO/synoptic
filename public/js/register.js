window.onload = function() {
    document.querySelector('#add_user').addEventListener('submit', function(event) {
        let emptyFields = [];
        document.querySelectorAll('#add_user input').forEach(function(input) {
            if (input.value.trim() === '') {
                let label = document.querySelector('label[for="' + input.id + '"]');
                let fieldName = label ? label.innerText : input.name;
                emptyFields.push(fieldName);
            }
        });
        if (emptyFields.length > 0) {
            event.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill out the following fields: ' + emptyFields.join(', ')
            });
        }
    });
};

// Function to display the pop-up message
function showPopup() {
    Swal.fire(
        'Good job!',
        'Request sent successfully!',
        'success'
    );
}

// Add an event listener to the form submission for prescriptions
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
                    'Good job!',
                    data.message,
                    'success'
                );
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.message,
                });
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
