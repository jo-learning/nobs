// components/LanguageSwitcher.js
import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (lang) => {
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <div className='text-black items-center justify-center mt-1 mx-2'>
      <button onClick={() => changeLanguage('en')} hidden={locale === 'en'}  className='rounded-lg bg-purple-500 p-1'>
        English
      </button>
      <button onClick={() => changeLanguage('ti')} hidden={locale === 'ti'} className='rounded-lg bg-purple-500 p-1'>
        ትግርኛ
      </button>
    </div>
  );
};

export default LanguageSwitcher;