const Dashboard = ({ user }) => {
    console.log("Dashboard user prop:", user);
    return (
      <main>
        <h1>Welcome, {user?.firstName || "User"}</h1>
        <div>
          <p>Get ready to start your journey.. more to come!</p>
        </div>
      </main>
    );
  };
  
export default Dashboard; 