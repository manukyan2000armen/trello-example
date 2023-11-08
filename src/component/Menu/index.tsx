import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import st from "./style.module.css";

function Menu() {
  const params = useParams();
  const navigate = useNavigate()
  const data = localStorage.getItem("userId");
  console.log(data);

  return (
    <>
      <div className={st.myMenu}>
        <div className={st.myMenuList}>
          {data ? (
            <ul>
              <li>
                <Link to={"/profile"}>Profile</Link>
              </li>
              <li>
                <Link to={"/personal"}>Personal</Link>
              </li>
              <li>
                <button className={st.btnLogOut}
                  onClick={() => {
                    localStorage.removeItem("userId");
                    navigate("/")
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to={"/"}>Log In</Link>
              </li>
              <li>
                <Link to={"/register"}>Register</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Menu;
