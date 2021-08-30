import React, { FunctionComponent, Suspense } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Loading } from './components/UI/Loading';
import { UserContextProvider } from './context/UserContext';

const MainContent = React.lazy(() =>
  import('./components/MainContent').then(({ MainContent }) => ({
    default: MainContent,
  })),
);

const App: FunctionComponent = () => (
  <Suspense fallback={<Loading />}>
    <UserContextProvider>
      <Header />
      <MainContent />
      <Footer />
    </UserContextProvider>
  </Suspense>
);

export default App;
