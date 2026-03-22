let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
function saveData() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}
document.getElementById("addBtn").addEventListener("click", addExpense);
document.getElementById("addBtninc").addEventListener("click", addIncome);

document.getElementById("clearBtn").addEventListener("click", () => {
  transactions = transactions.filter(t => t.type !== "expense");
  saveData();
  showData();
});

document.getElementById("clearBtninc").addEventListener("click", () => {
  transactions = transactions.filter(t => t.type !== "income");
  saveData();
  showData();
});

// let transations = [];
function addExpense() {
    const name = document.getElementById("expName").value;
    const amount = Number(document.getElementById("expAmount").value);

    if (name === "" || amount === "") {
        alert("Fill all fields correctly");
        return;
    }

    document.getElementById("expName").value = "";
    document.getElementById("expAmount").value = "";

    const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
        type: "expense"
    }
    transactions.push(newExpense);

    console.log(transactions);
    saveData();
    showData();

}

function showData() {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    transactions.forEach((item) => {
        const row = `
        <tr>
        <td>${item.name}</td>
        <td>${item.amount}</td>
        <td>${item.type}</td>
        <td><button onclick="deleteData(${item.id})">Delete</button></td>
        </tr>
        `;
        tbody.innerHTML += row;
    });
    updateTotals();
    updateIncome();
}

function deleteData(id) {
    transactions = transactions.filter(item => item.id !== id);
    saveData();
    showData();

}

function updateTotals() {
    let totalExpense = 0;

    transactions.forEach(item => {
        if (item.type === "expense") {
            totalExpense += item.amount;
        }
    });

    document.getElementById("totalexpense").innerText =
        "Expenses Total: R " + totalExpense;
}

function addIncome() {
    const name = document.getElementById("incName").value;
    const amount = Number(document.getElementById("incAmount").value);

    if (name === "" || amount === "") {
        alert("Fill all fields");
        return;
    }

    const newIncome = {
        id: Date.now(),
        name: name,
        amount: amount,
        type: "income"
    };

    transactions.push(newIncome);

    saveData();
    showData();

    document.getElementById("incName").value = "";
    document.getElementById("incAmount").value = "";
}

function updateIncome() {
    let totalIncome = 0;

    transactions.forEach(item => {
        if (item.type === "income") {
            totalIncome += item.amount;
        }
    });
    document.getElementById("totalincome").innerText =
        "Income Total: R " + totalIncome;

}


showData();