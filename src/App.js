import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AppRouter from './routes/AppRouter';
import { GeneralProvider } from './helper/context/GeneralProvider';

function App() {



  return (

    <BrowserRouter >
      <GeneralProvider>
        <Header />
        <AppRouter />
        <Footer />
      </GeneralProvider>
    </BrowserRouter>

  );
}

export default App;
