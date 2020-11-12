import SetUser from './SetUser'
class FromElement extends SetUser{
    constructor({
            login,
            singUp,
            animation
        }) {
        super()
        this.inputsLoginArr = login;
        this.inputsSingupArr = singUp;
        this.animation = animation;
        this.toggleElements = ['.login', '.user', '.sidebar-nav', '.button-new-post']
    }
    _generateloginInputs(inputsArr) {
        let inputs = '';
        inputsArr.forEach(obj => {
            for (let i = 0; i < obj.count; i++){
                inputs +=
                    `
                    <div class="login-form__input-block">
                        <input 
                            name=${obj.name}
                            type=${obj.type}
                            placeholder=${obj.placeholder}
                            minlength="3"
                            class="login-form__input"
                            required
                        >
                        <span class="flex none">×</span>
                    </div>
                `
            }
        });
        return inputs;
    }
    _generateFormLogIn(animation){
        document.querySelector('.sidebar')
            .insertAdjacentHTML('afterbegin',
                `
                    <div class="card login">
                        <div class="${animation}">
                            <h2>Авторизация</h2>
                            <form class="login-form">
                                <div class="login-inputs">
                                    ${this._generateloginInputs(this.inputsLoginArr)}
                                </div>
                                <span class="login-form__forget">Забыли пароль?</span>
                                <button type="submit" class="login-form__btn">Войти</button>
                                <span class="login-form__singup">РЕГИСТРАЦИЯ</span>
                            </form>
                        </div>
                    </div>
                `
            )
            this.deleteInteredText('.login-form__input')
            // this.submit()
            this.commonSubmit('LOG_IN')
            this.onClick(this._generateFormSingup, this.animation)
    }
    _generateFormSingup(animation) {
        document.querySelector('.sidebar')
            .insertAdjacentHTML('afterbegin',
                `
                    <div class="card login">
                        <div class="${animation}">
                            <h2>Регистрация</h2>
                            <form class="login-form">
                                <div class="login-inputs">
                                    ${this._generateloginInputs(this.inputsSingupArr)}
                                </div>
                                <button type="submit" class="login-form__btn">Создать аккаунт</button>
                                <span class="login-form__singup">АВТОРИЗАЦИЯ</span>
                            </form>
                        </div>
                    </div>
                `
            )
        this.deleteInteredText('.login-form__input')
        this.commonSubmit('SING_UP')
        this.onClick(this._generateFormLogIn, this.animation)
        this.progressPassword(document.querySelector('[name="password"]'))
    }
    deleteInteredText(inputClass){
        const inputs = document.querySelectorAll(inputClass)
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.length > 0) {
                    input.nextElementSibling.classList.remove('none')
                    input.nextElementSibling.addEventListener('click', () => {
                        input.value = ''
                        input.nextElementSibling.classList.add('none')
                    })
                } else {
                    input.nextElementSibling.classList.add('none')
                }
            })
        })
    }
    commonSubmit(action){
        const inputs = document.querySelectorAll('.login-form__input')
        const loginForm = document.querySelector('.login-form')

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault()
            let dataInputs = []
            inputs.forEach(input => {
                dataInputs.push({
                    type: input.name,
                    value: input.value
                })
            })

            switch (action) {
                case 'SING_UP':
                    console.log(dataInputs);
                    this.signUp(dataInputs, this.toggleElements)
                    break;
                case 'LOG_IN':
                    this.logIn(dataInputs, this.toggleElements)
                    break;
                default:
                    break;
            }
        })
    }
    onClick(callback, animation) {
        const singupBtn = document.querySelector('.login-form__singup')
        singupBtn.addEventListener('click', () => {
            document.querySelector('.login').remove()
            this.render(callback, this.animation)
        })
    }
    progressPassword(passwordElement){
        function validPassword(password) {
            let anySimbols = /.{9,}/
            let anySepcialSimbols = /\W\D{1,}/
            let anyBigLetter = /[A-Z]{1,}/
            let anyDigits = /[0-9]{3,}/
            let anyLetters = /[a-z]{3,}/

            if (anyDigits.test(password) && anyLetters.test(password) &&
                anyBigLetter.test(password) && anySimbols.test(password) &&
                anySepcialSimbols.test(password)) {
                return 'very_good'
            }
            if (anyDigits.test(password) && anyLetters.test(password) &&
                anyBigLetter.test(password) && anySimbols.test(password)) {
                return 'good'
            }
            if (anyDigits.test(password) && anyLetters.test(password)){
                return 'weak'
            } else{
                return 'very_weak'
            }
            
            
        }

        passwordElement.addEventListener('focus', () => {
            if (!passwordElement.value && !document.querySelector('.progressPasword')) {
                const progressPasword = document.createElement('div')
                progressPasword.classList.add('progressPasword')
                progressPasword.style.cssText = `
                        position: absolute;
                        top: 12px;
                        right: 7px;
                        width: 50px;
                        background-color: #e5e5e5;
                        height: 5px;
                        border-radius: 4px;
                        z-index: 1;
                `;
                const currentProgress = document.createElement('div')
                currentProgress.classList.add('currentProgress')
                currentProgress.style.cssText = `
                        position: absolute;
                        top: 12px;
                        background-color: red;
                        height: 5px;
                        border-radius: 4px;
                        z-index: 10;
                `;
                passwordElement.insertAdjacentElement('afterend', progressPasword)
                passwordElement.insertAdjacentElement('afterend', currentProgress)
            }
        })
        
        passwordElement.addEventListener('input', (e) => {
            // width + right = 57
            const currentProgress = document.querySelector('.currentProgress')
            switch (validPassword(e.target.value)) {
                case 'very_weak':
                    currentProgress.style.width = '5px';
                    currentProgress.style.right = '52px';
                    break;
                case 'weak':
                    currentProgress.style.width = '20px';
                    currentProgress.style.right = '37px';
                    currentProgress.style.backgroundColor = 'rgb(233, 113, 113)';
                    break;
                case 'good':
                    currentProgress.style.width = '35px';
                    currentProgress.style.right = '22px'; 
                    currentProgress.style.backgroundColor = '#fa8c16'
                    break;
                case 'very_good':
                    currentProgress.style.width = '50px';
                    currentProgress.style.right = '7px';
                    currentProgress.style.backgroundColor = 'green'
                    break;
            }
        })
    }



    render(callback = this._generateFormLogIn, animation='') {
        callback.call(this, animation)
    }
}
export default FromElement