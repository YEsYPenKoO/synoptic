/*
 * Author: Will Rayner
 * Description: JavaScript for the Choose Account page.
 * Last Updated: [11/06/24] by Ed Turner
 */

let pin = '';
let selectedProfileName;
let selectedProfileId;

function showPasswordPrompt(event, profileName, profileId) {
    selectedProfileName = profileName;
    selectedProfileId = profileId;
    document.getElementById('passwordPrompt').style.display = 'flex';

    // Remove the selected class from all profiles
    var profiles = document.querySelectorAll('.profile-icon');
    profiles.forEach(function(profile) {
        profile.classList.remove('profile-icon-selected');
    });

    // Add the selected class to the clicked profile
    event.currentTarget.classList.add('profile-icon-selected');
}

function addToPin(num) {
    if (pin.length < 4) {
        pin += num;
        updatePinDisplay();
    }
}

function clearPin() {
    pin = '';
    updatePinDisplay();
}

function updatePinDisplay() {
    const pinDots = document.querySelectorAll('.pin-dot');
    for (let i = 0; i < 4; i++) {
        if (i < pin.length) {
            pinDots[i].style.backgroundColor = '#000000';
        } else {
            pinDots[i].style.backgroundColor = 'transparent';
        }
    }
}

function submitPin() {
    fetch(`/chooseaccount/check-pin?profile_id=${selectedProfileId}&pin=${pin}`)
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fetch(`/chooseaccount/store-profile-in-session?profile_id=${selectedProfileId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem('selectedProfile', selectedProfileName);
                    window.location.href = `/dashboard?profile_id=${selectedProfileId}`;
                } else {
                    alert('Error storing profile in session. Please try again.');
                }
            })
            .catch(error => console.error('Error:', error));
        } else {
            alert('Incorrect PIN. Please try again.');
            clearPin();
        }
    })
    .catch(error => console.error('Error:', error));
}

