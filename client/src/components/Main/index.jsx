import BookDiscovery from "./search";
import styles from "./styles.module.css";

// const Main = () => {
// 	const handleLogout = () => {
// 		localStorage.removeItem("token");
// 		window.location.reload();
// 	};

// 	return (
// 		<div className={styles.main_container}>
// 			<nav className={styles.navbar}>
// 				<h1>ShareBook</h1>
// 				<button className={styles.white_btn} onClick={handleLogout}>
// 					Logout
// 				</button>
// 			</nav>
// 			<BookDiscovery/>
// 		</div>
// 	);
// };

const Main = ({ authToken }) => {
	const handleLogout = () => {
	  localStorage.removeItem("token");
	  window.location.reload();
	};
  
	return (
	  <div className={styles.main_container}>
		<nav className={styles.navbar}>
		  <h1>ShareBook</h1>
		  <button className={styles.white_btn} onClick={handleLogout}>
			Logout
		  </button>
		</nav>
		<BookDiscovery authToken={authToken} />
	  </div>
	);
  };

export default Main;
