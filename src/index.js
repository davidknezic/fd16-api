import $ from 'jquery'
window.jQuery = $
window.$ = $

import svg4everybody from 'svg4everybody'
svg4everybody()

import 'picturefill'
import '@axa-ch/style-guide'

if ('objectFit' in document.documentElement.style === false) {
  document.querySelector('html').className += ' no-objectfit'
}

$(() => {
  require('object-fit-polyfill')
})
