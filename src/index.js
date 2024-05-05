// Fetch runner data from db.json. 

// 1. Fetch runnder data from db.json and format into a table. 
// 2. Add in / calculate pace per mile functionality 
// 3. Sort array of runners based on pace per mile 
// 4. Add event listener on the "submit" button to create a POST request adding new 
// runners to database
// 5. Add another column to the table and "checkbox" to see runners projected race data 
// 6. If button clicked, another row should appear underneath that runner displaying 
// their projected race times based on that run 

function displayRunners() {
    document.addEventListener("DOMContentLoaded", () => {
        fetch("http://localhost:3000/runners")
        .then(response => response.json())
        // Need to sort an array of objects based on one value in the array
        .then(runners => {
            const unSortedRunners = runners.map(runner => {
                const tableRow = document.createElement("tr");
                tableRow.className = "runner-data"
                document.querySelector("table").append(tableRow);

                const firstTableHeader = document.createElement("td");
                firstTableHeader.textContent = runner.name;
                tableRow.append(firstTableHeader);

                const secondTableHeader = document.createElement("td");
                secondTableHeader.textContent = `${runner.distance} Miles`;
                tableRow.append(secondTableHeader);

                const thirdTableHeader = document.createElement("td");
                thirdTableHeader.textContent = `${runner.time} Minutes`;
                tableRow.append(thirdTableHeader);
            })
        })
    })
}

displayRunners()


