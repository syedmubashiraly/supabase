
async function checkSession() {
    try {
     
      const { data } = await supabase.auth.getSession();
      console.log(data); 
   
      const authPages = ["/index.html", "/login.html", "/"];
      const currentPath = window.location.pathname;
      const isAuthPage = authPages.includes(currentPath);
  
  
      const { session } = data || {}; 
  
      
      if (session) {
     
        if (isAuthPage) {
          window.location.href = "/dashboard.html";
        }
      } else {
       
        if (!isAuthPage) {
          window.location.href = "/login.html";
        }
      }
  
      
      if (session) {
        localStorage.setItem("session", JSON.stringify(session));
      }
  
      console.log("Session:", session); 
    } catch (error) {
      console.error("Error in checkSession:", error);
    }
  }
  
  
  window.onload = checkSession;
   