import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AppRouter from './routes/AppRouter';
import { GeneralProvider } from './helper/context/GeneralProvider';
import { Toaster } from 'react-hot-toast';
import { Helper } from './components/Helper/Helper';

function App() {

  return (

    <BrowserRouter >

      <Toaster position="bottom-right" reverseOrder={false} />
      <GeneralProvider>
        <Helper />
        <Header />
        
          <AppRouter />
        
        <Footer />
      </GeneralProvider>
    </BrowserRouter>

  );
}

export default App;
