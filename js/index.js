// $(document).ready(function () {
//     $('.modal').modal();
//     $('.sidenav').sidenav();
//     $('.parallax').parallax();
//     $('.myreviews').carousel({
//         numVisible: 7,
//         shift: 55,
//         padding: 55,
//     });
//     $('.slider').slider({ full_width: true });
// });

function ocultarHome() {
    document.getElementById("home").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("admin").style.display = "none";
    document.getElementById("usuario").style.display = "none";
}

function mostrarHome() {
    document.getElementById("home").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("admin").style.display = "none";
    document.getElementById("usuario").style.display = "none";
    localStorage.removeItem("usuario");
}

function comprarLibro(event){
    event.preventDefault()
    let nombreUsuairo=localStorage.getItem("usuario");
    let libro=document.getElementById("selectMenu").value;
    let cantidad=document.getElementById("cantidad").value;
    // console.log(,libro);
    
    if (listaSimpLibros.cantidadLibro(libro)>=cantidad) {
        listaListas.agregarLibro(JSON.parse(nombreUsuairo),libro,cantidad);
    }else if (listaSimpLibros.cantidadLibro(libro)<cantidad) {
        listaListas.agregarLibro(JSON.parse(nombreUsuairo),libro,cantidad);
        let cola=new Cola();
        cola.encolar(JSON.parse(nombreUsuairo),libro,cantidad);
    }

}

function login(event) {
    event.preventDefault()
    usuario=document.getElementById("user").value
    password=document.getElementById("pass").value
    
    if (usuario=="Wilfred" && password=="123") {
        // alert('Te haz loggeado bien')
        localStorage.setItem("usuario",JSON.stringify(usuario))
        document.getElementById("admin").style.display = "block";
        document.getElementById("login").style.display = "none";
        graficaLista();
    }
    //SE UTILIZA LA POSICOIN [0], PORQUE EL RETURN DE LA FUNCION BUSCARUSUARIO RETORNA 2 VALORES DISTITNTOS
    else if (listaListas.buscarUsuario(usuario,password)[0]=="admin") {
        localStorage.removeItem("usuario");
        localStorage.setItem("usuario",JSON.stringify(listaListas.buscarUsuario(usuario,password)[1]))
        document.getElementById("admin").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("usuario").style.display = "none";
        graficaLista();
    }
    else if (listaListas.buscarUsuario(usuario,password)[0]=="user") {
        localStorage.removeItem("usuario");
        localStorage.setItem("usuario",JSON.stringify(listaListas.buscarUsuario(usuario,password)[1]))
        document.getElementById("usuario").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("admin").style.display = "none";
    }
    else{
        alert("No se encontro el usuario")
    }
}

function cargarLibros() {
    listaSimpLibros.mostrarLibros();
}

function graficaLista() {
    let nombreUsuairo=localStorage.getItem("usuario");
    listaListas.mostrarLibrosUsuario(JSON.parse(nombreUsuairo));
}
var listaListas;
var listaSimpLibros;
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
        this.sizeLibros=0;
        this.siguiente=null;
        this.abajo=null;
    }
}

class NodoLibroUsuario{
    constructor(nombreLibro,cantidad){
        this.nombreLibro=nombreLibro;
        this.cantidad=cantidad;
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
        let nuevoLib=new NodoUsuario(dpi,nombreCompleto,nombreUsuario,correo,rol,password,telefono);
        if (this.primero==null) {
            this.primero = nuevoLib;
            this.primero.siguiente=this.primero;
            this.ultimo=this.primero;
            this.primero.anterior=this.ultimo;
            this.size++;
        }
        //HACE ESTO SI LA LISTA YA TIENE POR LO MENOS UN ELEMENTO
        else{
            this.ultimo.siguiente = nuevoLib;
            nuevoLib.anterior=this.ultimo;
            nuevoLib.siguiente = this.primero;
            this.ultimo = nuevoLib;
            this.primero.anterior=this.ultimo;
            this.size++;
        }
    }

    agregarLibro(usuario,nombreLibro,cantidad){
        let tempUser=this.primero;
        do{
            console.log("entre aqui")
            if (tempUser.nombreUsuario==usuario) {
                let nuevoLibro=new NodoLibroUsuario(nombreLibro,cantidad);
                let primerLibro=tempUser.abajo;
                tempUser.abajo=nuevoLibro;
                nuevoLibro.siguiente=primerLibro;
                tempUser.sizeLibros++;
                alert('Libro Comprado');
                console.log("Libro: "+nuevoLibro.nombreLibro+" a usuario: "+usuario+" agregado")
                break;
            }
            tempUser=tempUser.siguiente;
        }while(tempUser!=this.primero);
        // this.mostrarLibrosUsuario(usuario);
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
        let contador=0;
        let uniones=""
        let alineacion=""
        var codigodotL=""
        var codigodot = 'digraph L{ node[shape=box fillcolor="#FFEDBB"style=filled] subgraph cluster_p{label ="Lista de Listas" bgcolor="red" edge[dir="forward"]';
        do{
            codigodot=codigodot+'nodo'+contador+'[label="'+aux.nombreUsuario+'",fillcolor=white,group=0]'
            codigodotL+= this.segundaC('nodo'+contador,aux.nombreUsuario)
            console.log("dot--"+codigodotL)
            contador++;
            if (aux.nombreUsuario==usuario) {
                console.log("----------USUARIO:  "+usuario+" ---------------");
                var auxLibro=aux.abajo;
                do{
                    if (auxLibro==null) {
                        return
                    }
                    console.log(auxLibro.nombreLibro);
                    auxLibro=auxLibro.siguiente;
                }while(auxLibro!=aux.abajo);
                return
            }
            aux=aux.siguiente;
            if (aux==this.primero) {
                console.log("No se encontro el libro")
            }
        }
        while(aux!=this.primero)
        alineacion="{rank=same;"
        for (let index = 0; index < this.size-1; index++) {
            uniones=uniones+'nodo'+index+'->'+'nodo'+(index+1)+'[dir=forward color="black"]'
            if (index==(this.size-2)) {
                alineacion+='nodo'+index+',';
                alineacion+='nodo'+(index+1);
            }else{
                alineacion+='nodo'+index+','
            }
            
        }
        alineacion+='}'
        uniones+='nodo'+(this.size-1)+'->nodo0'
        codigodot=codigodot+uniones
        codigodot+=alineacion
        codigodot+=codigodotL
        codigodot=codigodot+'}}'
        console.log(codigodot)
        d3.select("#grafica").graphviz()
            .width(500)
            .height(500)
            .renderDot(codigodot);
        this.segundaC()
    }


    segundaC(cabeza,nombre){
        let aux=this.primero;
        let contador=0;
        let retornar=""
        do{
            console.log("-----USUARIO: "+aux.nombreUsuario);
            if (aux.nombreUsuario==nombre) {
                retornar+=this.mostrarH(aux,cabeza)
            }
            aux=aux.siguiente;
        }
        while(aux!=this.primero)
        return retornar
    }
    
    mostrarH(usuario,cabeza){
        let libU=usuario.abajo;
        var codigodotH="";
        let contador=0;
        let uniones=""
        while(libU!=null){
            codigodotH+='nodu'+libU.nombreLibro+cabeza+'[label="'+libU.nombreLibro+'",fillcolor=white,group=0]'
            console.log("---SUS LIBROS COMPRADOS: "+libU.nombreLibro);
            libU=libU.siguiente;
        }       
        let libUs=usuario.abajo;
        while(libUs!=null){
            let aux=libUs.siguiente
            if (aux!=null) {
                uniones=uniones+'nodu'+libUs.nombreLibro+cabeza+'->'+'nodu'+aux.nombreLibro+cabeza+'[dir=forward color="black"]'    
            }
            
            // codigodotH+='nodu'+libU.nombreLibro+'[label="'+libU.nombreLibro+'",fillcolor=white,group=0]'
            // console.log("---SUS LIBROS COMPRADOS: "+libU.nombreLibro);
            libUs=libUs.siguiente;
            // contador++;
        }
        let primero=usuario.abajo;
        if (primero!=null) {
            uniones+=cabeza+'->'+'nodu'+primero.nombreLibro+cabeza+'\n'    
        }
        
        // for (let index = 0; index < usuario.sizeLibros-1; index++) {
        //     uniones=uniones+'nodu'+index+'->'+'nodu'+(index+1)+'[dir=forward color="black"]'
        //     if (index==(this.size-2)) {
        //         alineacion+='nodu'+index+',';
        //         alineacion+='nodu'+(index+1);
        //     }else{
        //         alineacion+='nodu'+index+','
        //     }
            
        // }
        codigodotH=codigodotH+uniones
        console.log(codigodotH);
        return codigodotH 
        // codigodotH=codigodotH+'}}'
        
    }

    // var auxLibro=aux.abajo;
    //         codigodotL=codigodotL+'nodo'+contador+usuario+'[label="'+auxLibro.nombreLibro+'",fillcolor=white,group=0]'
    //         auxLibro=auxLibro.siguiente;

    // graficaListaListas(){
    //     let aux=this.primero;
    //     do{
    //         if (aux.nombreUsuario==usuario) {
    //             console.log("----------USUARIO:  "+usuario+" ---------------");
    //             var auxLibro=aux.abajo;
    //             do{
    //                 if (auxLibro==null) {
    //                     return
    //                 }
    //                 console.log(auxLibro.nombreLibro);
    //                 auxLibro=auxLibro.siguiente;
    //             }while(auxLibro!=aux.abajo);
    //             return
    //         }
    //         aux=aux.siguiente;
    //         if (aux==this.primero) {
    //             console.log("No se encontro el libro")
    //         }
    //     }
    //     while(aux!=this.primero)
    // }

    buscarUsuario(usuario,password){
        let aux=this.primero;
        // console.log(aux.nombreUsuario)
        do{
            if ((aux.nombreUsuario==usuario) && (aux.password==password) && (aux.rol=="Administrador")) {
                return ["admin",aux.nombreUsuario];
            }
            else if((aux.nombreUsuario==usuario) && (aux.password==password) && (aux.rol=="Usuario")){
                return ["user",aux.nombreUsuario];
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

//--------------------------------------NODO LISTA SIMPLE LIBROS------------------------------------------------------------
class NodoLib{
    constructor(isbn, nombreAutor, nombreLibro, cantidad, fila, columna, paginas, categoria) {
        this.isbn = isbn;
        this.nombreAutor = nombreAutor;
        this.nombreLibro = nombreLibro;
        this.cantidad = cantidad;
        this.fila = fila;
        this.columna = columna;
        this.paginas = paginas;
        this.categoria = categoria;
        this.siguiente = null;
    }

}

class ListaLib{
    constructor(){
        this.primero=null;
        this.size=0;
    }
    agregarLibro(isbn, nombreAutor, nombreLibro, cantidad, fila, columna, paginas, categoria){
        let nuevoLib=new NodoLib(isbn, nombreAutor, nombreLibro, cantidad, fila, columna, paginas, categoria);
        if (this.primero==null) {
            this.primero = nuevoLib;
            this.size++;
        }
        //HACE ESTO SI LA LISTA YA TIENE POR LO MENOS UN ELEMENTO
        else{
            let aux=this.primero;
            while (aux.siguiente!=null) {
                aux=aux.siguiente;
            }
            aux.siguiente=nuevoLib
        }
        return nuevoLib;
    }

    cantidadLibro(nombreLibro){
        let temp=this.primero;
        while (temp!=null) {
            if (temp.nombreLibro==nombreLibro) {
                return temp.cantidad;
            }
            temp=temp.siguiente;
        }
    }

    mostrarLibros(){
        let aux=this.primero;
        var select=document.getElementById("selectMenu")
        select.innerHTML='<option selected>Escoge el Nombre del Libro</option>'
        while(aux!=null){
            select.innerHTML+='<option value="'+aux.nombreLibro+'">'+aux.nombreLibro+'</option>'
            aux=aux.siguiente;
        }
        return "ok"
    }

}
//-------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------CODIGO MATRIZ ORTOGONAL, CARGAR LIBROS----------------------------------
function handleFiles(e) {
    var archivo = e.target.files[0];
    console.log(archivo)
    if (!archivo) {
        return;
    }

    let lector = new FileReader();
    lector.onload = function(e) {
        let contenido = e.target.result;
        let matriz= new MatrizOrtogonal();
        let matrizD=new ListaMatriz();
        listaSimpLibros=new ListaLib();
        const libros = JSON.parse(contenido);
        matriz.llenarmatrizortogonal();
        for (const x in libros) {
            let libro=libros[x]
            
            listaSimpLibros.agregarLibro(libro.isbn,libro.nombre_autor,libro.nombre_libro,libro.cantidad,libro.fila,libro.columna,libro.paginas,libro.categoria);
            // for (let x = 1; x < (3+1); x++) {
            //    for (let y = 1; y < (3+1); y++) {
            //         if ((x==libro.fila)&&(y==libro.columna)) {
                        // console.log("libro insertado: "+libro.nombre_libro)
            matrizD.insertar(libro.fila,libro.columna,libro.isbn,libro.nombre_autor,libro.nombre_libro,libro.cantidad,libro.fila,libro.columna,libro.paginas,libro.categoria)
            matriz.insercionmatriz(libro.isbn,libro.nombre_autor,libro.nombre_libro,libro.cantidad,libro.fila,libro.columna,libro.paginas,libro.categoria);
                        // matriz.insertarMatriz(libro.isbn,libro.nombre_autor,libro.nombre_libro,libro.cantidad,libro.fila,libro.columna,libro.paginas,libro.categoria,x,y);
            //         }else{
            //             matriz.insertarMatriz("null","null","null","null","null","null","null","null",x,y);
            //         }
                
            //    }
                
            // }
            
            
            // console.log(pitza.tipo, pitza.forma, pitza.costo);
        }
        matriz.mostrarmatriz()
        matrizD.mostrarMatriz()
        matrizD.generarGraphviz()
        listaSimpLibros.mostrarLibros();
    }
    
    lector.readAsText(archivo);
    
    alert('You have successfully upload the file!');
}

document.getElementById("fileupload").addEventListener("change", handleFiles, false);
class NodoMatrizOrtogonal {
    constructor(isbn, nombreAutor, nombreLibro, cantidad, fila, columna, paginas, categoria,x,y) {
        this.isbn = isbn;
        this.nombreAutor = nombreAutor;
        this.nombreLibro = nombreLibro;
        this.cantidad = cantidad;
        this.fila = fila;
        this.columna = columna;
        this.paginas = paginas;
        this.categoria = categoria;
        this.x=x;
        this.y=y;
        this.abajo = null;
        this.siguiente = null;
    }
}

class ListaEncabezado{
    constructor(){
        this.primero = null
        this.ultimo = null
    }
    insertarlista(isbn, nombreAutor, nombreLibro, cantidad, fila, columna, paginas, categoria,x){
        var temp = new NodoMatrizOrtogonal(isbn, nombreAutor, nombreLibro, cantidad, fila, columna, paginas, categoria,x,0);
        if(this.primero == null){
            this.primero = temp;
            this.ultimo = temp;
        }else{
            this.ultimo.siguiente = temp;
            this.ultimo = temp;
        }

        var aux = this.ultimo
        for (let posy = 24; posy >= 0; posy--) {
           var nuevonodo = new NodoMatrizOrtogonal(isbn, nombreAutor, nombreLibro, cantidad, fila, columna, paginas, categoria,x,posy);
           var auxanterior = this.ultimo.abajo
           aux.abajo = nuevonodo
           nuevonodo.abajo = auxanterior
        }
    }

    buscarlista(libro){
        var temporal = this.primero
        while(temporal != null){
            if(temporal.x == libro){
                return temporal;
            }
            temporal =temporal.siguiente;
        }
        return null
    }
}

class MatrizOrtogonal{
    constructor(){
        this.listahorizontal = new ListaEncabezado();
    }

    llenarmatrizortogonal(){
        for (let index = 0; index < 25; index++) {
            this.listahorizontal.insertarlista("", "", "", "", "", "", "","",index)
        }
    }
    mostrarmatriz(){
        var posx = 0
        var dotMatriz='digraph L{\n node[shape=box fillcolor="#FFEDBB" style=filled]\n subgraph cluster_p{ \n label ="Libros de Fantasia"\n bgcolor="#398D9C"\n edge[dir="both"] \n'
        let uniones=""
        var cabecerax = this.listahorizontal.buscarlista(posx)
        while(cabecerax != null){
            let alineacion="{rank=same;"
            // console.log("**************** x="+posx+"******************")
            var numy = 0
            var tempy = cabecerax.abajo
            while(tempy != null){
                // console.log(tempy)
                dotMatriz+='nodo'+tempy.x+'_'+tempy.y+'[label="'+tempy.nombreLibro+'",fillcolor=white,group=0] \n'
                // console.log(tempy.nombreLibro+"("+tempy.x+","+tempy.y+")")
                if (tempy.abajo!=null) {
                    let auxUnion=tempy.abajo
                    uniones+='nodo'+tempy.x+'_'+tempy.y+'->'+'nodo'+auxUnion.x+'_'+auxUnion.y+'[dir=both color="black"] \n'
                }
                if (tempy.abajo==null) {
                    alineacion+='nodo'+tempy.x+'_'+tempy.y
                }else{
                    alineacion+='nodo'+tempy.x+'_'+tempy.y+','
                }
                tempy = tempy.abajo
                if (cabecerax.siguiente!=null) {
                    uniones+='nodo'+posx+'_'+numy+'->'+'nodo'+(posx+1)+'_'+numy+'[dir=both color="black"] \n';
                    // console.log("nodo"+posx+'_'+numy+"-->"+'nodo'+(posx+1)+'_'+numy);
                }
                numy++
            }
            posx++
            dotMatriz+=alineacion+'}\n'
            cabecerax = cabecerax.siguiente
        }
        dotMatriz+=uniones
        dotMatriz+='}}'
        // console.log(dotMatriz)
        d3.select("#matriz").graphviz()
            .width(1500)
            .height(1500)
            .renderDot(dotMatriz);
    }
    insercionmatriz(isbn, nombreAutor, nombreLibro, cantidad, fila, columna, paginas, categoria){
        var temporalx = this.listahorizontal.buscarlista(fila)
        var temporaly = temporalx.abajo
        while(temporaly != null){
            if(temporaly.y == columna){
                temporaly.isbn=isbn;
                temporaly.nombreAutor=nombreAutor;
                temporaly.nombreLibro=nombreLibro;
                temporaly.cantidad=cantidad;
                temporaly.paginas=paginas;
                temporaly.categoria=categoria;
                return
            }
            temporaly = temporaly.abajo
        }
    }

}

// class MatrizOrtogonal {
//     constructor() {
//         this.primero = null;
//         this.contador=0;
//     }

//     vacio(){
//         return this.primero==null;
//     }

//     insertarMatriz(isbn,nombreAutor,nombreLibro,cantidad,fila,columna,paginas,categoria,posx,posy){
//         // let nodoAux;
//         // let nodoAux2;
        
//         if (this.vacio()) {
//             let nuevoNodo=new NodoMatrizOrtogonal(isbn,nombreAutor,nombreLibro,cantidad,fila,columna,paginas,categoria);
//             console.log("Nodo creado: "+nuevoNodo.nombreLibro+"pos: "+posx,posy)
//             this.primero=nuevoNodo;
//             this.contador++;
//         }else{
//             let aux=this.primero;
//             while (aux.abajo!=null) {
//                 aux=aux.abajo
//             }
//             if (this.contador!=fila) {
//                 this.contador++;
//                 let nuevoNodo=new NodoMatrizOrtogonal(isbn,nombreAutor,nombreLibro,cantidad,fila,columna,paginas,categoria);
//                 console.log("Nodo creado: "+nuevoNodo.nombreLibro+"pos: "+posx,posy)
//                 aux.abajo=nuevoNodo;
//                 nuevoNodo.arriba=aux;
//             }else{
//                 while (aux.siguiente!=null) {
//                     aux=aux.siguiente;
//                 }
//                 let nuevoNodo=new NodoMatrizOrtogonal(isbn,nombreAutor,nombreLibro,cantidad,fila,columna,paginas,categoria);
//                 console.log("Nodo creado: "+nuevoNodo.nombreLibro+"pos: "+posx,posy)
//                 aux.siguiente=nuevoNodo;
//                 nuevoNodo.anterior=aux;
//                 if (this.contador>1) {
//                     let aux2=aux.arriba.siguiente;
//                     aux2.abajo=nuevoNodo;
//                     nuevoNodo.arriba=aux2
//                 }
//             }
//         }

//         // for (let x = 0; x < sizeX; x++){
//         //     for (let y = 0; y < sizeY; y++){
//         //         let nuevoNodo= new NodoMatrizOrtogonal(isbn,nombreAutor,nombreLibro,cantidad,fila,columna,paginas,categoria);
//         //         if (y==0) {
//         //             if (this.primero==null) {
//         //                 this.primero=nuevoNodo;
//         //             }
//         //             nodoAux=nuevoNodo;
//         //             console.log(nodoAux)
//         //         }else{
//         //             nuevoNodo.anterior=nodoAux;
//         //             nodoAux.siguiente=nuevoNodo;
//         //             nodoAux=nuevoNodo;
//         //         }
//         //         if (x==0) {
//         //             nuevoNodo.arriba=null;
//         //             nodoAux=nuevoNodo;
//         //         } else {
//         //             nuevoNodo.arriba=nodoAux2;
//         //             nodoAux2.abajo=nuevoNodo;
//         //             nodoAux2=nodoAux2.siguiente;
//         //         }
//         //     }
//         //     nodoAux2=this.primero;
//         //     while (nodoAux2.abajo!=null) {
//         //         nodoAux2=nodoAux2.abajo
//         //     }
//         // }
//     }

    // mostrarMatriz(){
    //     let aux=this.primero;
    //     let texto="";
    //     while ((aux.abajo!=null) |(aux.siguiente!=null)) {
    //         texto=texto+" "+aux.nombreLibro;
    //         if (aux.siguiente!=null) {
    //             aux=aux.siguiente;
    //         }else{
    //             texto=texto+"\n";
    //             if (aux.abajo!=null) {
    //                 aux=aux.abajo;
    //                 while (aux.anterior!=null) {
    //                     aux=aux.anterior;
    //                 }
    //             }
    //         }
    //     }
    //     texto=texto+" "+aux.nombreLibro;
    //     console.log(texto);
    //     return texto;
    // //     if (this.primero!=null) {
    // //         let temp=this.primero;
    // //         while (temp!=null) {
    // //             let aux=temp
    // //             while (aux!=null) {
    // //                 console.log("Pos: "+aux.nombreLibro);
    // //                 aux=aux.siguiente;
    // //             }
    // //             temp=temp.abajo;
    // //             // console.log("-------------SIGUIENTEE FILAAA-------------")
    // //         }
    // //     } else {
    // //         console.log("MATRIZ VACIA")
    // //     }
    // // }
    // }
// }
//---------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------MATRIZ DISPERSA PARA LIBROS THRILLER-------------------------------------------------
class NodoCabezera{
    constructor(id){
        this.id=id;
        this.siguiente=null;
        this.anterior=null;
        this.acceso=null;
    }

    getAcceso(){
        return this.acceso;
    }

    setAcceso(nuevoAcceso){
        this.acceso=nuevoAcceso;
    }
}

class NodoMatriz{
    constructor(isbn, nombreAutor, nombreLibro, cantidad, fila, columna, paginas, categoria,x,y){
        this.isbn=isbn;
        this.nombreAutor=nombreAutor;
        this.nombreLibro=nombreLibro;
        this.cantidad=cantidad;
        this.fila=fila;
        this.columna=columna;
        this.paginas=paginas;
        this.categoria=categoria;
        this.coordenadaX=x;
        this.coordenadaY=y;
        this.arriba=null;
        this.abajo=null;
        this.derecha=null;
        this.izquierda=null;
    }

    setArriba(arriba){
        this.arriba=arriba;
    }

    getArriba(){
        return this.arriba;
    }
    setAbajo(abajo){
        this.abajo=abajo;
    }
    getAbajo(){
        return this.abajo;
    }
    setDerecha(derecha){
        this.derecha=derecha;
    }
    getDerecha(){
        return this.derecha;
    }
    setIzquierda(izquierda){
        this.izquierda=izquierda;
    }
    getIzquierda(){
        return this.izquierda;
    }
}

class ListaCabeceras{
    constructor(tipo){
        this.primero=null;
        this.ultimo=null;
        this.tipo=tipo;
        this.size=0;
    }

    insertarNodoCabecera(nuevoNodoC){
        this.size++;
        if (this.primero==null) {
            this.primero=nuevoNodoC;
            this.ultimo=nuevoNodoC
        }else{
            // console.log(nuevoNodoC)
            //verificamos si esta en orden 
            if (parseInt(nuevoNodoC.id)<parseInt(this.primero.id)) {
                nuevoNodoC.siguiente=this.primero;
                this.primero.anterior=nuevoNodoC;
                this.primero=nuevoNodoC
            }
            else if (parseInt(nuevoNodoC.id)>parseInt(this.ultimo.id)) {
                this.ultimo.siguiente=nuevoNodoC;
                nuevoNodoC.anterior=this.ultimo;
                this.ultimo=nuevoNodoC;
            }else{
                let temp=this.primero;
                while (temp!=null) {
                    if (parseInt(nuevoNodoC.id)<parseInt(temp.id)) {
                        nuevoNodoC.siguiente=temp;
                        nuevoNodoC.anterior=temp.anterior;
                        temp.anterior.siguiente=nuevoNodoC;
                        temp.anterior=nuevoNodoC;
                        break;
                    }else if (parseInt(nuevoNodoC.id)>parseInt(temp.id)) {
                        temp=temp.siguiente;
                    }else{
                        break;
                    }
                }
            }
        }
    }

    mostrarCabeceras(){
        temp=this.primero;
        while (temp!=null) {
            console.log('Cabecera'+this.tipo+temp.id)
        }
    }

    getCabecera(id){
        let temp=this.primero;
        while (temp!=null) {
            if (id==temp.id) {
                return temp;
            }
            temp=temp.siguiente;
        }
        return null
    }
    getCabeceraXFila(id){
        let temp=this.primero;
        while (temp!=null) {
            if (id==temp.id) {
                return temp;
            }
            temp=temp.siguiente;
        }
        return null;
    }
}

class ListaMatriz{
    constructor(){
        this.capa=0
        this.filas=new ListaCabeceras('fila');
        this.columnas=new ListaCabeceras('columna');
        this.inicio=0;
    }

    insertar(posx,posy,isbn, nombreAutor, nombreLibro, cantidad, fila, columna, paginas, categoria){
        let nuevaCelda=new NodoMatriz(isbn,nombreAutor,nombreLibro,cantidad,fila,columna,paginas,categoria,posx,posy);
        this.inicio=nuevaCelda;

        //buscar si existen las cabeceras en la matriz;
        let nodoX=this.filas.getCabecera(posx);
        let nodoY=this.columnas.getCabecera(posy);

        //comprobamos que la cabecera fila posX exista
        if (nodoX==null) {
            nodoX=new NodoCabezera(posx); //si nodox es nulo quiere decir que no existe cabecera fila posx
            this.filas.insertarNodoCabecera(nodoX);
        }
        if (nodoY==null) {
            nodoY=new NodoCabezera(posy);
            //si nodo_Y es nulo, quiere decir que no existe  columna pos_y
            this.columnas.insertarNodoCabecera(nodoY);
        }
        // insertar nueva celda en fila
        if (nodoX.getAcceso()==null) {
            nodoX.setAcceso(nuevaCelda)
        }else{
            if (parseInt(nuevaCelda.coordenadaY)<parseInt(nodoX.getAcceso().coordenadaY)) {
                nuevaCelda.setDerecha(nodoX.getAcceso());
                nodoX.getAcceso().setIzquierda(nuevaCelda);
                nodoX.setAcceso(nuevaCelda);
            }else{
                //de no cumplirse debemos movernos de izquierda a derecha buscando donde posicionar el nueva_celda nodoInterno
                let tmp=nodoX.getAcceso();
                console.log(tmp)
                while (tmp!=null) {
                    if (parseInt(nuevaCelda.coordenadaY)<parseInt(tmp.coordenadaY)) {
                        nuevaCelda.setDerecha(tmp);
                        nuevaCelda.setIzquierda(tmp.getIzquierda());
                        tmp.getIzquierda().setDerecha(nuevaCelda);
                        tmp.setIzquierda(nuevaCelda);
                        break;
                    }else if ((parseInt(nuevaCelda.coordenadaX)==parseInt(tmp.coordenadaX))&& (parseInt(nuevaCelda.coordenadaY)==parseInt(tmp.coordenadaY))) {
                        tmp.isbn=nuevaCelda.isbn;
                        tmp.nombreAutor=nuevaCelda.nombreAutor;
                        tmp.cantidad=nuevaCelda.cantidad;
                        tmp.fila=nuevaCelda.fila;
                        tmp.columna=nuevaCelda.columna;
                        tmp.paginas=nuevaCelda.paginas;
                        tmp.categoria=nuevaCelda.categoria;
                        break;
                    }else{
                        if (tmp.getDerecha()==null) {
                            tmp.setDerecha(nuevaCelda)
                            nuevaCelda.setIzquierda(tmp);
                            break;
                        }else{
                            tmp=tmp.getDerecha()
                        }
                    }
                }
            }
        }

        //INSERTAR NUEVACELDA EN COLUMNA
        if (nodoY.getAcceso()==null) {
            nodoY.setAcceso(nuevaCelda);
        }else{//si esta apuntando, validamos si la posicion de la fila del nueva_celda nodoCelda es menor a la posicion de la fila del acceso 
            if (parseInt(nuevaCelda.coordenadaX)<parseInt(nodoY.getAcceso().coordenadaX)) {
                nuevaCelda.setAbajo(nodoY.getAcceso())
                nodoY.getAcceso().setArriba(nuevaCelda)
                nodoY.setAcceso(nuevaCelda);
            }else{
                //de no cumplirse, debemos movernos de arriba hacia abajo buscando donde posicionar el nueva_celda
                let tmp2=nodoY.getAcceso();
                while (tmp2!=null) {
                    if (parseInt(nuevaCelda.coordenadaX)<parseInt(tmp2.coordenadaX)) {
                        nuevaCelda.setAbajo(tmp2);
                        nuevaCelda.setArriba(tmp2.getArriba())
                        tmp2.getArriba().setAbajo(nuevaCelda)
                        tmp2.setArriba(nuevaCelda);
                        break;
                    }else if ((parseInt(nuevaCelda.coordenadaX)==parseInt(tmp2.coordenadaX))&&(parseInt(nuevaCelda.coordenadaY)==parseInt(tmp2.coordenadaY))) {
                        tmp2.isbn=nuevaCelda.isbn;
                        tmp2.nombreAutor=nuevaCelda.nombreAutor;
                        tmp2.cantidad=nuevaCelda.cantidad;
                        tmp2.fila=nuevaCelda.fila;
                        tmp2.columna=nuevaCelda.columna;
                        tmp2.paginas=nuevaCelda.paginas;
                        tmp2.categoria=nuevaCelda.categoria;
                        break;
                    }else{
                        if (tmp2.getAbajo()==null) {
                            tmp2.setAbajo(nuevaCelda)
                            nuevaCelda.setArriba(tmp2)
                            break;
                        } else {
                            tmp2=tmp2.getAbajo()
                        }
                    }
                }
            }
        }

    }

    recorridoPorFila(fila){
        let inicio = this.filas.getCabecera(fila)
        if (inicio == null){
            console.log('Esa coordenada de filas no existe')
            return null
        }
        let tmp = inicio.getAcceso()
        // #tmp = this.filas.getCabecera(fila).getAcceso()
        while (tmp != None){
            console.log(tmp.caracter)
            tmp = tmp.getDerecha()
        }
    }
    
    recorridoPorColumna(columna){
        let inicio= this.columnas.getCabecera(columna)
        if (inicio == null){
            console.log('Esa coordenada de columna no existe')
            return null
        }
        let tmp = inicio.getAcceso()
        // #tmp = this.filas.getCabecera(fila).getAcceso()
        while (tmp != null){
            console.log(tmp.nombreLibro)
            tmp = tmp.getAbajo()
        }
    }

    mostrarMatriz(){
        let gg=this.filas.primero;
        for (let x = 0; x < this.filas.size; x++) {
            let inicio=this.filas.getCabeceraXFila(gg.id);
            if (inicio==null) {
                console.log("Esa coordenada de columna no existe")
                return null
            }else{
                let tmp=inicio.getAcceso()
                while (tmp!=null) {
                    console.log("X "+tmp.coordenadaX,"Y "+tmp.coordenadaY,"---"+tmp.nombreLibro);
                    tmp=tmp.getDerecha()
                }
            }
            gg=gg.siguiente;
        }
    }
    
    graficarDisperza(){
        let gg=this.filas.primero
        let graphviz=''
        let dimen=0;
        let dimeny=0;
        let cabeceras=''
        for (let x = 0; x < this.filas.size; x++){
            console.log("size: "+gg.id)
            let inicio = this.filas.getCabeceraXFila(gg.id)
            if (inicio == null){
                console.log('Esa coordenada de columna no existe')
                return null
            }
            else{
                dimen=gg.id
                let tmp= inicio.getAcceso()
                // #tmp = this.filas.getCabecera(fila).getAcceso()
                while (tmp != null){
                        graphviz+='nodo'+tmp.coordenadaX+'_'+tmp.coordenadaY+'[label="'+tmp.nombreLibro+'",fillcolor=white,group=0]'
                    // # print("X "+tmp.coordenadaX,"Y "+tmp.coordenadaY,"---"+tmp.caracter)
                    dimeny=tmp.coordenadaY
                    tmp = tmp.getDerecha()
                   
                }

            }
            
            gg=gg.siguiente
            
        }
        for (let index = 1; index < dimen+1; index++) {
            for (let y = 1; y < dimeny+1; y++) {
                console.log("cabecera: "+index+","+y)
                cabeceras+='nodoC'+index+'_'+y+'[label="'+index+','+y+'",fillcolor=white,group=0]'
            }
            
        }
        cabeceras+=graphviz
        // console.log("Dimension: "+dimen+" -"+dimeny)
        // console.log(graphviz)
        return [cabeceras,dimen,dimeny]
    }


    generarGraphviz(){
        // # print("m",m,n)
        let gra=this.graficarDisperza()
        let tamM=gra[1]
        let tamN=gra[2]
        let m=parseInt(tamM)+1
        let n=parseInt(tamN)+1
        let x="hola"
        
        // # print(posiciones.mostrarAzulejosPatron())
        // # print("hola")
        
        let graphviz='digraph L{ node[shape=box fillcolor="#FFEDBB" style=filled] subgraph cluster_p{ label ="LIBROS THRILLER" bgcolor="#398D9C" edge[dir="none"]'
        let g=gra[0]
        graphviz=graphviz+g
        for (let fi = 1; fi < parseInt(m); fi++) {
            let grupo=2
            for (let col = 1; col < parseInt(n); col++) {
                if (parseInt(grupo)<parseInt(n)) {
                    graphviz+='nodo'+fi+'_'+col+'->nodo'+fi+'_'+grupo+'[dir=both color="#black"]'
                    grupo++;
                }
            }
                
        }

        for (let fi = 1; fi < parseInt(m); fi++) {
            graphviz+='{rank=same;'
            let grupo=2;
            for (let col = 1; col < parseInt(n); col++) {
                if (parseInt(col)<parseInt(n-1)) {
                    graphviz+='nodo'+fi+'_'+col+','
                    grupo++
                }else{
                    graphviz+=' nodo'+fi+'_'+col
                }
            }
            graphviz+='}'
        }

        // ## AQUI ENLAZAMOS LAS COLUMNAS
        for (let col = 1; col < parseInt(n); col++) {
            let fila=2;
            for (let fi = 1; fi < parseInt(m-1); fi++) {
               graphviz+='nodo'+fi+'_'+col+'->nodo'+fila+'_'+col+'[dir=both color="#black"];'
                fila++;
            }
            
        }
        graphviz+='}}'
        console.log(graphviz)
     }    
        
        // # for col in range(1,int(n)):
        // #     # grupo=2
        // #     for fi in range(1,int(m)):
        // #         grupo=2
        // #         if int(grupo)<int(m-1):  
        // #             graphviz=graphviz+'''
        // #                 nodo'''+str(fi)+'''_'''+str(col)+'''->nodo'''+str(grupo)+'''_'''+str(col)+'''[dir=none color="#398D9C"]
        // #             '''
        // #             grupo=grupo+1
        // graphviz=graphviz+'} }'
}
        
        
               
                
                
                
      


//----------------------------------------------------------------------------------------------------------------------------------------




//----------------------------------------COLA DE ESPERA PARA LIBROS-------------------------------------
class NodoCola{
    constructor(nombreUsuario,nombreLibro,cantidad){
        this.nombreUsuario=nombreUsuario;
        this.nombreLibro=nombreLibro;
        this.cantidad=cantidad;
        this.siguiente=null;
    }
}

class Cola{
    constructor(){
        this.primero=null;
        this.ultimo=null;
    }

    encolar(nombreUsuario,nombreLibro,cantidad){
        let nuevo=new NodoCola(nombreUsuario,nombreLibro,cantidad);
        if (this.primero==null) {
            this.primero=nuevo;
            this.ultimo=nuevo;
        }else{
            this.ultimo.siguiente=nuevo;
            this.ultimo=nuevo;
        }
    }

    desencolar(){
        let temp=this.primero.siguiente;
        let data=this.primero.nombreLibro;
        this.primero.siguiente=null;
        this.primero=temp;
        return data;
    }
}

//-------------------------------------------------------------------------------------------------------