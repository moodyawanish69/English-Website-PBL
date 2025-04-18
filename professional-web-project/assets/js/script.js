/*
 * Display the modal with dynamic team details and three tabs:
 * PDF, PPT, and YouTube.
 * @param {string} teamName - The name of the team.
 * @param {Array<string>} studentNames - An array of student names.
 * @param {string} logoImage - The URL of the team's logo image.
 * @param {string} fileLink1 - The URL for the PDF file.
 * @param {string} fileLink2 - The URL for the PPT file.
 * @param {string} fileLink3 - The URL for the YouTube video.
*/
function showContent(teamName, studentNames, logoImage = "", fileLink1 = "", fileLink2 = "", fileLink3 = "") {
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("overlay");
    const modalTitle = document.getElementById("modal-title");
    const modalText = document.getElementById("modal-text");

    // Set the team name as the modal title
    modalTitle.innerText = teamName;

    // Build the list of student names dynamically
    const studentList = studentNames.map(name => `<li>${name}</li>`).join('');

    // Update modal content with logo and group details
    modalText.innerHTML = `
        ${logoImage ? `<img src="${logoImage}" alt="${teamName} Logo" style="max-width: 100px; margin-bottom: 20px;">` : ''}
        <p>Members of ${teamName}:</p>
        <ul>
          ${studentList}
        </ul>
    `;

    // Set up the tab content containers
    const pdfTab = document.getElementById("pdfTab");
    const pptTab = document.getElementById("pptTab");
    const youtubeTab = document.getElementById("youtubeTab");

    // For PDF tab: use Google Docs viewer to embed the PDF
    if (fileLink1) {
        pdfTab.innerHTML = `<iframe src="https://docs.google.com/gview?url=${encodeURIComponent(fileLink1)}&embedded=true" frameborder="0" style="width:100%; height:400px;"></iframe>`;
    } else {
        pdfTab.innerHTML = "<p>No PDF available.</p>";
    }

    // For PPT tab: use Google Docs viewer to embed the PPT
    if (fileLink2) {
        pptTab.innerHTML = `<iframe src="https://docs.google.com/gview?url=${encodeURIComponent(fileLink2)}&embedded=true" frameborder="0" style="width:100%; height:400px;"></iframe>`;
    } else {
        pptTab.innerHTML = "<p>No PPT available.</p>";
    }

    // For YouTube tab: extract video ID and embed video
    if (fileLink3) {
        let videoId = "";
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
        const match = fileLink3.match(regExp);
        if (match && match[2].length === 11) {
            videoId = match[2];
        }
        if (videoId) {
            youtubeTab.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" style="width:100%; height:400px;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        } else {
            youtubeTab.innerHTML = `<p>Invalid YouTube URL.</p>`;
        }
    } else {
        youtubeTab.innerHTML = "<p>No YouTube video available.</p>";
    }

    // Show the default tab (PDF)
    openTab('pdfTab');

    // Show overlay and modal with fade-in effect
    overlay.style.display = "block";
    overlay.classList.add("active");

    modal.style.display = "flex"; // using flex for centering
    modal.classList.add("fade-in");
}

// Function to switch between tabs
function openTab(tabName) {
    const tabs = document.getElementsByClassName("tab-content");
    for (let tab of tabs) {
        tab.style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}

// Function to close the modal
function closeContent() {
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("overlay");

    modal.style.display = "none";
    overlay.style.display = "none";
    overlay.classList.remove("active");
}

// Close the modal when clicking outside of it
document.getElementById("overlay").addEventListener("click", closeContent);  
// Function to open the modal
function openModal(groupName, pdfLink, pptLink, youtubeLink) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const groupMembers = document.getElementById('group-members');
    const pdfIframe = document.getElementById('pdf-iframe');
    const pptIframe = document.getElementById('ppt-iframe');
    const youtubePreview = document.getElementById('youtube-preview');
  
    // Set modal title
    modalTitle.textContent = groupName;
  
    // Set group members (example members, replace with dynamic data if needed)
    const members = [
      'Member 1', 'Member 2', 'Member 3',
      'Member 4', 'Member 5', 'Member 6',
      'Member 7', 'Member 8', 'Member 9'
    ];
    groupMembers.innerHTML = members.map(member => `<li>${member}</li>`).join('');
  
    // Embed PDF in the iframe (use relative path)
    pdfIframe.src = pdfLink;
  
    // Embed PPT in the iframe using Google Docs Viewer
    pptIframe.src = `https://docs.google.com/gview?url=${encodeURIComponent(pptLink)}&embedded=true`;
  
    // Set YouTube preview
    youtubePreview.src = youtubeLink;
  
    // Show modal
    modal.style.display = 'flex';
}
  
  // Function to close the modal
  function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  
    // Reset YouTube preview to stop video playback
    const youtubePreview = document.getElementById('youtube-preview');
    youtubePreview.src = '';
  }

// Close modal when clicking outside the modal content
window.onclick = function (event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
};
