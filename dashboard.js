let fullName = document.getElementById("fullName");
let github = document.getElementById("github");
let email = document.getElementById("email");
let address = document.getElementById("address");
let phone = document.getElementById("phone");
let linkedin = document.getElementById("linkedin");
let addUserBtn = document.getElementById("add-user");
let userTableBody = document.getElementById("user_table_body");
let logoutbtn = document.getElementById("logout-btn");

async function addUser() {
  try {
    const { error } = await supabase
      .from("info") // table name
      .insert({
        name: fullName.value,
        github: github.value,
        linkedin: linkedin.value,
        address: address.value,
        email: email.value,
        phone:phone.value
      });

    if (error) throw error;
    fullName.value = "";
    github.value = "";
    linkedin.value = "";
    address.value = "";
    email.value = "";
    phone.value="";

    Swal.fire({
      title: "User Added",
      text: "User Sucesfully Added in the System",
      icon: "success",
    });

    userTableBody.innerHTML = "";

    getUsers();
  } catch (error) {
    console.log(error);
  }
}

async function getUsers() {
  try {
    const { data, error } = await supabase.from("info").select();
    if (error) throw error;

    userTableBody.innerHTML = ''

    if (data)
        console.log(data)
         {
      data.map((val, index) => {
        return (userTableBody.innerHTML += `
     <tr>
                        <td scope="col">${val.name}</td>
                        <td scope="col">${val.email}</td>
                        <td scope="col">${val.github}</td>
                        <td scope="col">${val.linkedin}</td>
                        <td scope="col">${val.address}</td>
                            <td scope="col">${val.phone}</td>
                        <td> <span> <i id="delete_info" onclick="deleteUser(${val.id})" class="fa-solid fa-trash"></i> </span> </td>
                      </tr>
    `);
      });
    }
  } catch (error) {
    console.log(error);
  }
}
var mysession= JSON.parse(localStorage.getItem("currentUser"))

 
async function deleteUser(userId) {
  try {
    Swal.fire({
      title: "Are you sure want to delete the user",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data, error } = await supabase
          .from("info")
          .delete()
          .eq("id", userId)
          .select();
        if (error) throw error;

        if(data) {
          Swal.fire({
            icon: 'success' ,
            title: 'User Deleted Succesfully '
          })
          getUsers()
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}
async function logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
  
      window.location.href = "/login.html";
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        icon: "error",
        draggable: true,
      });
    }
  }
  if (logoutbtn) {
    logoutbtn.addEventListener("click", logout);
  } 
let deleteBtn = document.getElementById("delete_info");
if (deleteBtn) {
  deleteBtn.addEventListener("click", function () {
    let deleteUserId = localStorage.getItem("deleteUserId");
    console.log(deleteUserId);
  });
}
if(addUserBtn) {
  addUserBtn.addEventListener("click", addUser);
}
window.onload = getUsers();
window.deleteUser = deleteUser;