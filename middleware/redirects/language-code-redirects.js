import languages from '../../lib/languages.js'

// This middleware handles redirects for mistyped language codes
//
// Examples:
// /jp*    -> /ja*
// /zh-TW* -> /cn*
export default function languageCodeRedirects (req, res, next) {
  for (const code in languages) {
    const language = languages[code]
    const redirectPatterns = language.redirectPatterns || []
    for (const i in redirectPatterns) {
      const redirectPattern = redirectPatterns[i]
      if (redirectPattern.test(req.path)) {
        return res.redirect(301, req.path.replace(redirectPattern, `/${language.code}`))
      }
    }
  }

  return next()
}
