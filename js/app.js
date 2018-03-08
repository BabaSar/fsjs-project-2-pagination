alert('test');

//First find out how many students there are.
    //The parent container is <ul class="student-list">, and each student is an <li> child
    //So count how many li tags there are within the ul

const $studentListUl = $('ul.student-list'); //grabs the ul element
const $studentsNum = $studentListUl.children().length; //counts how many children

console.log(`There are ${$studentsNum} students.`);

//Based on the number of students, determine how many pagination links we need
    //Divide by 10, then use Math.ceiling
let paginationLinksNum = $studentsNum/10;
paginationLinksNum = Math.ceil(paginationLinksNum);

console.log(paginationLinksNum);

//Insert the required number of pagination links