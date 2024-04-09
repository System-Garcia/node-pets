import useScrollToTop from '../../hooks/use-scroll-to-top';
import Router from '../../routes/sections';
import ThemeProvider from '../../theme';
import '../../global.css';


const DashboardPage = () => {
  useScrollToTop();

  return (
    <>

    <ThemeProvider>
      <Router />
    </ThemeProvider>
    </>
  );
};

export default DashboardPage;
