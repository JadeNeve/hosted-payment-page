import { Route, Routes } from 'react-router-dom';
import AcceptQuotePage from '../pages/AcceptQuotePage';
import ExpiredPage from '../pages/ExpiredPage';
import PayQuotePage from '../pages/PayQuotePage';
import NotFoundPage from '../pages/NotFoundPage';
import { paths } from './paths';
import StartupRedirect from '../pages/StartupRedirect';

interface RouteConfig {
  path: string;
  element: React.ReactElement;
}

const routeList: RouteConfig[] = [
  { path: '/', element: <StartupRedirect /> },
  { path: paths.acceptQuote, element: <AcceptQuotePage /> },
  { path: paths.payQuote, element: <PayQuotePage /> },
  { path: paths.expiredQuote, element: <ExpiredPage /> },
  { path: paths.notFound, element: <NotFoundPage /> },
];

const AppRouter = () => {
  return (
    <Routes>
      {routeList.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default AppRouter;
