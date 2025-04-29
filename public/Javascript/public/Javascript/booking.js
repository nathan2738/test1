document.addEventListener('DOMContentLoaded', () => {
    const serviceRadios = document.querySelectorAll('input[name="serviceType"]');
    const installationForm = document.getElementById('installationForm');
    const maintenanceForm = document.getElementById('maintenanceForm');
    const consultationForm = document.getElementById('consultationForm');
    const installForm = document.getElementById('installForm');
    const maintForm = document.getElementById('maintForm');
    const consultForm = document.getElementById('consultForm');
    const responseMessage = document.getElementById('responseMessage');
  
    // Function to hide all forms
    function hideAllForms() {
      installationForm.style.display = 'none';
      maintenanceForm.style.display = 'none';
      consultationForm.style.display = 'none';
    }
  
    // Function to show the chosen form
    function showForm(formId) {
      hideAllForms();
      document.getElementById(formId).style.display = 'block';
    }
  

    function setMessage(message, color = 'black') {
      responseMessage.textContent = message;
      responseMessage.style.color = color;
    }
  

    serviceRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        // Removes the response message when the user changes changes option with radio
        setMessage('');
        
        switch (radio.value) {
          case 'installation':
            showForm('installationForm');
            break;
          case 'maintenance':
            showForm('maintenanceForm');
            break;
          case 'consultation':
            showForm('consultationForm');
            break;
        }
      });
    });
  
    // Handle installation form submission
    installForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(installForm);
      const data = Object.fromEntries(formData.entries());
      try {
        const response = await fetch('/book-installation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        setMessage(result.message, 'white'); 
      } catch (error) {
        setMessage('An error occurred while booking the installation.', 'red'); 
      }
    });
  
    // Handle maintenance form submission
    maintForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(maintForm);
      const data = Object.fromEntries(formData.entries());
      try {
        const response = await fetch('/book-maintenance', {  
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        setMessage(result.message, 'white'); // 
      } catch (error) {
        setMessage('An error occurred while requesting maintenance.', 'red'); 
      }
    });
  
    // Handle consultation form submission
    consultForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(consultForm);
      const data = Object.fromEntries(formData.entries());
      try {
        const response = await fetch('/book-consultation', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        setMessage(result.message, 'white'); 
      } catch (error) {
        setMessage('An error occurred while booking the consultation.', 'red'); 
      }
    });
  
  });
  