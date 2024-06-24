const botonNumero = document.querySelectorAll('[data-numero]')
const botonOperador = document.querySelectorAll('[data-operador]')
const botonIgual = document.querySelector('[data-igual]')
const botonAllClear = document.querySelector('[data-all-clear]')
const botonDelete = document.querySelector('[data-delete]')
const textoValorSuperior = document.querySelector('[data-valor-superior]')
const textoValorInferior = document.querySelector('[data-valor-inferior]')

class Calculadora {
    constructor(textoValorInferior, textoValorSuperior){
        this.textoValorInferior = textoValorInferior
        this.textoValorSuperior = textoValorSuperior
        this.valorInferior = ''
        this.valorSuperior = ''
        this.operador = undefined
        this.longitudMaxima = 15
    }

    agregarNumero(numero){

        /*Validación coma*/
        if(numero === '.' && this.valorInferior.includes('.')) return

        /*Validación num negativo */
        if(this.valorInferior === ' ' && numero === '-'){
            this.valorInferior = '-'
            return
        }
        if (this.valorInferior.length >= this.longitudMaxima) return;

        this.valorInferior = this.valorInferior + numero;
    }

    imprimirDisplay(){
        this.textoValorInferior.innerText = this.valorInferior
        this.textoValorSuperior.innerText = this.valorSuperior
    }

    borrar(){
        this.valorInferior = this.valorInferior.slice(0,-1)

    }

    elegirOperacion(operador){

        if (this.valorInferior === '' && operador === '-') {
            this.agregarNumero(operador);
            this.imprimirDisplay();
            return;
        }
         if (this.valorInferior == '') return //si elijo un operador y la pantalla está vacia sale
         if (this.valorSuperior != ''){ //si todavía no elegí ningún operador
            this.realizarCalculo()
         }


         
         this.operador = operador
         this.valorSuperior = this.valorInferior
         this.valorInferior = ''


    }

    realizarCalculo(){
        let resultado
        let conversionValorSuperior = parseFloat(this.valorSuperior)
        let conversionValorInferior = parseFloat(this.valorInferior)

        /*Validación NaN*/

        if(isNaN(conversionValorSuperior) || isNaN(conversionValorInferior)) return


        /*Operaciones*/
        
        switch(this.operador){
            case '+':
                resultado = conversionValorSuperior + conversionValorInferior
            break
            case '-':
                resultado = conversionValorSuperior - conversionValorInferior
            break
            case '*':
                resultado = conversionValorSuperior * conversionValorInferior
            break
            case '/':
                resultado = conversionValorSuperior / conversionValorInferior
            break
            default: return
        }

        this.valorInferior = resultado
        this.operador = undefined
        this.valorSuperior = ''
    }

    limpiarPantalla(){
        this.valorInferior = ''
        this.valorSuperior = ''
        this.operador = ''
    }
}

const calculadora = new Calculadora (textoValorInferior, textoValorSuperior)

/*Escribir en pantalla (display)*/

botonNumero.forEach(boton => {
    boton.addEventListener('click', () => {
        calculadora.agregarNumero(boton.innerText)
        calculadora.imprimirDisplay()
    })
})

/*Borrar en pantalla (display)*/

botonDelete.addEventListener('click', () => {
    calculadora.borrar()
    calculadora.imprimirDisplay()
})

/*Elegir operador*/

botonOperador.forEach(boton => {
    boton.addEventListener('click', () => {
        calculadora.elegirOperacion(boton.innerText)
        calculadora.imprimirDisplay()
    })
})

/*Botón igual*/

botonIgual.addEventListener('click', () =>{
    calculadora.realizarCalculo()
    calculadora.imprimirDisplay()
})

/*Borrar todo*/

botonAllClear.addEventListener('click', () =>{
    calculadora.limpiarPantalla()
    calculadora.imprimirDisplay()
})


