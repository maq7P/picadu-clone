import './assets/css/style.css'
import SetUser from './modules/SetUser'
import FromElement from './modules/FormElement'
new FromElement({
    login: [
        {type: 'email', count: 1, placeholder: 'Логин', name: 'email'},
        {type: 'password', count: 1, placeholder: 'Пароль', name: 'password'},
    ],
    singUp: [
        {type: 'text', count: 1, placeholder: 'Никнейм на Пикабу', name: 'nick'},
        {type: 'email', count: 1, placeholder: 'E-mail', name: 'email'},
        {type: 'password', count: 1, placeholder: 'Пароль', name: 'password'},
    ],
    animation: 'fadeIn',
}
).render();

let users = new SetUser()