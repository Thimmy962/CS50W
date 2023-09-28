document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('#send').onclick = send_mail;


  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#email-detail').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#email-detail').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
    // Print emails
    console.log(emails)
    emails.forEach(email => {
      const newMail = document.createElement('div')
      const button = document.createElement('button')
      let archived = null;
      const innerDiv = document.createElement('div')
      if(email.archived === true){
        archived = 'Unarchive'
      }
      else{
        archived = 'Archive';
      } 
      innerDiv.innerHTML = `
        <h3>${email.sender}</h3>
        <p>${email.subject}</p>
        <p>${email.timestamp}</p>
        
      `

      newMail.className = email.read ? 'read newMail' : 'unread newMail'

      innerDiv.onclick = ()=>{
        if(email.read == false)
        {
          fetch(`/emails/${email.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                read: true
            })
          })
          get_mail(email.id)
        }
        get_mail(email.id)
      }

      button.className = email.archived ? 'btn archive-btn btn-success' : 'btn archive-btn btn-danger' 
      button.innerHTML = `${archived}` 
      newMail.append(innerDiv, button)
      document.querySelector('#emails-view').append(newMail)
      document.querySelector('.archive-btn').onclick = ()=>{archived_mail(email.id)}
    });
});
}


function send_mail(e)
{
  e.preventDefault()
  const recipients = document.querySelector('#compose-recipients').value;
  const body = document.querySelector('#compose-body').value;
  const subject = document.querySelector('#compose-subject').value;

  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body
    })
  })
  .then(response => response.json())
  .then(result => {
      // Print result
    //alert(result.message);
    load_mailbox('sent');
  });
}


function archived_mail(id)
{
  fetch(`/emails/${id}`)
  .then(response => response.json())
  .then(email => {

    if(email.archived === true)
    {
      fetch(`/emails/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            archived: false
        })
      })
      .then(()=>{
        console.log(email)
        load_mailbox('inbox');
      }
      )

    }
    else
    {
      fetch(`/emails/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            archived: true
        })
      })
      .then(()=>{
        console.log(email)
        load_mailbox('archive');
      }
      )
    }
});
}


function get_mail(id)
{
    // Show the detail and hide other views
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#email-detail').style.display = 'block';
    document.querySelector('#compose-view').style.display = 'none';
  fetch(`/emails/${id}`)
  .then(response => response.json())
  .then(email => {

    document.querySelector('#email-detail').innerHTML = `
    <ui>
      <li className="list-group-item"><strong>From:</strong> ${email.sender}</li>
      <li className="list-group-item"><strong>To:</strong> ${email.recipients}</li>
      <li className="list-group-item"><strong>Subject:</strong> ${email.subject}</li>
      <li className="list-group-item"><strong>Timestamp:</strong> ${email.timestamp}</li>
      <li className="list-group-item">${email.body}</li>
    </ui>
    `
    //if(email.recipients == )

});
}

