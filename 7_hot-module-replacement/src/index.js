import _ from 'lodash'
import printMe from './print.js'
import './styles.css'

function component() {
  const element = document.createElement('div')
  const btn = document.createElement('button')

  element.innerHTML = _.join(['Hello', `It's me, `], ' ')

  btn.innerHTML = 'Click me and Check the console!!!!'
  btn.onclick = printMe;

  element.appendChild(btn)

  return element;
}

let element = component()
document.body.appendChild(element)

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Acception the updated printMe module!')
    document.body.removeChild(element)
    element = component()
    docuemnt.body.appendChild(element)
  })
}