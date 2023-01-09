export function enablePagination(usersArray) {
    const paginationNumbers = document.getElementById("pagination-numbers");
    const paginatedList = document.getElementById("paginated-list");
    const listItems = paginatedList.querySelectorAll("li");
    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");

    const paginationLimit = 12;
    const pageCount = Math.ceil(listItems.length / paginationLimit);
    let currentPage;

    function appendPageNumber(index) {
        const pageNumber = document.createElement("button");
        pageNumber.className = "pagination-number";
        pageNumber.innerHTML = index;
        pageNumber.setAttribute("page-index", index);
        pageNumber.setAttribute("aria-label", "Page " + index);
        paginationNumbers.appendChild(pageNumber);
    }

    function getPaginationNumbers() {
        for (let i = 1; i <= pageCount; i++) {
            appendPageNumber(i);
        }
    }

    function generateBtns() {
        getPaginationNumbers();
        setCurrentPage(1);

        prevButton.addEventListener("click", () => {
            setCurrentPage(currentPage - 1);
        });
        nextButton.addEventListener("click", () => {
            setCurrentPage(currentPage + 1);
        });

        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));
            if (pageIndex) {
                button.addEventListener("click", () => {
                    setCurrentPage(pageIndex);
                });
            }
        });
    }

    generateBtns();

    function disableButton(button) {
        button.classList.add("disabled");
        button.setAttribute("disabled", true);
    }

    function enableButton(button) {
        button.classList.remove("disabled");
        button.removeAttribute("disabled");
    }

    function handlePageButtonsStatus() {
        currentPage === 1
            ? disableButton(prevButton)
            : enableButton(prevButton);
        pageCount === currentPage
            ? disableButton(nextButton)
            : enableButton(nextButton);
    }

    function setCurrentPage(pageNum) {
        currentPage = pageNum;

        handleActivePageNumber();
        handlePageButtonsStatus();

        const prevRange = (pageNum - 1) * paginationLimit;
        const currRange = pageNum * paginationLimit;

        listItems.forEach((item, index) => {
            item.classList.add("hidden");
            //item.removeAttribute('id');
            if (index >= prevRange && index < currRange) {
                item.classList.remove("hidden");
                //item.setAttribute('id', 'to-filter');
                
            }
        });
        usersArray.forEach((item, index) => {
            item.isShownOnPage = false;
            if(index >= prevRange && index < currRange){
                item.isShownOnPage = true;
            }
        })
    }

    function handleActivePageNumber() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            button.classList.remove("active");

            const pageIndex = Number(button.getAttribute("page-index"));
            if (pageIndex == currentPage) {
                button.classList.add("active");
            }
        });
    }
}
