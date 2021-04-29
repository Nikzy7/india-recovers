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
    const head = document.querySelector(".dynamic-head");
    head.innerHTML = `${deltaRecovered} Indians beat Coronavirus !`

    const visHead =  document.querySelector(".vis");
    visHead.innerHTML = "National Recovery Stats";
}

var main = async () =>{
    var getRequest = await dataGet();
    
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