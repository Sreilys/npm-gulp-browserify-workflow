$ = require 'jquery'

do fill = (item = 'The most creative minds in Science') ->
  $('.tagline').append "#{item}"
fill