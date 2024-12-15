
// CODIGO QUE TIENE COMO FUNCIÓN ABRIR MODAL PARA AGREGAR NUEVO REGISTRO
const btnAdd = document.querySelector(".agregar"); //Capturamos botón agregar.
const ver = document.querySelector(".ver"); //capturamos div con la clase ver para abrir el modal


btnAdd.addEventListener('click', (e) =>{  // Agregamos evento para abrir el modal al dar click
    e.preventDefault(); //prevenimos que se recargue la página al presionar sobre el botón agregar
    ver.style.display = "flex"; // cambiamos 
    document.body.classList.add('modal-open');
})


//CODIGO PARA CERRAR MODAL CON EL BOTON CANCELAR
const cerrarModal = document.querySelector(".cerrar");
cerrarModal.addEventListener('click', (e)=>{ 
    ver.style.display = "none";
    document.body.classList.remove('modal-open');
})
//CODIGO PARA CERRAR MODAL CON EL BOTON/ICONO DE CERRAR
const cerrarModalWithX = document.querySelector(".close_modal");
cerrarModalWithX.addEventListener('click', (e)=>{
    ver.style.display = "none";
    document.body.classList.remove('modal-open');
})

document.querySelector('input[type="submit"].guardar').addEventListener('click', async function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    const form = document.getElementById('formulario'); // Selecciona el formulario
    const titulo = document.getElementById('titulo').value;
    const modulo = document.getElementById('modulo').value;
    const editorContent = tinymce.get('description-text').getContent({ format: 'text' });
    const video = document.getElementById('video').value;

    // Validar que los campos obligatorios estén llenos
    if (!titulo || !modulo || !editorContent) {
        alert('Por favor, llena todos los campos.');
        return;
    }

    // Extraer imágenes en base64
    const images = editorContent.match(/<img[^>]+src="data:image\/[^">]+"/g) || [];
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('modulo', modulo);
    formData.append('contenido', editorContent);
    formData.append('video', video);

    // Procesar imágenes base64
    for (let i = 0; i < images.length; i++) {
        const base64 = images[i].match(/src="([^"]+)"/)[1];
        const blob = await fetch(base64).then(res => res.blob());
        formData.append(`imagen_${i}`, blob, `imagen_${i}.png`);
    }

    /* Enviar datos al servidor
    fetch('guardar_datos.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        if (result.success){
            
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Registro guardado",
                    showConfirmButton: false,
                    timer: 1200
                });
            
            ver.style.display = 'none';
            setTimeout(() => location.reload(), 1500);
        }else{
            Swal.fire({
                title: '¡Error!',
                text: 'Ocurrió un problema al guardar los datos. Intenta de nuevo.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        }
        form.reset(); // limpia el formulario después de guardar
        //tinymce.get('description-text').setContent(''); // Limpia el editor TinyMCE
    
    });
    
});

document.addEventListener("DOMContentLoaded", () => {
    const tablaBody = document.querySelector("#tabla tbody");

    fetch('obtener_datos.php')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(item => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.title}</td>
                    <td>${item.description}</td>
                    <td>${item.categories}</td>
                    <td class="botones">
                        <box-icon name='edit-alt' type='solid' class="editar-btn"></box-icon>
                        <box-icon name='x-circle' class="eliminar-btn"></box-icon>                    
                    </td>
                `;
                tablaBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
        
        
});

*/
        
function abrirIcono() {
    const botonesEditar = document.querySelectorAll('.editar-btn'); // Selecciona todos los botones de editar

    botonesEditar.forEach(button => {
        button.addEventListener('click', (e) => {
            // Obtén la fila correspondiente
            const row = e.target.closest('tr');
            const id = row.cells[0].textContent;
            const titulo = row.cells[1].textContent;
            const description = row.cells[2].textContent;
            const category = row.cells[3].textContent;

            // Llena los campos del modal con los datos de la fila
            document.getElementById('id_editar').value = id; 
            document.getElementById('titulo_editar').value = titulo;
            document.getElementById('modulo_editar').value = category; // Asegúrate de que coincida con las opciones del select
            tinymce.get('description-text-edit').setContent(description);
            document.getElementById('video_youtube').value = ''; // Aquí puedes definir un valor por defecto o el de la fila si corresponde

            // Muestra el modal
            const abrirModal = document.querySelector('.open_editar');
            abrirModal.style.display = "block";
            document.body.classList.add('modal-open');
        });
    });
}
setTimeout(abrirIcono, 1000);
const cerrarModalEditar = document.querySelector('.btn_cerrar_editar');
cerrarModalEditar.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = document.querySelector('.open_editar'); // Selecciona el modal directamente
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
});

// Función para enviar los datos al servidor cuando el usuario haga clic en el botón "Guardar"
document.querySelector('.guardar_editar').addEventListener('click', async function (event) {
    event.preventDefault(); // Evita que se recargue la página

    const idEditar = document.getElementById('id_editar').value;
    const tituloEditar = document.getElementById('titulo_editar').value;
    const categoriaEditar = document.getElementById('modulo_editar').value;
    const editorContentEditar = tinymce.get('description-text-edit').getContent();
    const videoEditar = document.getElementById('video_youtube').value;

    // Validar que los campos obligatorios estén llenos
    if (!tituloEditar || !categoriaEditar || !editorContentEditar) {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Por favor, completa todos los campos obligatorios.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    // Crear FormData para enviar los datos al servidor
    const formData = new FormData();
    formData.append('id', idEditar);
    formData.append('titulo', tituloEditar);
    formData.append('categoria', categoriaEditar);
    formData.append('contenido', editorContentEditar);
    formData.append('video', videoEditar);
})
});
/*
    try {
        // Enviar datos al servidor
        const response = await fetch('editar_datos.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registro actualizado correctamente",
                showConfirmButton: false,
                timer: 1200
            });

            // Opcional: recargar la tabla o la página para reflejar los cambios
            setTimeout(() => location.reload(), 1500);
        } else {
            Swal.fire({
                title: '¡Error!',
                text: 'Ocurrió un problema al actualizar los datos. Intenta de nuevo.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            title: '¡Error!',
            text: 'Ocurrió un error al conectar con el servidor.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
        });
    }
});
*/


function Eliminar(){
    const Eliminar = document.querySelectorAll('.eliminar-btn'); // Selecciona solo el primer botón

    Eliminar.forEach(button => {
        button.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            const id = row.cells[0].textContent;

            const formData = new FormData();
            formData.append('id', id);

            Swal.fire({
                title: "¿Deseas Eliminar esta información?",
                text: "Las filas eliminadas no se pueden recuperar",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, Eliminar",
                cancelButtonText: "No, salir"
              }).then((result) => {
                if (result.isConfirmed) {
                    fetch('delete.php', {
                        method: 'POST',
                        body: formData
                })
                .then(response => response.text())
                .then((result) => {
                  Swal.fire({
                    title: "Eliminado!",
                    text: "La información ha sido eliminada",
                    icon: "success"
                  });
                row.remove();
              })
                }
              });
        });
    });
}
setTimeout(Eliminar, 1000);

const tabla = document.getElementById('tabla');
const modal = document.querySelector('.open_editar');
const tituloModal = document.querySelector('.h1modal')
const btnModalEditar = document.querySelectorAll('.guardar_editar')
const btnModalCerrarEditar = document.querySelectorAll('.btn_cerrar_editar')
function abrirModalVer() {
    const filas = document.querySelectorAll('tr'); // Selecciona todas las filas

    filas.forEach(row => {
        row.addEventListener('dblclick', (e) => {
            // Obtén los datos de la fila
            const id = row.cells[0].textContent; // Columna ID
            const titulo = row.cells[1].textContent; // Columna Título
            const descripcion = row.cells[2].textContent; // Columna Descripción
            const categoria = row.cells[3].textContent; // Columna Categoría
            const video = row.cells[4].textContent; // Columna Video (ajusta según tus columnas)

            // Rellena los campos del formulario en el modal
            document.getElementById('titulo_editar').value = titulo;
            document.getElementById('modulo_editar').value = categoria;
            tinymce.get('description-text-edit').setContent(descripcion); // Asumiendo que estás usando TinyMCE para la descripción
            document.getElementById('video_youtube').value = video;
            tituloModal.textContent = '';
            btnModalCerrarEditar.value = 'Salir';
            // Abre el modal
            document.querySelector('.open_editar').style.display = "block"; // Ajusta la clase según tu HTML
            btnModalEditar.style.display = "none";


            // Asegúrate de que los campos no sean editables (por si alguno es editable)
            const inputs = document.querySelectorAll('#formulario_edit input, #formulario_edit textarea');
            inputs.forEach(input => input.setAttribute('disabled', true)); // Deshabilita los campos
        });
    });
}


setTimeout(abrirModalVer, 1500);