document.addEventListener("DOMContentLoaded", async function () {
    const itemsPerPage = 10;
    let currentPage = 1;
    let jsonData = [];

    try {
        const response = await fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json');
        jsonData = await response.json();
        displayData(currentPage);
        setupPagination();
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    function displayData(page) {
        const dataContainer = document.getElementById('data-container');
        dataContainer.innerHTML = '';

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = jsonData.slice(startIndex, endIndex);

        pageData.forEach(item => {
            const listItem = document.createElement('div');
            listItem.textContent = `ID: ${item.id}, Name: ${item.name}, Email: ${item.email}`;
            dataContainer.appendChild(listItem);
        });
    }

    function setupPagination() {
        const totalPages = Math.ceil(jsonData.length / itemsPerPage);
        const paginationContainer = document.getElementById('pagination');

        for (let i = 1; i <= totalPages; i++) {
            const listItem = document.createElement('li');
            listItem.textContent = i;
            listItem.addEventListener('click', function () {
                currentPage = i;
                displayData(currentPage);
                updatePagination();
            });
            paginationContainer.appendChild(listItem);
        }

        updatePagination();
    }

    function updatePagination() {
        const paginationItems = document.querySelectorAll('#pagination li');
        paginationItems.forEach(item => {
            item.classList.remove('active');
            if (parseInt(item.textContent) === currentPage) {
                item.classList.add('active');
            }
        });
    }
});