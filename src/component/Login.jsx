import React, { useEffect, useContext } from 'react';
import '../styles/Login.css';
import Tab from '@mui/joy/Tab';
import Tabs from '@mui/joy/Tabs';
import TabPanel from '@mui/joy/TabPanel';
import TabList from '@mui/joy/TabList';
import { Alert } from '@mui/material';
import BlogContext from '../context/context';
import { useNavigate } from 'react-router-dom';


function Login() {
  const {
    handleTabChange,
    activeTab,
    setUserPassword,
    handleSubmit,
    setMail,
    successMessage,
    setSuccessMessage,
    setErrorMessage,
    errorMessage,
    handleSubmitChecked,
    setCheckedMail,
    setCheckedPassword,
    isLoggined,
    setIsLoggined,
    isNameValid,
    handleNameChange,


  } = useContext(BlogContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (successMessage || errorMessage ) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
       
      }, 3000); // 3 saniye sonra başarı ve error mesajını kaldır
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);


  useEffect(() => {
    const storedData = localStorage.getItem('isLoggined');
    if (storedData) {
      setIsLoggined(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isLoggined', JSON.stringify(isLoggined));

    if (isLoggined.check) {
      navigate('/');
    }
  }, [isLoggined]);





  return (
    <div>

      <Tabs value={activeTab} onChange={handleTabChange}>
        <TabList>
          <div className="tabsList">
            <Tab className="tabsButton">Giriş Yap</Tab>
            <Tab className="tabsButton">Kayıt Ol</Tab>
          </div>
        </TabList>

        {/* GİRİŞ YAP KISMI  */}

        <TabPanel value={0}>


          <div className='alertContainer'>
            {successMessage && <Alert severity="success" className='alertSucces'>{successMessage}</Alert>}
            {errorMessage && <Alert severity="error" className='alertError'>{errorMessage}</Alert>}

          </div>
          <div className="loginPage">
            <h2>Giriş Yap</h2>
            <form id="login-form">
              <label>E-Mail</label>
              <input type="text" onChange={(event) => setCheckedMail(event.target.value)} />
              <label>Şifre</label>
              <input type="password" onChange={(event) => setCheckedPassword(event.target.value)} />
              <button onClick={handleSubmitChecked}>Tamam</button>
            </form>
          </div>
        </TabPanel>
        {/* GİRİŞ YAP BİTİMİ */}

        {/* KAYIT OL KISMI */}

        <TabPanel value={1}>
          <div className='alertContainer'>
            {successMessage && <Alert severity="success" className='alertSucces'>{successMessage}</Alert>}
            {errorMessage && <Alert severity="error" className='alertError'>{errorMessage}</Alert>}
            {isNameValid ? null : <Alert severity="warning" className='alertWarning'>Ad soyad en az iki kelime içermelidir. Boşluklu yazdığınızdan emin olun.</Alert>}

          </div>
          <div className="loginPage">
            <h2>Kayıt Ol</h2>
            <form id="registration-form">
              <label>Ad Soyad</label>
              <input type="text" onChange={handleNameChange} />
              <label>E-Mail</label>
              <input type="text" onChange={(event) => setMail(event.target.value)} />
              <label>Şifre</label>
              <input type="password" onChange={(event) => setUserPassword(event.target.value)} />
              <button type='submit' onClick={handleSubmit}>Kayıt Ol</button>


            </form>
          </div>
        </TabPanel>

        {/* KAYIT OL BİTİMİ */}
      </Tabs>
    </div>
  );
}

export default Login;
