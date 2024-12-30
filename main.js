const name = document.querySelector("#courseName");
const category = document.querySelector("#courseCategory");
const price = document.querySelector("#coursePrice");
const description = document.querySelector("#courseDescription");
const capacity = document.querySelector("#courseCapacity");
const addBtn = document.querySelector("#click");
const invalidName = document.querySelector(".invalid-name")
const invalidcategry = document.querySelector(".invalid-categoty");
const invalidDescription = document.querySelector(".invalid-description");
const invalidPrice = document.querySelector(".invalid-price");
const deleteBtn = document.querySelector("#deleteBtn");
const search = document.querySelector("#search");
let courses = [];
if ( localStorage.getItem("courses") != null ){
    courses=JSON.parse(localStorage.getItem("courses"));
    displayCourses();
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let isvalid = true;
   const namePattern = /^[A-Z][a-z]{3,10}$/;
 
   if(!namePattern.test(name.value)){
    invalidName.innerHTML="this name is invalid, must be start with a capital letter and contain 3-10 small letter";
    name.classList.add("is-invalid");
    isvalid = false;
   }
   else{
    invalidName.innerHTML="";
    name.classList.remove("is-invalid");
    name.classList.add("is-valid");
   }

   const categoryPattern = /^[A-Z][a-z]{3,10}$/;
   
   if(!categoryPattern.test(category.value)){
    invalidcategry.innerHTML ="this category is invalid, must be start with a capital letter and contain 3-10 small letter";
    category.classList.add("is-invalid");
    isvalid = false;
   }
   else{
    invalidcategry.innerHTML="";
    category.classList.remove("is-invalid");
    category.classList.add("is-valid");
   }

   const pricePattern = /^[0-9]{1,3}$/;
 
   if(!pricePattern.test(price.value)){
    invalidPrice.innerHTML="this price is invalid, must be contain at least one number between[0-9]";
    price.classList.add("is-invalid");
    isvalid = false;
   }
   else{
    invalidPrice.innerHTML="";
    price.classList.remove("is-invalid");
    price.classList.add("is-valid");
   }



   const descriptionPattern = /^[A-Z][a-z]{3,10}$/;
 
   if(!descriptionPattern.test(description.value)){
    invalidDescription.innerHTML="this descriptin is invalid, must be start with a capital letter and contain 3-10 small letter";
    description.classList.add("is-invalid");
    isvalid = false;
   }
   else{
    invalidDescription.innerHTML="";
    description.classList.remove("is-invalid");
    description.classList.add("is-valid");
   }


   




   if (isvalid){
    
  const course = {
    name: name.value,
    category: category.value,
    price: price.value,
    description: description.value,
    capacity: capacity.value,
  };
  courses.push(course);
  localStorage.setItem("courses", JSON.stringify(courses));
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "success",
    title: "added course is in successfully"
  });
  displayCourses();
  
   }







});



function displayCourses () {
  const result = courses.map((course,index) => {
      return `
        <tr>
        <td>${index}</td>
        <td>${course.name}</td>
        <td>${course.category}</td>
        <td>${course.price}</td>
        <td>${course.description}</td>
        <td>${course.capacity}</td>
        <td>
        <button class='btn btn-danger' onclick='deleteCourse(${index})'>delete </button>
        </td>

        </tr>
         
        `;
    }).join('');
    document.querySelector("#data").innerHTML= result;
};
function deleteCourse(index){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index,1); 
            localStorage.setItem("courses", JSON.stringify(courses));
           displayCourses();
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });
 
}
search.addEventListener("input",(e)=>{
    const keyword = search.value;
   const coursesresult= courses.filter((course)=>{
    return course.name.toLowerCase().includes(keyword.toLowerCase());
   });
   const result = coursesresult.map((course,index) => {
    return `
      <tr>
      <td>${index}</td>
      <td>${course.name}</td>
      <td>${course.category}</td>
      <td>${course.price}</td>
      <td>${course.description}</td>
      <td>${course.capacity}</td>
      <td>
      <button class='btn btn-danger' onclick='deleteCourse(${index})'>delete </button>
      </td>

      </tr>
       
      `;
  }).join('');
  document.querySelector("#data").innerHTML= result;

})
deleteBtn.addEventListener("click", ()=>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed)
           { courses = [];
            localStorage.setItem("courses", JSON.stringify(courses));
           displayCourses();
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });
})