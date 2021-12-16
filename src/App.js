import { useLayoutEffect, useState } from 'react';
import Dashboard from './Components/Dashboard';
import MobileViewError from './Components/MobileViewError';

function App() {
  const [mobileView, setMobileView] = useState(false);
  function useWindowSize() {
    useLayoutEffect(() => {
      function updateSize() {
        if (window.innerWidth < 1350) {
          setMobileView(true);
        } else {
          setMobileView(false);
        }
      }
      window.addEventListener('resize', updateSize);
      updateSize();
    }, []);
  }
  useWindowSize();
  if (mobileView) return <MobileViewError />;
  return <Dashboard />;
}

export default App;
