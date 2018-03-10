//First find out how many students there are.
    //The parent container is <ul class="student-list">, and each student is an <li> child
    //So count how many li tags there are within the ul

const $studentListUl = $('ul.student-list'); //grabs the ul element
const $students = $studentListUl.children();
const $studentsNum = $students.length; //counts how many students

const $pageDiv = $('div.page'); //<div class="page">

console.log(`There are ${$studentsNum} students.`);

//Based on the number of students, determine how many pagination links we need
    //Divide by 10, then use Math.ceiling to round up to next integer
function determineNumberOfPages(numberOfStudents){
    return Math.ceil(numberOfStudents/10);
}

//When the document content loads on start, then display first page of results to user
document.addEventListener('DOMContentLoaded', function(){
    displayFirstPage();
})

let paginationLinksNum = determineNumberOfPages($studentsNum);
    
function generatePaginationHTML(numOfPages, ulClassName){
    
    let paginationHTML = `<div class="pagination"><ul class="${ulClassName}">`;   

    for (let i = 1; i <= numOfPages; i++){
    //insert a class of active to the first pagination link
        if(i == 1){
            paginationHTML += `<li>
            <a class="active" href="#">${i}</a>
            </li>
            `;  
        }else{
            paginationHTML += `<li>
            <a href="#">${i}</a>
            </li>
            `;  
        }
    }

    paginationHTML += `</ul></div>`;

    return paginationHTML;
}

const $paginationElement = $(generatePaginationHTML(paginationLinksNum, "pagination-ul"));

$pageDiv.append($paginationElement);

//on load, need to show up to 10 students only
    //use slice()
function displayFirstPage(){
    $students.hide();
    $students.slice(0,10).show();
    //highlight first page - NEED TO BE ABLE TO HIGHLIGHT FIRST CHILD A TAG
    const $paginationFirstPageButton = $('ul.pagination-ul:first-child a')[0];
    $($paginationFirstPageButton).addClass('active');
    console.log($paginationFirstPageButton);
}
    
function displayCorrectPage(linkClickedString){
    console.log("displayRelevantFunction was called with number: " + linkClickedString);
    let linkClickedNum = Number(linkClickedString);
        //work out lower boundary and upper boundary
        let lowerBoundary = (linkClickedNum * 10) - 10;
        console.log(`Lower Boundary: ${lowerBoundary}`);
        let upperBoundary = (linkClickedNum * 10);
        console.log(`Upper Boundary: ${upperBoundary}`);

        //display based on lower/upper boundary
        $students.slice(lowerBoundary, upperBoundary).show();

}

let searchBarHTML = `
<div class="student-search">
    <div class="student-search">
        <input placeholder="Search for students...">
        <button>Search</button>
    </div>
</div>
`;

//grab the page header div
$pageHeaderDiv = $('div.page-header');
    //append the searchBar
$pageHeaderDiv.append(searchBarHTML);

//event handler to pageHeaderDiv listening for when the Search button is clicked
$pageHeaderDiv.on('click', 'button', function(){

    //grab the input
    const $input = $('div.student-search input');

    //get the .val from the input
    const $searchText = $input.val();

    console.log($searchText);

    if ($searchText === ""){
        $paginationElement.show();
        //hide the searchPaginationElement if exists
        if ($('div.pagination ul.search-pagination-ul')){
            console.log('need to get rid of redundant pagination element');
            $('div.pagination ul.search-pagination-ul').remove();
        }
        displayFirstPage();
    }else{
    //hide normal links i.e hide the normal pagination link buttons
    $paginationElement.hide();

    //call displayStudentsOnSearch function, with the inputted search text as the argument
    displayStudentsOnSearch($searchText);
    }
    
});

function displayStudentsOnSearch(searchText){
    //hide all students first
    $students.hide();

    searchText = searchText.toLowerCase();

    //remove 'active' class from all links
    removeActiveClassFromLinks();

    //search
    const $results = $('li.student-item:contains('+ searchText +')');
    $results.show(); 

    const resultsNum = $results.length;
    console.log(`There are ${resultsNum} result(s) based on the search criteria`);

    //insert only required number of pagination links based on search results
    let searchPaginationLinksNum =  determineNumberOfPages(resultsNum);

    console.log(`Based on search results, we require ${searchPaginationLinksNum} new link(s)`);

    //now we dynamically create new set of pagination link buttons
    const searchPaginationHTML = generatePaginationHTML(searchPaginationLinksNum, "search-pagination-ul");

    //if one already exists, remove it
    if ($('div ul.search-pagination-ul').length){
        console.log('search pagination links already exist, we need to remove it!');
        $('div ul.search-pagination-ul').parent().remove();
        //append to the DOM
        $pageDiv.append(searchPaginationHTML);
    }else{
        //append to the DOM
        $pageDiv.append(searchPaginationHTML);
    }
    console.log(searchPaginationHTML);

    //Now that we have the correct number of search-based pagination buttons displayed, we need to only show first 10
        //and only show correct pages based on click event

};

function removeActiveClassFromLinks(){
    $('div.page li').each(function(){
        //remove the class 'active' that may have it already
        $(this).children('a')
            .removeClass('active');
})
};


//listen for when user clicks on search pagination anchor tag
$pageDiv.on('click', 'a', function(event){
    let $target = $(event.target);

    if($target.parent().parent().hasClass('search-pagination-ul')){
        console.log('You clicked on non-default button');
    }

    if($target.parent().parent().hasClass('pagination-ul')){
        let linkClicked = "";

        removeActiveClassFromLinks();

        //now add class 'active' to the clicked link
        $(this).addClass('active');

        //grab the text of the link, to figure out what page to be displayed
        linkClicked = $(this).text();
            //Using this number
            //hide all the students
        $students.hide();

        //display only relevant students depending on which page link is clicked
        displayCorrectPage(linkClicked);
    }
})

