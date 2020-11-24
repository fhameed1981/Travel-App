// This package calculates the time between now and another date/time
const countdown = require('countdown')

/**
 * Responds to user input form submit button click
 * Processes initial data, calls apiCalls function and updateUI function
 * @param {click event} event User presses submit button on form
 */
export async function submitted(event) {
    // Prevents page reloading when button is clicked
    event.preventDefault()
    console.log('Event listener connected')

    // Initialise error and result fields
    const errorMessage = document.getElementById('error-message')
    errorMessage.innerHTML = ""
    document.getElementById('forecast-card-container').innerHTML = ""
    document.getElementById('how-many-sleeps').innerHTML = ""
    document.getElementById('location-image-container').innerHTML = ""
    document.getElementById('forecast-title').innerHTML = ""

    // Destination city
    const destinationCity = document.getElementById('destination-city').value
    console.log(`City: ${destinationCity}`)
    if (destinationCity == "") {
        errorMessage.innerHTML = "Please enter a destination city"
        return
    }

    // Departure date
    const departureDate = document.getElementById('departure-date').value
    if (departureDate == "") {
        errorMessage.innerHTML = "Please enter a departure date"
        return
    }
    console.log(`Departure date: ${departureDate}`)

    // Return date
    // Not required, will just give full forecast results if left blank
    const returnDate = document.getElementById('return-date').value
    if (returnDate == "") {
        errorMessage.innerHTML = "Please enter a return date"
        return
    }
    console.log(`Return date: ${returnDate}`)

    const timeUntilTrip = getTimeUntilDate(departureDate)
    console.log(`Days until departure: ${timeUntilTrip}`)

    const timeUntilReturn = getTimeUntilDate(returnDate)
    console.log(`Days until return: ${timeUntilReturn}`)

    const tripDuration = timeUntilReturn - timeUntilTrip
    console.log(`Trip duration: ${tripDuration}`)
    if (tripDuration < 0) {
        errorMessage.innerHTML = "Return date can't be before departure date"
        return
    }


    // Initialise bigData object with user's input and calculations above
    let bigData = {}
    bigData["userData"] = { destinationCity, departureDate, returnDate, timeUntilTrip, timeUntilReturn, tripDuration }

    console.log(bigData)

    // Calls the API function, then updates the UI if all connections succeeded
    bigData = await Client.apiCalls(bigData)
    // If connections didn't succeed, null is returned, so checking for that
    if (bigData != null) {
        Client.updateUI(bigData)

        // Add all data to local storage
        localStorage.setItem('bigData', JSON.stringify(bigData))
    }
}


/**
 * Trip countdown. Checks that return is not before departure.
 * @param {string} date A date in the format yyyy-mm-dd
 */
function getTimeUntilDate(date) {
    const todayMilliseconds = (new Date()).setHours(1)

    const dateMilliseconds = (new Date(date)).setHours(1)
    const timeUntilDate = countdown(todayMilliseconds, dateMilliseconds, countdown.DAYS).days
    return timeUntilDate
}