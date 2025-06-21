// Storing amount transcations in array

let transcations = [];
let nextId =1;

function addTransaction() {
    //Get values for our form 
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    //Validation checks

    if (!description) {
        alert("Please enter description");
        return;
    }
    
    if (!amount || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    //Transaction object
    const transaction = {
        id: nextId++,
        description: description,
        amount: amount,
        type: type
    };

    //Adding to list at top (transaction = [];)
    transcations.push(transaction);

    //Clear form

    document.getElementById("description").value = '';
    document.getElementById("amount").value = '';
  
    //Update display summary screen
    //Update the summary
    //Update transactions on recent traction list
    updateSummary();
    showTransaction();
}


function updateSummary() {
    let income = 0;
    let expense = 0; 

    //Loop through our list of transactions
    for (let i = 0; i < transcations.length; i++) {
        if (transcations[i].type === "income") {
            income += transcations[i].amount;
        } else {
            expense += transcations[i].amount;
        }
    }

    //Balance
    const balance = income - expense;

    //Update the display
    document.getElementById("totalIncome").textContent = "R" + income;
    document.getElementById("totalExpense").textContent = "R" + expense;

    const balanceElement = document.getElementById("balance");
    balanceElement.textContent = "R" + balance;

    if (balance < 0) {
        balanceElement.className = "amount balance negative";
    } else {
        balanceElement.className = "amount balance";
    }
}

function showTransaction() {
    const transactionList = document.getElementById("transactionList");
    transactionList.innerHTML = ""; // Clear previous transactions

    // If we have no transactions, show a message
    if (transcations.length === 0) {
        transactionList.innerHTML =
            '<div class="empty-message"> <p>No transactions available.</p></div>';          
        return;
    }
    
    //Build html for all transactions
    let html = "";
    for (let i = transcations.length - 1; i >= 0; i--) {
        const transaction = transcations[i];
        html += `<div class="transaction ${transaction.type}-item">
                    <div class="transaction-info">
                        <strong>${transaction.description}</strong>
                        <small>${transaction.type}</small>
                    </div>
                    <div class="transaction-amount ${transaction.type}">
                        ${(transaction.type === 'income' ? "+" : "-")}R${transaction.amount}
                    </div>
                    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>
                </div>`;
    }
    
    transactionList.innerHTML = html;
}

function deleteTransaction(id) {
    // Find the specific transaction using ID and remove it
    for (let i = 0; i < transcations.length; i++) {
        if (transcations[i].id === id) { // Fixed typo here
            transcations.splice(i, 1);
            break;
        }
    }

    // Update the display
    updateSummary();
    showTransaction();
}

// Initial display
updateSummary();
showTransaction();