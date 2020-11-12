class SetUser {
    constructor(){
        this._listUsers = [{
                id: 1,
                email: 'maxpet16@mail.ru',
                password: '123',
                displayName: 'Max'
            },
            {
                id: 1,
                email: 'oliater12@mail.ru',
                password: '1234',
                displayName: 'Olia'
            }
        ]
    }

    get getUsers(){
        return this._listUsers;
    }
    _validation(text){
        const inpustBlock = document.querySelector('.login-inputs')

        if (inpustBlock.querySelector('.valid')) {
            inpustBlock.querySelector('.valid').remove()
        }
        inpustBlock
            .insertAdjacentHTML('beforeend',
                `<div class="valid">${text}</div>`
            )
    }
    _isUser(signUp = false, data) {
        let email, password
        data.forEach(obj => {
            switch (obj.type) {
                case 'email':
                    email = obj.value
                    break;
                case 'password':
                    password = obj.value
                    break;
            }
        });

        if (signUp) return this._listUsers.some(user => user.email === email)

        let emailInner = this._listUsers.some(user => user.email === email)
        let passwordInner = this._listUsers.some(user => user.password === password)

        if (emailInner && passwordInner){
            return true
        } else this._validation('Ошибка. Вы ввели неверные данные аворизации')
    }
    toggleAuth(toggleElements) {
        toggleElements.forEach(className => {
            document.querySelector(className).classList.toggle('none');
        })
    }

    signUp(data, toggleElements) {
        if(this._isUser(true, data)){
            this._validation('Пользователь с таким email зарегестрирован')
        } else{
            this.toggleAuth(toggleElements)
            //logic signUp 

            let displayName, email, password;
            data.forEach(obj => {
                switch (obj.type) {
                    case 'nick':
                        displayName = obj.value;
                        break;
                    case 'email':
                        email = obj.value;
                        break;
                    case 'password':
                        password = obj.value;
                        break;
                }
            })
            this._listUsers.push({
                id: 4,
                email,
                password,
                displayName
            })
            document.querySelector('.user-name').textContent = displayName
            console.log(this.getUsers);
            
        }
    }
    logIn(data, toggleElements) {
        if(this._isUser(false, data)){
            this.toggleAuth(toggleElements)
            // logic logIn
        }
    }
    logOut(){
    }
}
export default SetUser;