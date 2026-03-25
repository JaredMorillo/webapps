let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let editIndex = null;

function save() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function render() {
  const list = document.getElementById('expenseList');
  const totalEl = document.getElementById('total');
  list.innerHTML = '';

  let total = 0;

  expenses.forEach((exp, index) => {
    total += Number(exp.amount);

    list.innerHTML += `
      <tr>
        <td>${exp.description}</td>
        <td>${exp.amount}</td>
        <td>${exp.date}</td>
        <td>${exp.category}</td>
        <td class="actions">
          <button onclick="editExpense(${index})">Edit</button>
          <button onclick="deleteExpense(${index})">Delete</button>
        </td>
      </tr>
    `;
  });

  totalEl.textContent = "Total: $" + total.toFixed(2);
}

function clearInputs() {
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('date').value = '';
  document.getElementById('category').selectedIndex = 0;
  document.getElementById('submitBtn').textContent = 'Add';
  editIndex = null;
}

function addOrUpdateExpense() {
  const description = document.getElementById('description').value.trim();
  const amount = document.getElementById('amount').value;
  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;

  if (!description || !amount || !date) {
    alert('Please fill all fields');
    return;
  }

  const expense = { description, amount, date, category };

  if (editIndex === null) {
    expenses.push(expense);
  } else {
    expenses[editIndex] = expense;
  }

  save();
  render();
  clearInputs();
}

function editExpense(index) {
  const exp = expenses[index];
  document.getElementById('description').value = exp.description;
  document.getElementById('amount').value = exp.amount;
  document.getElementById('date').value = exp.date;
  document.getElementById('category').value = exp.category;

  editIndex = index;
  document.getElementById('submitBtn').textContent = 'Update';
}

function deleteExpense(index) {
  if (confirm('Are you sure you want to delete this expense?')) {
    expenses.splice(index, 1);
    save();
    render();
  }
}

render();
