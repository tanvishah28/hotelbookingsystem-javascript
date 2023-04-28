// Instantiate Hotel
const hotel = new Hotel;

// Instantiate UI
const ui = new UI;

// Get hotels on DOM load
document.addEventListener('DOMContentLoaded', getHotelList);

// getHotelList function
function getHotelList() {
    hotel.getHotelList().then(results => {
        console.log(results);
        ui.showHotelList(results);
    }).catch(err => console.log(err));
}

// call add hotel form method of UI 
// ui.addHotelForm();

// Hide Add icon
document.querySelector('#add-icon').addEventListener('click', hideAddIcon);

function hideAddIcon(event) {
    console.log(event);
    if (event.target.matches('#add-icon')) {
        document.querySelector('#add-icon').style.display = 'none';
        ui.addHotelForm();
        // submitHotelForm(event);
    }
}

// Event listener for add hotel
document.addEventListener('click', (event) => {

    console.log('Inside click event listener ',event);
    // ui.clearAddIcon();

    // Get form values
    const hotel_id = document.getElementById('hotel_id'),
        hotel_name = document.getElementById('hotel_name'),
        hotel_location = document.getElementById('hotel_location'),
        hotel_phone = document.getElementById('hotel_phone'),
        hotel_email = document.getElementById('hotel_email'),
        hotel_rating = document.getElementById('hotel_rating'),
        pet_friendly = document.getElementById('pet_friendly');

    let target = event.target;

    // console.log('hotel id: ', hotel_id.value);
    // if (!pet_friendly.checked) {
    //     pet_friendly.checked === 'false';

    //     console.log('IF Pet friendly ', pet_friendly.checked);
    // } else {

    //     pet_friendly.checked === 'true';
    //     pet_friendly.click();
    //     console.log('ELSE Pet friendly ', pet_friendly.checked);
    // }

    // if (target.matches('#pet_friendly')) {
    //     console.log(event);
    // }

    // if target matches back button load the list of hotels
    if (target.matches('#back-btn') || target.matches('#cancel-btn')) {
        ui.removeForm();
        getHotelList();

    } else if (target.matches('#add-btn') || target.matches('#update-btn')) {

        console.log('Inside IF hotel id: ', hotel_id.value);

        if (hotel_id.value === '') {
            if (hotel_name.value === '' || hotel_location.value === '' || hotel_phone.value === '' || hotel_email.value === '' || hotel_rating.value === '') {

                ui.showAlert('Please fill in all fields', 'alert error');
            } else {
                // call addHotel function
                addHotel();
            }
        } else {
            editHotel();
        }
    }
    event.preventDefault();
})


// function hotelHandler(event) {
//     // console.log('Hotel handler: ', event.target.parentElement.parentNode.parentElement.lastElementChild);

//     // console.log('Inside hotel handler event ', event);

//     // if (event.target.parentElement.parentNode.parentElement.lastElementChild.className === 'hotel-form-class') {

//     //     // document.querySelector('.add-btn-class').addEventListener('click',submitHotelForm(event));

//     //     submitHotelForm(event);
//     //     console.log('Inside hotel handler IF block ', event);
//     //     event.preventDefault();
//     // }
// }

// document.addEventListener('click', (event) => {
//     event.preventDefault();
//     console.log('Inside hotel-div listener hotel: ', event);
//     submitHotelForm(event);
// });

// function submitHotelForm(event) {
//     // console.log('Inside submitHotel event: ', event.target.parentElement.parentElement.nextElementSibling);
//     console.log('Inside submitHotel: ', event);

//     // const targetElement = event.target.parentElement.parentElement.nextElementSibling;

//     // console.log('Target Element: ', targetElement);

//     // if (event.target.parentElement.parentElement.nextElementSibling === '#hotel-form') {
//         // document.querySelector('#hotel-form').addEventListener('click', (event) => {
//         // console.log('Inside hotel-form: ', event);

//         // Get form values
//         const hotel_id = document.getElementById('hotel_id'),
//             hotel_name = document.getElementById('hotel_name'),
//             hotel_location = document.getElementById('hotel_location'),
//             hotel_phone = document.getElementById('hotel_phone'),
//             hotel_email = document.getElementById('hotel_email'),
//             hotel_rating = document.getElementById('hotel_rating'),
//             pet_friendly = document.getElementById('pet_friendly');

//         let target = event.target;
//         console.log('Event target ', target);

//         if (target.matches('#back-btn') || target.matches('#cancel-btn')) {

//             ui.removeForm();
//             getHotelList();

//         } else if (target.matches('#add-btn') || target.matches('#update-btn')) {
//             console.log('Inside IF hotel id: ', hotel_id.value);

//             if (hotel_id.value === '') {

//                 if (hotel_name.value === '' || hotel_location.value === '' || hotel_phone.value === '' || hotel_email.value === '' || hotel_rating.value === '') {

//                     ui.showAlert('Please fill in all fields', 'alert error');
//                 } else {
//                     // call addHotel function
//                     console.log('Calling addHotel()');
//                     addHotel();
//                 }
//             } else {
//                 editHotel();
//             }
//         }
//         event.preventDefault();
//         // });
//     // }
// }

// addHotel function
function addHotel() {
    console.log('Pet Friendly: ', pet_friendly.checked);
    const hotelData = {
        hotel_name: hotel_name.value,
        hotel_location: hotel_location.value,
        hotel_phone: hotel_phone.value,
        hotel_email: hotel_email.value,
        hotel_rating: hotel_rating.value,
        pet_friendly: false
    };
    console.log('app.js hotelData', hotelData);
    hotel.addHotel(hotelData).then(response => {
        ui.showAlert('Hotel added', 'alert success');
        ui.clearFields();
        getHotelList();
        console.log(response);
    }).catch(err => console.log(err));
}

function editHotel() {
    const hotelData = {
        hotel_id: hotel_id.value,
        hotel_name: hotel_name.value,
        hotel_location: hotel_location.value,
        hotel_phone: hotel_phone.value,
        hotel_email: hotel_email.value,
        hotel_rating: hotel_rating.value,
        pet_friendly: pet_friendly.checked
    };
    hotel.editHotel(hotelData).then(results => {
        ui.showAlert('Hotel Updated', 'alert success');
        // ui.changeFormState('add');
        ui.clearFields();
        console.log(results);
    }).catch(err => console.log(err));
}

// listen for Edit state
document.querySelector('.hotel-div').addEventListener('click', enableEdit);

// Enable edit state
function enableEdit(event) {
    if (event.target.parentElement.classList.contains('edit')) {
        console.log(event.target.parentElement);

        const hotelId = event.target.parentElement.previousElementSibling.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

        const name = event.target.parentElement.previousElementSibling.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent,

            location = event.target.parentElement.previousElementSibling.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent,

            phone = event.target.parentElement.previousElementSibling.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent,

            email = event.target.parentElement.previousElementSibling.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent,

            rating = event.target.parentElement.previousElementSibling.parentElement.previousElementSibling.previousElementSibling.textContent,

            pet_friend = event.target.parentElement.previousElementSibling.parentElement.previousElementSibling.checked;

        const hotelData = {
            hotelId,
            name,
            location,
            phone,
            email,
            rating,
            pet_friend
        }
        console.log(hotelData);

        if (event.target.parentElement.classList.contains('edit')) {
            console.log('Inside enableEdit: ', event);
            ui.editHotelForm(event);
            ui.fillForm(hotelData);
            console.log('Inside IF of enableEdit func');
        }
    }
    event.preventDefault();
}