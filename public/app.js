// public/app.js

let mailbox = [];

// Fetch mailbox data from the server
const fetchMailbox = async () => {
  try {
    const response = await fetch('/api/mailbox');
    mailbox = await response.json();
    displayMailbox(mailbox);
  } catch (error) {
    console.error('Error fetching mailbox data:', error);
  }
};

// Function to display mailbox data in the table
const displayMailbox = (mailbox) => {
  const mailboxTable = document.querySelector('#mailboxTable tbody');
  mailboxTable.innerHTML = ''; // Clear any existing rows

  mailbox.forEach(email => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input type="checkbox" data-id="${email.id}"></td>
      <td>${email.sender}</td>
      <td>${email.subject}</td>
      <td>${email.date}</td>
    `;
    if (email.read) {
      row.classList.add('read');
    } else {
      row.classList.add('unread');
    }
    mailboxTable.appendChild(row);
  });
};

// Mark selected emails as read
const markAsRead = () => {
  const selectedEmails = getSelectedEmails();
  selectedEmails.forEach(email => {
    email.read = true;
  });
  displayMailbox(mailbox);
};

// Mark selected emails as unread
const markAsUnread = () => {
  const selectedEmails = getSelectedEmails();
  selectedEmails.forEach(email => {
    email.read = false;
  });
  displayMailbox(mailbox);
};

// Unarchive selected emails (if archived functionality exists)
const unarchive = () => {
  const selectedEmails = getSelectedEmails();
  selectedEmails.forEach(email => {
    email.archived = false;  // Assuming email has an archived property
  });
  displayMailbox(mailbox);
};

// Get selected emails from the table
const getSelectedEmails = () => {
  const checkboxes = document.querySelectorAll('#mailboxTable input[type="checkbox"]:checked');
  const selectedIds = Array.from(checkboxes).map(cb => Number(cb.getAttribute('data-id')));
  return mailbox.filter(email => selectedIds.includes(email.id));
};

// Event listeners for action buttons
document.getElementById('markAsReadBtn').addEventListener('click', markAsRead);
document.getElementById('markAsUnreadBtn').addEventListener('click', markAsUnread);
document.getElementById('unarchiveBtn').addEventListener('click', unarchive);

// Load mailbox data when the page loads
document.addEventListener('DOMContentLoaded', fetchMailbox);