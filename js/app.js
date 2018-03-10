//First find out how many students there are.
    //The parent container is <ul class="student-list">, and each student is an <li> child
    //So count how many li tags there are within the ul

const $studentListUl = $('ul.student-list'); //grabs the ul element
const $students = $studentListUl.children();
const $studentsNum = $students.length; //counts how many students

console.log(`There are ${$studentsNum} students.`);

//Based on the number of students, determine how many pagination links we need
    //Divide by 10, then use Math.ceiling to round up to next integer
let paginationLinksNum = ($studentsNum/10);
paginationLinksNum = Math.ceil(paginationLinksNum);

console.log(paginationLinksNum);

//Insert the required number of pagination links
    //Grab the parent container where we want to append the pagination links
    //<div class="page">
const $pageDiv = $('div.page');
//const $linksDiv = $('div.pagination ul');
    //iterate through and add links dynamically
let paginationHTML = '<div class="pagination"><ul class="pagination-ul">';    
for (let i=1; i<=paginationLinksNum; i++){
    //insert a class of active to the first pagination link
    if(i==1){
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
paginationHTML += '</ul></div>';

const $paginationEl = $(paginationHTML);

$pageDiv.append($paginationEl);

//on load, need to show up to 10 students only
    //use slice()
$students.hide();
$students.slice(0,10).show();

let linkClicked = "";

    //event handler to insert class of "active" on pagination link when cliked
    //handler will be placed on parent, and event delegation (a.k.a event bubbling)
$pageDiv.on('click', 'a', function(){

    removeActiveClassFromLinks();

    //now add class 'active' to the clicked link
    $(this).addClass('active');

    //grab the text of the link, to figure out what page to be displayed
    linkClicked = $(this).text();
        //Using this number
        //hide all the students
    $students.hide();

    //display only relevant student range in another function
    displayRelevantStudents(linkClicked);

    
        
});

//slice(a,b) starts with a up until, but not including, b.
    //given the link clicked, work out the range of students that this applies to
    
function displayRelevantStudents(linkClickedString){
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

//event handler to pageHeaderDiv
$pageHeaderDiv.on('click', 'button', function(){
    //hide normal links
    $paginationEl.hide();

    //grab the input
    const $input = $(this).prev();
    console.log($(this).prev());

    //get the .val from the input
    const $searchText = $input.val();
    console.log($input.val());

    //call displayStudentsOnSearch function, with the inputted search text as the argument
    displayStudentsOnSearch($searchText);
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
    let paginationLinksNum = (resultsNum/10);
    paginationLinksNum = Math.ceil(paginationLinksNum);

    console.log(`Based on search results, we require ${paginationLinksNum} new link(s)`);

};

function removeActiveClassFromLinks(){
    $('div.page:last-child li').each(function(){
        //remove the class 'active' that may have it already
        $(this).children('a')
            .removeClass('active');
})
};


function sayHello(){
    console.log("Hey there!");
}

window.onload = sayHello;

