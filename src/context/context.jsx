import { createContext } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'


const BlogContext = createContext();


function Provider({ children }) {

    // LOGİN PANEL KODLARI
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState('');
    const [mail, setMail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [blogerrorMessage, setBlogErrorMessage] = useState('');
    const [blogSuccesMessage, setBlogSuccesMessage] = useState('');
    const [checkedMail, setCheckedMail] = useState("");
    const [checkedPassword, setCheckedPassword] = useState("");
    const [activeTab, setActiveTab] = useState(0);
    const [isNameValid, setIsNameValid] = useState(true); // Ad soyad geçerli mi kontrolü için bir state

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleNameChange = (event) => {
        const name = event.target.value;
        const isValid = name.split(' ').length >= 2;  // Ad soyadın en az iki kelime içerdiğini kontrol et
        setIsNameValid(isValid);
        setUserName(name);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();  // form onsubmit olduğunda yenilenmemesi için kullanılmıştır.

        if (!userName || !mail || !userPassword) {
            setErrorMessage('Lütfen tüm alanları doldurun.');
            return;
        }

        if (!validateEmail(mail)) {
            setErrorMessage('Lütfen geçerli bir e-posta adresi girin.');
            return;
        }
        if (isNameValid) {
            try {
                const response = await axios.post('http://localhost:3004/users', {
                    userName,
                    mail,
                    userPassword,
                });
                const createdUser = [...users, response.data];
                setUsers(createdUser);
                setSuccessMessage('Kayıt başarıyla tamamlandı.');
                setErrorMessage('');
                setActiveTab(0);
                resetForm();

            } catch (error) {
                setErrorMessage('Kayıt sırasında bir hata oluştu.');
                setSuccessMessage('');

            }
        }
        else {
            setErrorMessage('Ad ve soyadınızı boşluklu yazdığınızdan emin olun.');

        }

    };

    const validateEmail = (email) => { // mail yazım kontrolü
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const resetForm = () => {  // işlem bitiminden sonra formların resetlenmesi
        setUserName('');
        setMail('');
        setUserPassword('');
        const RegisterForm = document.getElementById('registration-form');
        if (RegisterForm) {
            RegisterForm.reset();
        }

        setCheckedMail();
        setCheckedPassword();
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.reset();
        }


        const CreatedBlogForm = document.getElementById('CreatedBlogForm');
        if (CreatedBlogForm) {
            CreatedBlogForm.reset();
        }
    };



    const handleSubmitChecked = async (event) => {
        event.preventDefault();
        if (!checkedMail || !checkedPassword) {
            setErrorMessage('Lütfen tüm alanları doldurun.');
            return;
        }
        try {
            const response = await axios.get('http://localhost:3004/users');
            const users = response.data;

            users.forEach((user) => {

                if (user.mail === checkedMail && user.userPassword === checkedPassword) {
                    setErrorMessage('');
                    setCheckedMail('');
                    setCheckedPassword('');
                    resetForm();
                    setSuccessMessage('Giriş Başarılı Hoşgeldiniz.');
                    setIsLoggined({ name: user.userName, mail: user.mail, id: user.id, check: true })

                }
                else {
                    setErrorMessage('Mail ya da Şifreniz Yanlış Olabilir.');
                    setSuccessMessage('');

                }
            });
        } catch (error) {
            setErrorMessage('Veri alınırken bir hata oluştu:', error);
            setSuccessMessage('');

        }
    };


    // LOGİN PANEL KODLARI BİTİMİ

    // USER İMAGE
    function stringToColor(string) {
        if (!string) {
            return '#000000'; // Varsayılan renk: siyah
        }

        let hash = 0;

        for (let i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (let i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }


    function stringAvatar(name) {   // Gelen isimlerin ilk başındaki harfi ve ikinci ismin başındaki harfi alıp ekranda görünmesi için döndürüyorum
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.toUpperCase().split(' ')[0][0]}${name[1] ? name.toUpperCase().split(' ')[1][0] : ''}`,

        };
    }
    // USER İMAGE END


    // Navbar 
    const [isLoggined, setIsLoggined] = useState({
        name: "",
        mail: "",
        id: "",
        check: false
    })
    // Navbar BİTİMİ


    // CREATED BLOG 
    const [createTitle, setCreateTitle] = useState('');
    const [createİmg, setCreateİmg] = useState('');
    const [createContent, setCreateContent] = useState('');



    const handleBlogCreateSubmit = async (e) => {
        e.preventDefault();

        if (!createTitle || !createContent) {
            setBlogErrorMessage("Lütfen Formu Eksiksiz Doldurun!!");
        }

        if (isLoggined.check) {


            const title = createTitle;
            const image = createİmg;
            const content = createContent;
            const author = isLoggined.name;
            const currentDate = new Date();
            const isoDate = currentDate.toISOString();
            const createdDate = isoDate.split('T')[0];



            try {
                await axios.post(' http://localhost:3000/blogList', { author, title, image, content, createdDate });

                // İstek başarılıysa gerekli işlemleri yap
                setBlogSuccesMessage("Bloğunuz Başarılı Bir Şekilde Oluşturuldu. :)");
                setCreateTitle(' ');
                setCreateContent(' ');
                setCreateİmg('')
                resetForm();
                navigate('/');


            } catch (error) {
                // İstek hatalıysa gerekli hata işlemlerini yap
                console.error('Blog yayınlama hatası:', error.message);

                // Diğer işlemler...
            }
        }

        else {
            setBlogErrorMessage("Blog Paylaşmak için Giriş Yapınız");
        }


    };

    // CREATED BLOG BİTİMİ 


    // HTML etiketlerini gizlemek için bir fonksiyon
    const stripHtmlTags = (html) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };


  


    const sharedValuesAndMethods = {
        handleTabChange,
        activeTab,
        setUserName,
        setUserPassword,
        handleSubmit,
        setMail,
        successMessage,
        setSuccessMessage,
        setErrorMessage,
        errorMessage,
        handleNameChange,
        isNameValid,
        handleSubmitChecked,
        setCheckedMail,
        setCheckedPassword,
        isLoggined,
        setIsLoggined,
        stringAvatar,
        stringToColor,

        // Create Blog
        setCreateTitle,
        setCreateİmg,
        setCreateContent,
        createContent,
        handleBlogCreateSubmit,
        blogerrorMessage,
        setBlogErrorMessage,
        blogSuccesMessage,
        setBlogSuccesMessage,
        // Create Blog

        // OTHER
        stripHtmlTags,
        // OTHER


    }

    return (
        <BlogContext.Provider value={sharedValuesAndMethods}>
            {children}
        </BlogContext.Provider>
    )

}

export { Provider }
export default BlogContext