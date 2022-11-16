import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AppRouter from './routes/AppRouter';
import { GeneralProvider } from './helper/context/GeneralProvider';
import { Toaster } from 'react-hot-toast';

function App() {

  return (

    <BrowserRouter >

      <GeneralProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <Header />
        <AppRouter />
        <Footer />
      </GeneralProvider>
    </BrowserRouter>

  );
}

export default App;
