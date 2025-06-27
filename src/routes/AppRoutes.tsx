import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";
import { ROUTES } from "./ROUTES";
import LoginPage from "../pages/LoginPage";
import BundlesPage from "../pages/bundles/BundlesPage";
import PageNotfound from "../pages/PageNotfound";
import Nav from "../components/Nav";
import BundlesCreatePage from "../pages/bundles/BundlesCreatePage";
import BundlesUpdatePage from "../pages/bundles/BundlesUpdatePage";
import ConceptPage from "../pages/concepts/ConceptPage";
import ConceptCreatePage from "../pages/concepts/ConceptCreatePage";
import ConceptUpdatePage from "../pages/concepts/ConceptUpdatePage";
import SettlementPeriodPage from "../pages/settlementPeriod/SettlementPeriodPage";

// ✅ Hook que verifica si hay token
function useAuth() {
    return Boolean(localStorage.getItem("token"));
}

// ✅ Protege rutas privadas y guarda ubicación previa
function RequireAuth() {
    const authed = useAuth();
    const location = useLocation();

    return authed ? (
        <Outlet />
    ) : (
        <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />
    );
}

// ✅ Layout con navegación lateral y contenido
function LayoutPrivate() {
    return (
        <div className="flex h-full">
            <Nav />
            <main className="flex-1 overflow-y-auto p-6">
                <Outlet />
            </main>
        </div>
    );
}

const publicRoutes = [{ path: ROUTES.LOGIN, element: <LoginPage /> }];

const privateRoutes = [
    { path: ROUTES.HOME, element: <BundlesPage /> },
    { path: ROUTES.BUNDLES, element: <BundlesPage /> },
    { path: ROUTES.CREATE_BUNDLE, element: <BundlesCreatePage /> },
    { path: ROUTES.UPDATE_BUNDLE, element: <BundlesUpdatePage /> },
    { path: ROUTES.CONCEPTS, element: <ConceptPage /> },
    { path: ROUTES.CREATE_CONCEPT, element: <ConceptCreatePage /> },
    { path: ROUTES.UPDATE_CONCEPT, element: <ConceptUpdatePage /> },
    { path: ROUTES.SETTLEMENT_PERIOD, element: <SettlementPeriodPage /> },
];

// ✅ AppRoutes con control de acceso
export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Rutas públicas */}
                {publicRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}

                {/* Rutas privadas protegidas */}
                <Route element={<RequireAuth />}>
                    <Route element={<LayoutPrivate />}>
                        {privateRoutes.map(({ path, element }) => (
                            <Route key={path} path={path} element={element} />
                        ))}
                    </Route>
                </Route>

                {/* Ruta 404 */}
                <Route path="*" element={<PageNotfound />} />
            </Routes>
        </Router>
    );
}
