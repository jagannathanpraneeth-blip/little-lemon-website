// Form validation for Little Lemon booking form
document.addEventListener('DOMContentLoaded', function() {
    console.log('Little Lemon website loaded successfully!');
    
    // Get the booking form
    const bookingForm = document.getElementById('reservationForm');
    const confirmation = document.getElementById('confirmation');
    
    if (bookingForm) {
        // Set minimum date to today
        const dateInput = document.getElementById('date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        // Form submission handler
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Simulate API call
                simulateApiCall()
                    .then(() => {
                        bookingForm.style.display = 'none';
                        confirmation.style.display = 'block';
                    })
                    .catch(error => {
                        alert('There was an error processing your reservation. Please try again.');
                        console.error('API Error:', error);
                    });
            }
        });
        
        // Real-time validation on input blur
        const inputs = bookingForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                hideError(this.id + 'Error');
            });
        });
    }
    
    // Validation functions
    function validateForm() {
        let isValid = true;
        
        // Validate name
        const name = document.getElementById('fullName').value.trim();
        if (name === '') {
            showError('nameError', 'Please enter your full name');
            isValid = false;
        } else {
            hideError('nameError');
        }
        
        // Validate email
        const email = document.getElementById('email').value.trim();
        if (!isValidEmail(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        } else {
            hideError('emailError');
        }
        
        // Validate phone
        const phone = document.getElementById('phone').value.trim();
        if (!isValidPhone(phone)) {
            showError('phoneError', 'Please enter a valid phone number');
            isValid = false;
        } else {
            hideError('phoneError');
        }
        
        // Validate date
        const date = document.getElementById('date').value;
        if (!isValidDate(date)) {
            showError('dateError', 'Please select a valid date');
            isValid = false;
        } else {
            hideError('dateError');
        }
        
        // Validate time
        const time = document.getElementById('time').value;
        if (!isValidTime(time)) {
            showError('timeError', 'Please select a valid time');
            isValid = false;
        } else {
            hideError('timeError');
        }
        
        // Validate guests
        const guests = document.getElementById('guests').value;
        if (!isValidGuests(guests)) {
            showError('guestsError', 'Please enter a number between 1 and 12');
            isValid = false;
        } else {
            hideError('guestsError');
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidPhone(phone) {
        const re = /^[\+]?[1-9][\d]{0,15}$/;
        return re.test(phone.replace(/[\s\-\(\)]/g, ''));
    }
    
    function isValidDate(date) {
        if (!date) return false;
        
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return selectedDate >= today;
    }
    
    function isValidTime(time) {
        if (!time) return false;
        
        // Basic time validation (can be enhanced with restaurant hours)
        const [hours, minutes] = time.split(':').map(Number);
        return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
    }
    
    function isValidGuests(guests) {
        const num = parseInt(guests, 10);
        return !isNaN(num) && num >= 1 && num <= 12;
    }
    
    function validateField(field) {
        switch(field.id) {
            case 'fullName':
                if (field.value.trim() === '') {
                    showError('nameError', 'Please enter your full name');
                } else {
                    hideError('nameError');
                }
                break;
            case 'email':
                if (!isValidEmail(field.value.trim())) {
                    showError('emailError', 'Please enter a valid email address');
                } else {
                    hideError('emailError');
                }
                break;
            case 'phone':
                if (!isValidPhone(field.value.trim())) {
                    showError('phoneError', 'Please enter a valid phone number');
                } else {
                    hideError('phoneError');
                }
                break;
            case 'date':
                if (!isValidDate(field.value)) {
                    showError('dateError', 'Please select a valid date');
                } else {
                    hideError('dateError');
                }
                break;
            case 'time':
                if (!isValidTime(field.value)) {
                    showError('timeError', 'Please select a valid time');
                } else {
                    hideError('timeError');
                }
                break;
            case 'guests':
                if (!isValidGuests(field.value)) {
                    showError('guestsError', 'Please enter a number between 1 and 12');
                } else {
                    hideError('guestsError');
                }
                break;
        }
    }
    
    function showError(id, message) {
        const errorElement = document.getElementById(id);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function hideError(id) {
        const errorElement = document.getElementById(id);
        errorElement.style.display = 'none';
    }
    
    // Simulate API call
    function simulateApiCall() {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // Simulate random failure (10% chance)
                if (Math.random() < 0.1) {
                    reject('API server error');
                } else {
                    resolve('Success');
                }
            }, 1500);
        });
    }
});