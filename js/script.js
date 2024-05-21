// Add some interactivity to the website

// add handler input type checkbox
class MultiStepForm{
    constructor(){
        this.currentStep = 1
        this.initForm()
    }

    initForm(){
        this.initCheckboxes()
        this.handleNextStep()
    }

    initCheckboxes(){
        const checkboxes = document.querySelectorAll('.container-input-checkbox input[type="checkbox"]')
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', event => this.handleCheckboxChange(event))
        })
    }

    handleNextStep(){
        const buttons = document.querySelectorAll('.container-input-button button[class="next-step"]')
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                let isValidInput = this.validateStepInputs()
                if(isValidInput){
                    this.nextStep()
                    this.hidePreviousStep()
                }
            })
        })
    }

    nextStep(){
        this.currentStep++
    }

    hidePreviousStep(){
        const previousStep = this.currentStep - 1
        if(previousStep > 0) {
            const previousStepElement = document.querySelector(`.step-${previousStep}`);
            if (previousStepElement) {
                previousStepElement.classList.add('d-none');
            }
        }
        const currentStepElement = document.querySelector(`.step-${this.currentStep}`);
        if (currentStepElement) {
            currentStepElement.classList.remove('d-none');
        }
    }

    validateStepInputs(){
        const inputs = document.querySelectorAll(`.step-${this.currentStep} input`)
        let isValid = true
        inputs.forEach(input => {
            if(!this.validateTypeInput(input, input.type)){
                isValid = false;
            }
        })
        return isValid;
    }


    validateTypeInput(input, type){
        if(type === "text" || type === "email"){
            return this.validateInputText(input)
        }else if(type === "checkbox"){
            return this.validateInputCheckboxes(input)
        }
    }

    validateInputCheckboxes(input){
        if(input.checked || !input.checked){
            return true;
        }
    }

    validateInputText(input){
        if(input.value.trim() === ""){
            input.classList.add('invalid');
            return false;
        }else{
            input.classList.remove('invalid');
            return true;
        }
    }

    handleCheckboxChange(event){
        const checkbox = event.target
        const label = checkbox.closest('.container-input-checkbox')
        if(checkbox.checked){
            label.classList.add('isTrusted')
        }else{
            label.classList.remove('isTrusted')
        }
    }
}
new MultiStepForm()

document.addEventListener('DOMContentLoaded', () => {
    const form = new MultiStepForm()
})