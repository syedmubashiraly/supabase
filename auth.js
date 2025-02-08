let signupEmail = document.getElementById("signup-email");
let signupPass = document.getElementById("signup-pass");
let signupBtn = document.getElementById("signup-btn");
let loginEmail = document.getElementById("login-email");
let loginPass = document.getElementById("login-pass");
let loginBtn = document.getElementById("login-btn");
let signupName = document.getElementById("signup-name");
let signupGoogle = document.getElementById("google-btn");

console.log(supabase);

async function signup() {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: signupEmail.value,
      password: signupPass.value,
    });

    if (error) throw error;
    if (data) {
      console.log(data);
      console.log(data.user);
      // alert("check your email");
      try {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .insert({
            userId: data.user.id,
            name: signupName.value,
            email: signupEmail.value,
          })
          .select();
        if (userError) throw userError;
        if (userData) {
          console.log(userData);
          Swal.fire({
            title: "Sign-Up Successfully!",
            icon: "success",
            text:"Confirm your Email",
            draggable: true,
          });
        }
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
    return data;
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      icon: "error",
      draggable: true,
    });
  }
}
if (signupBtn) {
  signupBtn.addEventListener("click", signup);
}

async function signupWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      // options:
      //       redirectTo:"http://127.0.0.1:5500/dashboard.html";
    });

    if (error) throw error;
    if (data) {
      Swal.fire({
        title: "Sign-Up Successfully!",
        icon: "success",
        draggable: true,
      });
      window.location.href("/dashboard.html");
    }
  } catch (error) {
    console.log(error);
      Swal.fire({
            title: "Error!",
            icon: "error",
            draggable: true,
          });
  }
}
if (signupGoogle) {
  signupGoogle.addEventListener("click", signupWithGoogle);
}

async function loginsession() {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail.value,
      password: loginPass.value,
    });

    if (error) throw error;
    if (data) {
      console.log(data);
      Swal.fire({
        title: "Log-In Successfully!",
        icon: "success",
        draggable: true,
      });

      window.location.href = "/dashboard.html";
    }
  } catch (error) {
    console.log(error.message);
  }
}
if (loginBtn) {
  loginBtn.addEventListener("click", loginsession);
}