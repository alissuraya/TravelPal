const mealButton = document.querySelector('#meal-button');
const mealInput = document.querySelector('#meal-input');
const mealList = document.querySelector('#meal-list');

mealButton.addEventListener('click', () => {
  const searchQuery = mealInput.value.trim();
  if (searchQuery) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        mealList.innerHTML = ''; // clear previous search results
        if (data.meals) {
          data.meals.forEach(meal => {
            // Create a new list item with the meal name, recipe, image, and YouTube video
            const newMeal = document.createElement('li');
            newMeal.innerHTML = `
              <div class="meal">
                <h2>${meal.strMeal}</h2><br>
                <h3>Catagory - ${meal.strCategory} dish</h3>
                <div class="recipe">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="30%"><br>
                  <div class="video-container">
                    <iframe src="${meal.strYoutube.replace('watch?v=', 'embed/')}" frameborder="0" allowfullscreen></iframe>
                  </div>
                </div>

                <h3>Ingredients:</h3>
                <p>
                  ${Object.entries(meal).filter(([key, value]) => key.startsWith('strIngredient') && value).map(([key, value]) => `
                  <li>${value} - ${meal[`strMeasure${key.slice(-1)}`]}</li>
                  `).join('')}
                </p>
                
                <br>
                <h3>How to cook?</h3>
                <p class="instructions">
                  ${meal.strInstructions.split('.').map(instruction => `<li>${instruction}</li>`).join('')}
                </p>
              </div>
            `;
            // Add some styles to the new meal item
            newMeal.style.marginBottom = '20px';
            newMeal.style.padding = '20px';
            newMeal.style.borderRadius = '5px';
            newMeal.style.fontSize = '15px';
            newMeal.style.lineHeight = '1.5';
            newMeal.style.fontFamily = 'sans-serif';
            newMeal.style.color = '#333';
            newMeal.style.listStyle = 'none';

            mealList.appendChild(newMeal);
          });
        } else {
          const noResults = document.createElement('li');
          noResults.textContent = 'No results found.';
          mealList.appendChild(noResults);
        }
      })
      .catch(error => console.error(error));
  }
});

let slideIndex = 1;
      showSlides(slideIndex);
    
      function plusSlides(n) {
      showSlides(slideIndex += n);
      }
    
      function currentSlide(n) {
      showSlides(slideIndex = n);
      }
    
      function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");
      if (n > slides.length) {slideIndex = 1}    
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex-1].style.display = "block";  
      dots[slideIndex-1].className += " active";
      }