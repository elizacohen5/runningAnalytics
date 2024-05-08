
function createCell(column, content, str, element) {
    column.textContent = content + str;
    element.append(column);
    column.id = `column${Math.random()}`;
}

function generateRaceTimes(column, race, distance, roundedFunction, remainderFunction, athlete) {
    const col = document.getElementById(column.id);
    const time = roundedFunction(distance, athlete)
    const dist = remainderFunction(distance, athlete)
    col.textContent = `${race} Time: ${time} min / ${dist} sec`;
}

function roundedPace(miles, athlete) {
    return Math.floor((athlete.time / athlete.distance) * miles)
}
function remainderPace(miles, athlete) {
    return Math.floor((athlete.time * miles) % (athlete.distance * miles))
}

function createRunner(athlete, arr) {
    const tableRow = document.createElement("tr");
    tableRow.id = athlete.id;
    tableRow.className = "runner-data"
    document.querySelector("table").append(tableRow);
    paceMin = Math.floor((athlete.time / athlete.distance));
    paceSec = Math.floor(((athlete.time / athlete.distance) - Math.floor((athlete.time / athlete.distance))) * 60);

    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    createCell(col1, arr.indexOf(athlete) + 1, "", tableRow)
    createCell(col2, athlete.name, "", tableRow)
    createCell(col3, athlete.distance, " Miles", tableRow)
    createCell(col4, athlete.time, " Minutes", tableRow)
    createCell(col5, `${paceMin} min`, ` / ${paceSec} sec`, tableRow)

    const initialData = {
        col1: arr.indexOf(athlete) + 1,
        col2: athlete.name, 
        col3: athlete.distance,
        col4: athlete.time,
        col5: `${paceMin} min / ${paceSec} sec`
    }

    const checkCol = document.createElement("td");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "checkBox";
    checkBox.id = `checkbox${athlete.id}`;
    checkCol.appendChild(checkBox);
    tableRow.append(checkCol);

    const buttonCol = document.createElement("td");
    const button = document.createElement("button")
    button.className = "button"
    button.id = `button${athlete.id}`;
    button.textContent = "x"
    buttonCol.appendChild(button)
    tableRow.append(buttonCol);

    document.getElementById(`${tableRow.id}`).addEventListener("mouseenter", (event) => {
        const targetRow = event.target;
        targetRow.style["background-color"] = "rgb(250, 210, 77)"; 
    })

    document.getElementById(`${tableRow.id}`).addEventListener("mouseleave", (event) => {
        const targetRow = event.target;
        targetRow.style["background-color"] = "white"; 
    })

    document.getElementById(checkBox.id).addEventListener("click", () => {
        if (document.getElementById(checkBox.id).checked) {

            generateRaceTimes(col2, "5k", 3, roundedPace, remainderPace, athlete)
            generateRaceTimes(col3, "10k", 6, roundedPace, remainderPace, athlete)
            generateRaceTimes(col4, "Half Marathon", 13.1, roundedPace, remainderPace, athlete)
            generateRaceTimes(col5, "Marathon", 26.1, roundedPace, remainderPace, athlete)

        } else {

            col1.textContent = initialData.col1;
            col2.textContent = initialData.col2;
            col3.textContent = initialData.col3 + " Miles";
            col4.textContent = initialData.col4 + " Minutes";
            col5.textContent = initialData.col5;
        }
    })

    document.getElementById(button.id).addEventListener("click", () => {
        deleteRunner(athlete.id);
        document.getElementById(`${tableRow.id}`).remove();
        console.log(`The deleted table id is: ${tableRow.id}`);
    })
}

function displayRunners() {
    fetch("http://localhost:3000/runners")
        .then(response => response.json())
        .then(runners => { 
            runners.sort((a, b) => {
                return ((a.time / a.distance) * 10) / 10 - ((b.time / b.distance) * 10) / 10
        })
            runners.map((runner) => {
                createRunner(runner, runners);
        })
    })
}

function addSubmitListener() {
    document.getElementById("runner-info").addEventListener("submit", (event) => {
        event.preventDefault();

        fetch("http://localhost:3000/runners", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: event.target["name"].value,
                distance: event.target["distance"].value,
                time: event.target["time"].value
            })
        })
        .then(response => response.json())
        .then(() => {
            fetch("http://localhost:3000/runners")
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length - 1; i++) {
                    document.querySelector("table").deleteRow(1);
                }
                displayRunners();
            })
        })
        document.getElementById("runner-info").reset();
    })
}

function deleteRunner(id) {
    fetch(`http://localhost:3000/runners/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
}

function main() {
    displayRunners()
    addSubmitListener()
}

main()

