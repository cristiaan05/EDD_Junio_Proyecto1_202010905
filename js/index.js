$(document).ready(function () {
    $('.modal').modal();
    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $('.myreviews').carousel({
        numVisible: 7,
        shift: 55,
        padding: 55,
    });
    $('.slider').slider({ full_width: true });
});

function ocultarHome() {
    document.getElementById("home").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("admin").style.display = "none";
}

function mostrarHome() {
    document.getElementById("home").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("admin").style.display = "none";
}

function login(event) {
    event.preventDefault()
    usuario=document.getElementById("user").value
    password=document.getElementById("pass").value
    if (usuario=="Wilfred" && password=="123") {
        // alert('Te haz loggeado bien')
        document.getElementById("admin").style.display = "block";
        document.getElementById("login").style.display = "none";
        
    }
    else if (listaListas.buscarUsuario(usuario,password)) {
        document.getElementById("admin").style.display = "block";
        document.getElementById("login").style.display = "none";
    }
    else{
        alert("No se encontro el usuario")
    }
}
var listaListas;

// --------------------------------CODIGO---------LISTA DE LISTAS------------------------------------------------------------------------------
class NodoUsuario {
    constructor(dpi,nombreCompleto,nombreUsuario,correo,rol,password,telefono){
        this.dpi=dpi;
        this.nombreCompleto=nombreCompleto;
        this.nombreUsuario=nombreUsuario;
        this.correo=correo;
        this.rol=rol;
        this.password=password;
        this.telefono=telefono;
        this.siguiente=null;
        this.abajo=null;
    }
}

class NodoLibroUsuario{
    constructor(nombreLibro){
        this.nombreLibro=nombreLibro;
        this.siguiente=null;
    }

}

    class ListaUsuariosLibros{
    constructor(){
        this.primero=null;
        this.utlimo=null;
        this.size=0;
    }

    agregarUsuario(dpi,nombreCompleto,nombreUsuario,correo,rol,password,telefono){
        let nuevoUser=new NodoUsuario(dpi,nombreCompleto,nombreUsuario,correo,rol,password,telefono);
        if (this.primero==null) {
            this.primero = nuevoUser;
            this.primero.siguiente=this.primero;
            this.ultimo=this.primero;
            this.primero.anterior=this.ultimo;
            this.size++;
        }
        //HACE ESTO SI LA LISTA YA TIENE POR LO MENOS UN ELEMENTO
        else{
            this.ultimo.siguiente = nuevoUser;
            nuevoUser.anterior=this.ultimo;
            nuevoUser.siguiente = this.primero;
            this.ultimo = nuevoUser;
            this.primero.anterior=this.ultimo;
            this.size++;
        }
    }

    agregarLibro(usuario,nombreLibro){
        let tempUser=this.primero;
        while(tempUser!=null){
            if (tempUser.nombreUsuario==usuario) {
                let nuevoLibro=new NodoLibroUsuario(nombreLibro);
                let primerLibro=tempUser.abajo;
                tempUser.abajo=nuevoLibro;
                nuevoLibro.siguiente=primerLibro;
                break;
            }
            tempUser=tempUser.siguiente;
        }
        if (tempUser==null) {
            console.log("No existe el usuario")
        }
        
    }

    mostrarUsuarios(){
        let aux=this.primero;
        console.log("-------------USUARIOS------------");
        do{
            console.log(aux.nombreCompleto);
            aux=aux.siguiente;
        }
        while (aux!=this.primero);
    }

    mostrarLibrosUsuario(usuario){
        let aux=this.primero;
        do{
            if (aux.nombreUsuario==usuario) {
                console.log("----------USUARIO:  "+usuario+" ---------------");
                let auxLibro=aux.abajo;
                while(auxLibro!=null);{
                    console.log(auxLibro.nombreLibro);
                    auxLibro=auxLibro.siguiente;
                }
            }
        }
        while(aux!=this.primero)
    }

    buscarUsuario(usuario,password){
        let aux=this.primero;
        console.log(aux.nombreUsuario)
        do{
            if ((aux.nombreUsuario==usuario) && (aux.password==password)) {
                return aux;
            }
            aux=aux.siguiente;
        }while(aux!=this.primero)
    }
}


function listasL(e) {
    var archivo = e.target.files[0];
    console.log(archivo)
    if (!archivo) {
        return;
    }

    let lector = new FileReader();
    lector.onload = function(e) {
        let contenido = e.target.result;
        const usuarios = JSON.parse(contenido);
        listaListas= new ListaUsuariosLibros()
        for (const x in usuarios) {
            let user=usuarios[x]
            listaListas.agregarUsuario(user.dpi,user.nombre_completo,user.nombre_usuario,user.correo,user.rol,user.contrasenia,user.telefono);

        }
        listaListas.mostrarUsuarios()
    }
    
    lector.readAsText(archivo);
    
    alert('Ha cargado exitosamente los usuarios!');
}
document.getElementById("listasL").addEventListener("change", listasL, false);
// -------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------CODIGO MATRIZ ORTOGONAL, CARGAR LIBROS----------------------------------
function handleFiles(e) {
    console.log("hola")
    var archivo = e.target.files[0];
    console.log(archivo)
    if (!archivo) {
        return;
    }

    let lector = new FileReader();
    lector.onload = function(e) {
        let contenido = e.target.result;
        let matriz= new MatrizOrtogonal()
        const libros = JSON.parse(contenido);

        for (const x in libros) {
            let libro=libros[x]
            for (let x = 1; x < (3+1); x++) {
               for (let y = 1; y < (3+1); y++) {
                    if ((x==libro.fila)&&(y==libro.columna)) {
                        // console.log("libro insertado: "+libro.nombre_libro)
                        matriz.insertarMatriz(libro.isbn,libro.nombre_autor,libro.nombre_libro,libro.cantidad,libro.fila,libro.columna,libro.paginas,libro.categoria,x,y);
                    }else{
                        matriz.insertarMatriz("null","null","null","null","null","null","null","null",x,y);
                    }
                
               }
                
            }
            
            
            // console.log(pitza.tipo, pitza.forma, pitza.costo);
        }
        matriz.mostrarMatriz()
    }
    
    lector.readAsText(archivo);
    
    alert('You have successfully upload the file!');
}

document.getElementById("fileupload").addEventListener("change", handleFiles, false);
class NodoMatrizOrtogonal {
    constructor(isbn, nombreAutor, nombreLibro, cantidad, fila, columna, paginas, categoria) {
        this.isbn = isbn;
        this.nombreAutor = nombreAutor;
        this.nombreLibro = nombreLibro;
        this.cantidad = cantidad;
        this.fila = fila;
        this.columna = columna;
        this.paginas = paginas;
        this.categoria = categoria;
        this.arriba = null;
        this.abajo = null;
        this.siguiente = null;
        this.anterior = null;
    }

}

class MatrizOrtogonal {
    constructor() {
        this.primero = null;
        this.contador=0;
    }

    vacio(){
        return this.primero==null;
    }

    insertarMatriz(isbn,nombreAutor,nombreLibro,cantidad,fila,columna,paginas,categoria,posx,posy){
        // let nodoAux;
        // let nodoAux2;
        
        if (this.vacio()) {
            let nuevoNodo=new NodoMatrizOrtogonal(isbn,nombreAutor,nombreLibro,cantidad,fila,columna,paginas,categoria);
            console.log("Nodo creado: "+nuevoNodo.nombreLibro+"pos: "+posx,posy)
            this.primero=nuevoNodo;
            this.contador++;
        }else{
            let aux=this.primero;
            while (aux.abajo!=null) {
                aux=aux.abajo
            }
            if (this.contador!=fila) {
                this.contador++;
                let nuevoNodo=new NodoMatrizOrtogonal(isbn,nombreAutor,nombreLibro,cantidad,fila,columna,paginas,categoria);
                console.log("Nodo creado: "+nuevoNodo.nombreLibro+"pos: "+posx,posy)
                aux.abajo=nuevoNodo;
                nuevoNodo.arriba=aux;
            }else{
                while (aux.siguiente!=null) {
                    aux=aux.siguiente;
                }
                let nuevoNodo=new NodoMatrizOrtogonal(isbn,nombreAutor,nombreLibro,cantidad,fila,columna,paginas,categoria);
                console.log("Nodo creado: "+nuevoNodo.nombreLibro+"pos: "+posx,posy)
                aux.siguiente=nuevoNodo;
                nuevoNodo.anterior=aux;
                if (this.contador>1) {
                    let aux2=aux.arriba.siguiente;
                    aux2.abajo=nuevoNodo;
                    nuevoNodo.arriba=aux2
                }
            }
        }

        // for (let x = 0; x < sizeX; x++){
        //     for (let y = 0; y < sizeY; y++){
        //         let nuevoNodo= new NodoMatrizOrtogonal(isbn,nombreAutor,nombreLibro,cantidad,fila,columna,paginas,categoria);
        //         if (y==0) {
        //             if (this.primero==null) {
        //                 this.primero=nuevoNodo;
        //             }
        //             nodoAux=nuevoNodo;
        //             console.log(nodoAux)
        //         }else{
        //             nuevoNodo.anterior=nodoAux;
        //             nodoAux.siguiente=nuevoNodo;
        //             nodoAux=nuevoNodo;
        //         }
        //         if (x==0) {
        //             nuevoNodo.arriba=null;
        //             nodoAux=nuevoNodo;
        //         } else {
        //             nuevoNodo.arriba=nodoAux2;
        //             nodoAux2.abajo=nuevoNodo;
        //             nodoAux2=nodoAux2.siguiente;
        //         }
        //     }
        //     nodoAux2=this.primero;
        //     while (nodoAux2.abajo!=null) {
        //         nodoAux2=nodoAux2.abajo
        //     }
        // }
    }

    mostrarMatriz(){
        let aux=this.primero;
        let texto="";
        while ((aux.abajo!=null) |(aux.siguiente!=null)) {
            texto=texto+" "+aux.nombreLibro;
            if (aux.siguiente!=null) {
                aux=aux.siguiente;
            }else{
                texto=texto+"\n";
                if (aux.abajo!=null) {
                    aux=aux.abajo;
                    while (aux.anterior!=null) {
                        aux=aux.anterior;
                    }
                }
            }
        }
        texto=texto+" "+aux.nombreLibro;
        console.log(texto);
        return texto;
    //     if (this.primero!=null) {
    //         let temp=this.primero;
    //         while (temp!=null) {
    //             let aux=temp
    //             while (aux!=null) {
    //                 console.log("Pos: "+aux.nombreLibro);
    //                 aux=aux.siguiente;
    //             }
    //             temp=temp.abajo;
    //             // console.log("-------------SIGUIENTEE FILAAA-------------")
    //         }
    //     } else {
    //         console.log("MATRIZ VACIA")
    //     }
    // }
    }
}
//---------------------------------------------------------------------------------------------------------------------------------------