export function postRequest(url, data, success) {
    // 'data' is the string you want to send
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain', // Indicating you're sending plain text
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: data  // Sending the string directly
    })
        .then(response => {
            if (response.ok) {
                return response.text(); // Handling the response
            }
            throw new Error('Network response was not ok.');
        })
        .then(success)
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to send results. Please try again later.');
        });
}
