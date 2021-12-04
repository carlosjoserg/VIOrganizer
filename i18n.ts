import I18n from "i18n-js";

// i18n-translate-json AIzaSyAbCADtQsj1lTQWD1pfaOMi-WHUGkRFTXw locales/ es ca,en,fr,zh

// https://github.com/meedan/i18n-translate-json
// https://cloud.google.com/translate/docs/languages

//I18n.fallbacks = true;

I18n.translations = {
	es: require("./locales/es.json"),
	en: require("./locales/en.json"),
	ca: require("./locales/ca.json"),
	fr: require("./locales/fr.json"),
	zh: require("./locales/zh.json"),
};

export default I18n;
