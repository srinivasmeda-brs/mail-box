// src/app.js

const mailbox = require('./mailboxData');

// Function to generate HTML for the mailbox
function generateMailboxHTML(mailbox) {
    let html = '';
    mailbox.forEach(mail => {
        const mailClass = mail.read ? 'read' : 'unread';
        html += `
            <tr class="${mailClass}">
                <td><input type="checkbox" /></td>
                <td>${mail.sender}</td>
                <td>${mail.subject}</td>
                <td>${mail.date}</td>
            </tr>
        `;
    });
    return html;
}

// Inject the generated HTML into the mailbox table in the DOM
document.addEventListener('DOMContentLoaded', () => {
    const mailboxTable = document.querySelector('#mailboxTable tbody');
    mailboxTable.innerHTML = generateMailboxHTML(mailbox);
});
