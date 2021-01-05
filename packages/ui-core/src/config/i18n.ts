import {loadTranslations, setLocale, syncTranslationWithStore} from "react-redux-i18n";

const initializeI18n = (store: any, i18nCustom: any) => {
  syncTranslationWithStore(store);
  store.dispatch(loadTranslations(i18nCustom));
  store.dispatch(setLocale("vi"));
}
export default initializeI18n;
export {initializeI18n};

