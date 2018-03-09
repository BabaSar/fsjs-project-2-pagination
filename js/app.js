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
const $linksDiv = $('div.pagination ul');
    //iterate through and add links dynamically
let paginationHTML = "";    
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

$linksDiv.append(paginationHTML);
let linkClicked = "";

    //event handler to insert class of "active" on pagination link when cliked
    //handler will be placed on parent, and event delegation (bubbling)
$linksDiv.on('click', 'a', function(){
    $linksDiv.children().each(function(){
        //remove the class 'active' that may have it already
        $(this).children('a')
            .removeClass('active');

        console.log($(this).children('a'));
    })

    //now add class 'active' to the clicked link
    $(this).addClass('active');

    //grab the text of the link, to figure out what page to be displayed
    linkClicked = $(this).text();
        //Using this number

    //hide all the students
    $students.hide();
        
});

//slice(a,b) starts with a up until but not including b

