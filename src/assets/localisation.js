var localization_EN_Data = {
    'dashboard.page.heading.message': 'Translate'
}


export function translate(locale_text) {
    // if (locale_text && localStorage.getItem('lang_response')) {
    //     var langresult = JSON.parse(localStorage.getItem('lang_response')).filter(function (obj) {
    //         return obj.code == locale_text;
    //     });
    //     if (langresult[0]) return Object.values(langresult[0])[1];
    //     else return localStorage.locale == 'mr_IN' ? localization_MR_Data[locale_text] || locale_text : localization_EN_Data[locale_text] || locale_text;
    // }
    return localization_EN_Data[locale_text] || locale_text
}