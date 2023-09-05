// accessing the required elements
const form_container = document.getElementById('form-container');
const form = document.getElementById('sopForm');
const isStudiedCanada = document.getElementsByName('studiedCanada');
const canadianInstitute = document.getElementById('canadianInstitute');
const canadianProgram = document.getElementById('canadianProgram');
const canadadetails = document.querySelectorAll('.canadadetail');
const tuitionPaid = document.getElementsByName('tuitionPaid');
const tuitionFee = document.getElementById('tuitionFee');
const tution = document.querySelector('.tution');
const gicDone = document.getElementsByName('gicDone');
const gicAmount = document.getElementById('gicAmount');
const gic = document.querySelector('.gic');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const loader = document.querySelector('.loader');
const age = document.getElementById('age');
const listeningScore = document.getElementById('listeningScore');
const readingScore = document.getElementById('readingScore');
const speakingScore = document.getElementById('speakingScore');
const writingScore = document.getElementById('writingScore');


// condition checking for input field to have values between 1 and 100
age.addEventListener('input', () => {
    const ageValue = parseInt(age.value);

    if(ageValue < 1 || ageValue > 100){
        alert('Value must be between 1 and 100');
        age.value = '';
    }
});


// condition checking for input field to have values between 0 and 100
listeningScore.addEventListener('input', () => {
    const listeningValue = parseInt(listeningScore.value);

    if(listeningValue < 0 || listeningValue > 100){
        alert('Value must be between 0 and 100');
        listeningScore.value = '';
    }
});


// condition checking for input field to have values between 0 and 100
readingScore.addEventListener('input', () => {
    const readingValue = parseInt(readingScore.value);

    if(readingValue < 0 || readingValue > 100){
        alert('Value must be between 0 and 100');
        readingScore.value = '';
    }
});


// condition checking for input field to have values between 0 and 100
speakingScore.addEventListener('input', () => {
    const speakingValue = parseInt(speakingScore.value);

    if(speakingValue < 0 || speakingValue > 100){
        alert('Value must be between 0 and 100');
        speakingScore.value = '';
    }
});


// condition checking for input field to have values between 0 and 100
writingScore.addEventListener('input', () => {
    const writingValue = parseInt(writingScore.value);

    if(writingValue < 0 || writingValue > 100){
        alert('Value must be between 0 and 100');
        writingScore.value = '';
    }
});


// Loop through the studiedCanada field to disable or enable the input field of canada Institute and program
for(let isStudied of isStudiedCanada){

    isStudied.addEventListener('click', () => {
        if(isStudied.value === 'Yes'){
            canadianInstitute.disabled = false;
            canadianProgram.disabled = false;
            canadadetails.forEach((detail) => {
                detail.style.display = 'inline-block';
            });
        }
        else{
            canadianInstitute.disabled = true;
            canadianProgram.disabled = true;
            canadadetails.forEach((detail) => {
                detail.style.display = 'none';
            });
        }
    });

}


// Loop through the tutionPaid field to enable or disable the input field of tution fee paid
for(let tution_paid of tuitionPaid){

    tution_paid.addEventListener('click',() => {
        if (tution_paid.value === 'Yes') {
            tuitionFee.disabled = false;
            tution.style.display = 'inline-block';
        }
        else{
            tuitionFee.disabled = true;
            tution.style.display = 'none';
        }
    });

}


// Loop through the gicDone field to enable or disable the input field of GIC fee paid
for(let gic_done of gicDone){

    gic_done.addEventListener('click',() => {
        if (gic_done.value === 'Yes') {
            gicAmount.disabled = false;
            gic.style.display = 'inline-block';
        }
        else{
            gicAmount.disabled = true;
            gic.style.display = 'none';
        }
    });

}


// Check that all the input which are not disabled have some value or not
function areAllInputsFilled() {

    const inputs = form.querySelectorAll('input[required]:not([disabled])');

    for (const input of inputs) {
        if (!input.value.trim()) {
            return false;
        }
    }

    return true;

}


// Check if all the not disabled field have some value then enable the submit button
form.addEventListener('input', () => {

    if (areAllInputsFilled()) {
        submitButton.removeAttribute('disabled');
    }
    else{
        submitButton.setAttribute('disabled', 'disabled');
    }

});

// url to which the ajax call to be done
const baseUrl = '/';

// adding a listener function to the submit button
submitButton.addEventListener('click', submitForm);

// calling an asynchronous submitForm function
async function submitForm(e) {

    // preven the default submit behaviour
    e.preventDefault();

    // adding some dynamic styles on submission
    form_container.style.opacity = '0.3';
    loader.style.visibility = 'visible';

    // fetch all the input
    const inputs = form.querySelectorAll('input[required]:not([disabled]):not([type="radio"]), select[required]:not([disabled])');
    const radioButtons = form.querySelectorAll('input[type="radio"]:checked');    
    
    // Create an object to store the data
    const formData = {};
    
    // Loop through the selected input fields and store their values in the formData object
    inputs.forEach((input) => {
        formData[input.name] = input.value;
    });
    
    // Loop through the selected radio buttons and store their values in the formData object
    radioButtons.forEach((radioButton) => {
        formData[radioButton.name] = radioButton.value;
    });
    
    // Post the form data
    const res = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(formData)
    });

    // dynamic adding of styles
    loader.style.visibility = 'hidden';


    // if the res is ok then render success.html page
    if (res.ok) {

        const successHtmlResponse = await fetch('success.html');
        
        const successHtml = await successHtmlResponse.text();
        
        // Create a new div element and set its content to the successHtml
        const successDiv = document.createElement('div');
        successDiv.innerHTML = successHtml;

        // Replace the existing content of the body with the success content
        document.body.innerHTML = '';
        document.body.appendChild(successDiv);

    }
    else{
        // Handle the case when the form submission failed
        console.error('Form submission failed.');
    }

}