'use client'

import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getOptions } from './config'

// Import all translation files
import common from '../../content/en/common.json'
import home from '../../content/en/home.json'
import team from '../../content/en/team.json'
import community from '../../content/en/community.json'
import research from '../../content/en/research.json'
import contact from '../../content/en/contact.json'
import blog from '../../content/en/blog.json'
import benchmarks from '../../content/en/benchmarks.json'

const resources = {
  en: {
    common,
    home,
    team,
    community,
    research,
    contact,
    blog,
    benchmarks,
  },
}

const i18nInstance = createInstance()

i18nInstance
  .use(initReactI18next)
  .init({
    ...getOptions(),
    lng: 'en',
    resources,
  })

export default i18nInstance
