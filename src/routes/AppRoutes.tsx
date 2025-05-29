import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Outlet,
} from "react-router-dom";
import { ROUTES } from "./ROUTES";
import LoginPage from "../pages/LoginPage";
import BundlesPage from "../pages/bundles/BundlesPage";
import PageNotfound from "../pages/PageNotfound";
import Nav from "../components/Nav";
import BundlesCreatePage from "../pages/bundles/BundlesCreatePage";
import BundlesUpdatePage from "../pages/bundles/BundlesUpdatePage";


function useAuth() {
    const token = localStorage.getItem("token");
    return Boolean(token); // true = autenticado
}

function RequireAuth() {
    const authed = useAuth();
    return authed ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
}

function LayoutPrivate() {
    return (
        <div className="flex h-screen">
            <Nav />

            {/* zona de contenido */}
            <main className="flex-1 overflow-y-auto p-6">
                <Outlet />
            </main>
        </div>
    );
}

const publicRoutes = [
    { path: ROUTES.LOGIN, element: <LoginPage /> },
];

const privateRoutes = [
    { path: ROUTES.BUNDLES, element: <BundlesPage /> },
    { path: ROUTES.CREATE_BUNDLE, element: <BundlesCreatePage /> },
    { path: ROUTES.UPDATE_BUNDLE, element: <BundlesUpdatePage /> },
];

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* -------- rutas públicas -------- */}
                {publicRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}

                {/* -------- rutas privadas -------- */}
                <Route element={<RequireAuth />}>
                    <Route element={<LayoutPrivate />}>
                        {privateRoutes.map(({ path, element }) => (
                            <Route key={path} path={path} element={element} />
                        ))}
                    </Route>
                </Route>

                {/* 404 */}
                <Route path="*" element={<PageNotfound />} />
            </Routes>
        </Router>
    );
}
