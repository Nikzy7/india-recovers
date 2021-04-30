const chart = document.getElementById("recovery-graph");
console.log(chart);

let lineChart = new Chart(chart, {
    type: 'line',
    data: {
        labels : ['jan','feb','march'],
        datasets : [
            {
                labels:"2015",
                data : [10,5,30]
            }
        ]
    }
});