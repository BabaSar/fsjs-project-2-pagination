alert('test');

//First find out how many students there are.
    //The parent container is <ul class="student-list">, and each student is an <li> child
    //So count how many li tags there are within the ul

const $studentListUl = $('ul.student-list');
const $studentsNum = $studentListUl.children().length;

console.log(`There are ${$studentsNum} students.`);