document.addEventListener('DOMContentLoaded', function(){

    // Crar el Div del input
    const divCc = document.createElement('div');
    divCc.classList.add('flex', 'flex-col', 'space-y-2');

    // Crear el label para CC
    const labelCc = document.createElement('label');
    labelCc.setAttribute('for', 'cc');
    labelCc.classList.add('font-regular', 'font-medium');
    labelCc.innerHTML = '<p>CC: <span class="opacity-50">(Opcional)<span/><p/>';

    // Crear el input para CC
    const cc = document.createElement('input');
    cc.setAttribute('id', 'cc');
    cc.type = 'email';
    cc.setAttribute('name', 'cc');
    cc.placeholder = 'Email copia, ej: py@empresa.com';
    cc.classList.add('border', 'border-gray-300', 'px-3', 'py-2', 'rounded-lg');

    // Agregando el input y label al div
    divCc.appendChild(labelCc);
    divCc.appendChild(cc);
    

    const email = {
        email: '',
        asunto: '',
        mensaje: '',
    };

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    // Insertando el divCc
    formulario.insertBefore(divCc, formulario.children[1]);

    const inputCopia = document.querySelector('#cc');


    // Asignar eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    inputCopia.addEventListener('input', validarCc);
    


    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();
       
        // Reiniciar el objeto
        resetFormulario();
    })

    function validar(e) {
        if(e.target.value.trim() === ''){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        };

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        };

        limpiarAlerta(e.target.parentElement);

        // Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        
        // Comprobar el objeto de email
        comprobarEmail();
    };


    // Alerta
    function mostrarAlerta(mensaje, referencia){

        limpiarAlerta(referencia);

        // Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')
        
        // Inyectar el error al formulario
        referencia.appendChild(error);
    };

    function limpiarAlerta(referencia){
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');

        if(alerta){
            alerta.remove();
        };
    };

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    };

    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;  
            return;
        };

        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    };

    function enviarEmail(e){
        e.preventDefault();
        
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');   
            
            resetFormulario();

            // Crear una alerta
            const alertaExito = document.createElement('P');

            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10',
            'font-bold', 'text-sm', 'uppercase');

            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    };

    function resetFormulario(){
        limpiarAlerta(inputEmail.parentElement);
        limpiarAlerta(inputAsunto.parentElement);
        limpiarAlerta(inputMensaje.parentElement);
        limpiarAlerta(inputCopia.parentElement);

        // Reiniciar el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';


        formulario.reset();
        comprobarEmail();
    };

    function validarCc(e){
        email[e.target.name] = e.target.value.trim().toLowerCase();

        if(!validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
        }else{
            limpiarAlerta(e.target.parentElement);
            comprobarEmail();
        };

        if(e.target.value === ''){
            delete email.cc;
            limpiarAlerta(e.target.parentElement);
            comprobarEmail();
            return;
        };
    };
});

