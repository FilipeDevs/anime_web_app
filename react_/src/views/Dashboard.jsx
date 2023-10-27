import { Navigate, Outlet, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import DashboardTabs from "../components/dashboard/DashboardTabs";
import AllUserAnime from "../components/dashboard/AllUserAnime";

function Dashboard() {
    const { user, token } = useStateContext();
    const { list } = useParams();

    if (!token) {
        // Redirect user if he is not auth
        return <Navigate to="/login" />;
    }

    console.log(user);

    return (
        <div>
            <span>Hello !</span>
            <DashboardTabs />
            {list ? <Outlet /> : <AllUserAnime />}
        </div>
    );
}

export default Dashboard;
