const form = document.getElementById('entryForm');
const tableBody = document.querySelector('#entriesTable tbody');
const STORAGE_KEY = 'medicine_entries';

function loadEntries() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function renderTable() {
  const entries = loadEntries();
  tableBody.innerHTML = '';

  entries.forEach((entry) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${entry.purchased_from || ''}</td>
      <td>${entry.med_received_date || ''}</td>
      <td>${entry.item_name || ''}</td>
      <td>${entry.brand_name || ''}</td>
      <td>${entry.batch_number || ''}</td>
      <td>${entry.expiry_date || ''}</td>
    `;
    tableBody.appendChild(tr);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const entry = {};
  formData.forEach((value, key) => {
    entry[key] = value;
  });

  const entries = loadEntries();
  entries.push(entry);
  saveEntries(entries);
  renderTable();
  form.reset();
});

document.addEventListener('DOMContentLoaded', renderTable);
