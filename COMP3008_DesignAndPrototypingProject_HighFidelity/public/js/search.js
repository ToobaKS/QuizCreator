let previousSearch = null;

function runSearch() {
  let searchContent = document.getElementById('input--search_quiz').value;
  
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      document.getElementById('div--categories').hidden = true;
      document.getElementById('div--search_results').hidden = false;
      document.getElementById('h2--page_title').innerHTML = "Search Results";

      let table = document.getElementById('table--search_results');
      let data = JSON.parse(this.responseText);

      table.innerHTML = `
        <tr>
          <th id="th--quiz"> Quiz: </th>
          <th id="th--category"> Category: </th>
          <th id="th--creator"> Creator: </th>
        </tr>
      `;

      Object.keys(data).forEach(key => {
        let newRow = document.createElement('tr');
        
        let newQuizTitle = document.createElement('td');
        newQuizTitle.classList.add('td--quiz_title');
        newQuizTitle.innerHTML = `<a href="/quiz/${key}">${data[key].title}</a>`;
        newRow.appendChild(newQuizTitle);
        
        let newQuizCategory = document.createElement('td');
        newQuizCategory.classList.add('td--quiz_category');
        newQuizCategory.innerHTML = data[key].category;
        newRow.appendChild(newQuizCategory);

        let newQuizCreator = document.createElement('td');
        newQuizCreator.classList.add('td--quiz_creator');
        newQuizCreator.innerHTML = data[key].creator;
        newRow.appendChild(newQuizCreator);

        table.appendChild(newRow);
      });
    }
  }
  xhttp.open('GET', `/quiz?search=${searchContent}`, true);
  xhttp.send();
}