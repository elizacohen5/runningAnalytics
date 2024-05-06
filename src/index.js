// Fetch runner data from db.json. 

// 1. Fetch runner data from db.json and format into a table. 
// 2. Add in / calculate pace per mile functionality 
// 3. Add event listener on the "submit" button to create a POST request adding new 
// runners to database
// 4. Sort array of runners based on pace per mile 
// 5. Add in delete button column 
// 6. Add a "hover" event listener when hovering over a row
// 7. MAYBE: Add another row to the table and "checkbox" to see runners projected race data 

function createCell(column, content, str, element) {
    column.textContent = content + str;
    element.append(column);
}

function displayRunners() {
        fetch("http://localhost:3000/runners")
        .then(response => response.json())
        // Need to sort an array of objects based on one value in the array
        .then(runners => {
            const unSortedRunners = runners.map((runner, index) => {
                const tableRow = document.createElement("tr");
                tableRow.id = runner.id;
                console.log(tableRow.id)

                tableRow.className = "runner-data"
                document.querySelector("table").append(tableRow);
                const pace = Math.round((runner.time / runner.distance) * 10) / 10;

                const col1 = document.createElement("td");
                const col2 = document.createElement("td");
                const col3 = document.createElement("td");
                const col4 = document.createElement("td");
                
                createCell(col1, runner.name, "", tableRow)
                createCell(col2, runner.distance, " Miles", tableRow)
                createCell(col3, runner.time, " Minutes", tableRow)
                createCell(col4, pace, " min/mi", tableRow)

                const buttonCol = document.createElement("td");
                const button = document.createElement("button")
                button.className = "button"
                button.id = `button${index}`
                console.log(button.id)
                button.textContent = "x"
                buttonCol.appendChild(button)
                tableRow.append(buttonCol);

                document.getElementById(`${tableRow.id}`).addEventListener("mouseenter", (event) => {
                    const targetRow = event.target;
                    targetRow.style["background-color"] = "yellow"; 
                })

                document.getElementById(`${tableRow.id}`).addEventListener("mouseleave", (event) => {
                    const targetRow = event.target;
                    targetRow.style["background-color"] = "white"; 
                })

                document.getElementById(button.id).addEventListener("click", () => {
                    deleteRunner(runner.id);
                    document.getElementById(`${tableRow.id}`).remove();
                    console.log(`The deleted table id is: ${tableRow.id}`);
                })
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
        .then(runner => {
            const tableRow = document.createElement("tr");
            tableRow.id = runner.id;
            tableRow.className = "runner-data"
            document.querySelector("table").append(tableRow);
            const pace = Math.round((runner.time / runner.distance) * 10) / 10;

            const col1 = document.createElement("td");
            const col2 = document.createElement("td");
            const col3 = document.createElement("td");
            const col4 = document.createElement("td");

            createCell(col1, runner.name, "", tableRow)
            createCell(col2, runner.distance, " Miles", tableRow)
            createCell(col3, runner.time, " Minutes", tableRow)
            createCell(col4, pace, " min/mi", tableRow)

            const buttonCol = document.createElement("td");
            const button = document.createElement("button")
            button.className = "button"
            button.id = `button${runner.id}`;
            console.log(button.id);
            button.textContent = "x"
            buttonCol.appendChild(button)
            tableRow.append(buttonCol);

            document.getElementById(`${tableRow.id}`).addEventListener("mouseenter", (event) => {
                const targetRow = event.target;
                targetRow.style["background-color"] = "yellow"; 
            })

            document.getElementById(`${tableRow.id}`).addEventListener("mouseleave", (event) => {
                const targetRow = event.target;
                targetRow.style["background-color"] = "white"; 
            })

            document.getElementById(button.id).addEventListener("click", () => {
                deleteRunner(runner.id);
                document.getElementById(`${tableRow.id}`).remove();
                console.log(`The deleted table id is: ${tableRow.id}`);
            })
            document.getElementById("runner-info").reset();
        })
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

