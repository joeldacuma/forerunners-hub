export default {
  config: {
    theme: {
      colors: {
        buttonPrimary500: '#38b6ff',
        buttonPrimary600: '#38b6ff',
      },
    },
    translations: {
      en: {
        'app.components.LeftMenu.navbrand.title': 'Forerunners HUB',
        'app.components.LeftMenu.navbrand.workplace': 'Dashboard Panel',
        'Auth.form.welcome.title': 'Welcome to Forerunners HUB!',
        'Auth.form.welcome.subtitle': 'Login your Admin account',
        'HomePage.helmet.title': 'HUB Dashboard',
        'app.components.HomePage.welcome.again': 'Welcome to Forerunners HUB!',
        'app.components.HomePage.welcomeBlock.content.again': `
            Setup your company with ease. Feel free to configure your content manager which will be visible to your 
            registered members.
        `,
        'Settings.profile.form.section.experience.interfaceLanguageHelp': `
          Change preference theme for your dashboard profile.
        `,
        'Auth.form.register.news.label': `
           By checking, you agree to our terms in processing your data. Learn more about our {policy}
        `,
        'Auth.form.register.subtitle': `
          Credentials are used to authenticate in Journey. All data will be encrypted and stored for your personal dashboard.
        `,
        'Settings.application.strapiVersion': 'Dashboard version',
      },
    },
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
    tutorials: false,
    notifications: { release: false },
  },
  bootstrap() {
    document.title = 'Forerunners HUB'
  },
}
