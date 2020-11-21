//esta clase representa cualquier input

class Field {
    errors: string[];
    input: HTMLInputElement;
  
    //ese input lo pasamos en este constructor
    constructor(input: HTMLInputElement) {
      this.input = input;
      this.errors = [];
  
      let errorMessage = document.createElement('p');//Es un elemento de parrafo que añadimos en el constructor
      errorMessage.className = 'text-danger';
      this.input.parentNode.insertBefore(errorMessage, this.input.nextSibling);//le añadimos como pariente al input y esto esta sucediendo dinamicamente en el costructor
  
      //lo que vamos hacer es que cada vez que le cambiemos el valor al unput vamos a validar
      this.input.addEventListener('input', () => {
        this.errors = [];
        this.validate();//si esta validacion da error lo va añadir en el arreglo de arriba
        errorMessage.innerText = this.errors[0] || '';//si es que existe algun error lo vamos a mandar errorMessage para que lo muestre
      });
    }
  
    validate() {}
  }
  //funcion decorator
  function RequiredFieldDecorator(field: Field): Field {//la funcion requiere un campo y va devolver un campo
    let validate = field.validate;//queremos guardar la funcion original de validacion
  
   
    //queremos unca copia para extender la validacion
    field.validate = function() {
      validate();//porque no sabe que ha pasado con field antes de que pasara porque talvez otro decorador ya haya hecho la misma tecnica en ese caso es de hacer que valide primero lo otro y luego pasa por lo demas
      let value = field.input.value;//quiero obtener el valor para validarlo
      if (!value) {//si no exixte hay un error 
        field.errors.push('Requerido');//mandamos el mensaje de que es requerido
      }
    };
  
    return field;//retorna un campo
  }
  

  //vamos a validar que este input sea un email
  function EmailFieldDecorator(field: Field): Field {//funcion que recibe un campo y devuelve otro campo
    let validate = field.validate;
  
    field.validate = function() {
      validate();//lo mismo como no sabemos si ya paso por otro decorador lo llamamos para que añada las caracteristicas y luego pasa con lo siguiente
      let value = field.input.value;//obtenemos el valor
  
      if (value.indexOf('@') === -1) {//con indexOf buscamos haber si en la cadena hay una arroba si es identico a -1 es porque no lo encontro
        field.errors.push('Debe ser un email');//le mandamos un mensaje de error 
      }
    };
  
    return field;//retorna el campo
  }
  
  //hacemos la instancia de la clase
  let field = new Field(document.querySelector('#email'));
  //el orden es importante debe ir primero lo de requerido
  field = RequiredFieldDecorator(field);//aqui estamos decorando esa instancia
  field = EmailFieldDecorator(field);//aqui estamos decorando esa instanca
  