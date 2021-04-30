var dataGet = () => {
    return new Promise(resolve => {
        url = 'https://api.covid19india.org/data.json'

        fetch(url)
        .then(res => resolve(res.json()))
    })

}

function generateList(stateName,deltaRecovered){

    const ul = document.querySelector(".list-group");

    if(deltaRecovered!=0){
        const li = document.createElement("li");
        const name = document.createTextNode(`${stateName} : ${deltaRecovered}`);
        li.classList.add("list-group-item");
        li.appendChild(name);
        ul.appendChild(li);
    }
}

var dynamicHead = (deltaRecovered) => {

    if(deltaRecovered==0){
        const head = document.querySelector(".dynamic-head");
        head.innerHTML = `Stats Unavailable for the moment, because the MoHFW haven't released them for today`;

        const visHead =  document.querySelector(".vis");
        visHead.innerHTML = "Please retry again in a few hours";
    }
    else{
        const head = document.querySelector(".dynamic-head");
        head.innerHTML = `${deltaRecovered} Indians beat Coronavirus !`;

        const visHead =  document.querySelector(".vis");
        visHead.innerHTML = "National Recovery Stats";
    }
}

var generateGraph = (timeSeries) => {
    const chart = document.getElementById("recovery-graph");

    labelsArray = [];
    dataVals = [];

    for(dayNum in timeSeries){
        var day = timeSeries[dayNum];

        labelsArray.push(day['date']);
        dataVals.push(parseInt(day['dailyrecovered'],10));
    }

    let lineChart = new Chart(chart, {
        type: 'line',
        data: {
            labels : labelsArray,
            datasets : [
                {
                    label:"Recovered",
                    data : dataVals,
                    fill: true,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }
            ]
        },
        options: {
            maintainAspectRatio: true,
            responsive:true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

var main = async () =>{
    var getRequest = await dataGet();

    generateGraph(getRequest['cases_time_series'])
    
    var allData = getRequest['statewise'];

    for(element in allData){

        var obj = allData[element];

        if( obj['state'] === 'Total'){
            dynamicHead(obj['deltarecovered']);
        } else if (obj['state'] !== "State Unassigned"){
            generateList(obj['state'],obj['deltarecovered']);
        }
    }
    
}

main();