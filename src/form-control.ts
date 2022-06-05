import isEmail from 'validator/lib/isEmail';

const SHOW_ERROR_MESSAGES = 'show-error-message';
const form = document.querySelector('.form') as HTMLFormElement;
const username = document.querySelector('.username') as HTMLInputElement;
const email = document.querySelector('.email') as HTMLInputElement;
const password = document.querySelector('.password') as HTMLInputElement;
const passwordConfirmation = document.querySelector('.password-confirmation') as HTMLInputElement;

form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    hideErrorMessages(form);
    checkForEmptyFields(username, email, password, passwordConfirmation);
    checkEmail(email);
    checkPasswords(password, passwordConfirmation);
    if (shouldSendForm(form)) {
        form.submit();
    }
});

function shouldSendForm(form: HTMLFormElement): boolean {
    return !form.querySelector('.' + SHOW_ERROR_MESSAGES);
}

function checkPasswords(password: HTMLInputElement, passwordConfirmation: HTMLInputElement): void {
    if (password.value !== passwordConfirmation.value) {
        showErrorMessage(passwordConfirmation, 'Senhas não conferem');
        showErrorMessage(password, 'Senhas não conferem');
    }
}

function checkForEmptyFields(...inputs: HTMLInputElement[]): void {
    inputs.forEach((input) => {
        if (!input.value && input.classList.contains('required')) {
            showErrorMessage(input, 'Campo não pode ficar vazio');
        }
    });
}
function checkEmail(email: HTMLInputElement): void {
    if (!isEmail(email.value)) {
        showErrorMessage(email, 'Email inválido');
    }
}

function showErrorMessage(input: HTMLInputElement, msg: string): void {
    const formFields = input.parentElement as HTMLDivElement;
    const errorMessage = formFields.querySelector('.error-message') as HTMLDivElement;
    errorMessage.innerText = msg;
    formFields.classList.add(SHOW_ERROR_MESSAGES);
}
function hideErrorMessages(form: HTMLFormElement): void {
    form.querySelectorAll('.' + SHOW_ERROR_MESSAGES).forEach((item) => {
        item.classList.remove(SHOW_ERROR_MESSAGES);
    });
}
