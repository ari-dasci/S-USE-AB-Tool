-   [x] iconos edit, delete para vista "card proyecto"
-   [x] pasar escala de FAHP y compartir los valores de cada etiqueta linguistica de FAHP con inversos---------ok revisar \assets\fahp_values
-   [x] Pasar iconos de expertos y usuarios, imagen.-----------------------ok
-   [x] pasar iconos de roles, separados en png cada uno. -----------------------ok
-   [x] pesos de roles: cambiar a slider simple y escribir dominio. [cada slider va entre 0 y 1].
-   [x] generar links de invitación a expertos y a destinatarios. (backend).
-   [x] Creación de validación de formularios.
-   [x] Definir datos para creación de formulario.
-   [x] Definir formularios estándar.

Test NPS:

-   How likely is it that you would recommend this site to a friend or colleague?
-   Users responses (radio buttons): 0,1,2,3,4,5,6,7,8,9,10

Test SUS:
See \assets\sus_quiestinnaire.png
radio button for responses.

Usability test:
La prueba de usabilidad, creada por el rol coordinador debe pedir lo siguiente:

1. cantidad de tareas a realizar
   ejemplo 15
   para cada tarea agregar: Categoría (definida por el coordinador).
   Nombre de la tarea .
   Instrucciones de la tarea.
   Max_Time (cantidad en segundos)
   Finalmente, cada task respondida por los experts/destinataries, responden: 1) Success/Fail 2) Time needed 3) Se selecciona una respuesta del siguiente conjunto linguistico: Unsatisfy, A little satisfy, Indifferent, Satisfy, Very satisfy

Cada una de estas tareas se contesta por cada alternativa dada de alta en el proyecto.
Test Accesibility:
What level of accessibility does the website have, according to the web accessibility evaluation carried out?
responses: A, AA, AAA (radio button)

Definir usuarios expertos (SUS,NPS, UT, ACC) y destinatario(SUS,NPS, UT).

El wizard, debe mantener el nombre del paso que ya fue realizado. (ahorita mismo solo queda un check en azul)
El nombre de la columna donde se encuentra el checkbox en las alternatives, debe ser "Active/hide"
Cambiar "criterian" por "Criteria"
Cambiar slide de Expert/User a dos slides (1 expert y 1 user), y el rango es entre 0 y 100.

Regresar en -1 los pasos del wizard,
Set alternatives es paso 1.
Set roles es paso 2.1,
Set weigth es paso 2.1.
Set Users es paso 3

En la matriz de los peso de los criterios, cambiar "Ci" por "Consistency Index".
Agregar una nota al pie de pagina con el siguiente texto "The value for consistency index to be valid must be below 0.10."
Agregar "breadcum" para identificar la posicion actual en la pagina

En el apartado de roles, agregar los titulos de las columnas de cada discapacidad "See", "Touch", "Hear", "Speak"
