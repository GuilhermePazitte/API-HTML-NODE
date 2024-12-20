function onChangeEmail(){
    toggleButtonsDisabled();
    toggleEmailErrors();
}

function onChangePassword(){
    toggleButtonsDisabled();
    togglePasswordErrors();

}

function login(){

    showLoading();
    firebase.auth().signInWithEmailAndPassword(form.email().value, form.password().value)
    .then(response =>{
        hideLoading();
        window.location.href = "pages/home/home.html"
    }).catch(error =>{
        hideLoading();
        alert(getErrorMessage(error));
    })

}

function getErrorMessage(error){
    if(error.code == "auth/invalid-credential"){
        return "Credencial Inválida";
    }
    return error.message;
}

function register(){
    showLoading();
    //window.location.href = "pages/register/register.hmtl";
}

function toggleEmailErrors(){
    const email= form.email().value;

    form.emailInvalidError().style.display= validateEmail(email) ? "none" : "block";

    form.emailRequiredError().style.display= email ? "none" : "block";

}

function togglePasswordErrors(){
    const password = form.password().value;

    form.passwordRequiredError().style.display= password ? "none" : "block";

}

function toggleButtonsDisabled(){
    const emailValid = isEmailValid()
    form.recoverPassword().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}

function isEmailValid(){
    const email = form.email().value;
    
    if (!email){
        return false
    }
    return validateEmail(email);
}

function isPasswordValid(){
    const password = form.password().value;

    if(!password){
        return false
    }
    return true;
}

const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    loginButton: () => document.getElementById('login-button'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    recoverPassword: () => document.getElementById('recover-password-button'),
}
