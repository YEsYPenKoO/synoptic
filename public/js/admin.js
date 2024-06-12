document.addEventListener('DOMContentLoaded', function() {
    const prescriptionForm = document.getElementById('prescriptionsForm');
    const appointmentForm = document.getElementById('appointmentsForm');

    prescriptionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        uploadFile(prescriptionForm, '/admin/upload-prescriptions', 'Prescriptions uploaded successfully!');
    });

    appointmentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        uploadFile(appointmentForm, '/admin/upload-appointments', 'Appointments uploaded successfully!');
    });

    function uploadFile(form, url, successMessage) {
        const formData = new FormData(form);
        
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                showPopup(successMessage);
            } else {
                throw new Error('Upload failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred while uploading the file.',
            });
        });
    }

    // Function to display the pop-up message
    function showPopup(message) {
        Swal.fire(
            'Upload Successful!',
            message,
            'success'
        );
    }
});
