async function fetchData() {
    try {
      // Fetch the data from the API at the URL "http://localhost:5678/api/works"
      const response = await fetch('http://localhost:5678/api/works');
      // Convert the response to JSON format
      const data = await response.json();
  
      // Process the JSON data and display the gallery dynamically
      data.forEach(work => {
        // Create a new <figure> element
        const figure = document.createElement('figure');
        // Create a new <img> element
        const img = document.createElement('img');
        // Create a new <figcaption> element
        const figcaption = document.createElement('figcaption');
  
        // Set the source of the <img> element to the image URL of the work
        img.src = work.imageUrl;
        // Set the alt attribute of the <img> element to the title of the work
        img.alt = work.title;
        // Set the text content of the <figcaption> element to the title of the work
        figcaption.textContent = work.title;
  
        // Append the <img> element to the <figure> element
        figure.appendChild(img);
        // Append the <figcaption> element to the <figure> element
        figure.appendChild(figcaption);
        // Append the <figure> element to the <div> with the class "gallery"
        document.querySelector('.gallery').appendChild(figure);
      });
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error('Error:', error);
    }
  }
  
  // Call the fetchData function to fetch and display the data
  fetchData();
  