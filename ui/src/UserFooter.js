function UserFooter(){
  const currentDate = new Date().getFullYear();
  const appName = process.env.SOFTWARE_NAME || 'Student Management';
  const appVersion = process.env.SOFTWARE_VERSION || '0.1.0';
      return (
            <footer>
              <div  className="container">
                  <span>&copy; {appName} {currentDate} Tous droits reservés.</span>
                  <span className="float-right">Version :{appVersion}</span>
              </div>
            </footer>
       
        );
  }

  export default UserFooter;