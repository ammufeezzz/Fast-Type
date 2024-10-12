document.addEventListener('DOMContentLoaded', () => {
    // Make sure wpmData is available
    if (typeof wpmData === 'undefined') {
        console.error('WPM data not found');
        return;
    }

    const ctx = document.getElementById('wpmChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: wpmData.length }, (_, i) => `Test ${i + 1}`),
            datasets: [{
                label: 'WPM over time',
                data: wpmData,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Words Per Minute Progress'
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Words Per Minute'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Test Number'
                    }
                }
            }
        }
    });
});
