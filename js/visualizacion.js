function mostrarGrafico(maxFitnessValues) {
    var ctx = document.getElementById('grafico').getContext('2d');
    if (chart) {
        chart.data.labels = Array.from(maxFitnessValues.keys());
        chart.data.datasets[0].data = maxFitnessValues;
        chart.update();
    } else {
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from(maxFitnessValues.keys()),
                datasets: [{
                    label: 'Máximo fitness',
                    data: maxFitnessValues,
                    fill: false,
                    borderColor: 'rgb(157, 178, 191)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Max Aptitud',
                            color: 'white'
                        },
                        ticks: {
                            beginAtZero: true,
                            color: 'white'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Generación',
                            color: 'white'
                        },
                        ticks: {
                            beginAtZero: true,
                            color: 'white'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'white'
                        }
                    }
                }
            }
        });
    }
}