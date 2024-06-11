document.addEventListener('DOMContentLoaded', function() {
    const prescriptionForm = document.getElementById('prescription-form');
    const appointmentForm = document.getElementById('appointment-form');

    prescriptionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        uploadFile(prescriptionForm, '/admin/upload-prescriptions');
    });

    appointmentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        uploadFile(appointmentForm, '/admin/upload-appointments');
    });

    function uploadFile(form, url) {
        const formData = new FormData(form);
        
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Display a success message
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while uploading the file.');
        });
    }
});
