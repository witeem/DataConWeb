import i18n from "i18next";
import enUsTrans from "./modules/en";
import zhCnTrans from "./modules/zh";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: enUsTrans
		},
		zh: {
			translation: zhCnTrans
		}
	},

	// Select the default language and select en/ en as the key in the preceding configuration
	fallbackLng: "en",
	lng: "en",
	debug: false,
	interpolation: {
		escapeValue: false // not needed for react as it escapes by default
	}
});

export default i18n;
