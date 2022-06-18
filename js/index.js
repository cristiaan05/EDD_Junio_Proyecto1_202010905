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
    
    listaDobleC.insertar(JSON.parse(nombreUsuairo),10,parseInt(cantidad))
    // console.log(,libro);
    
    if (listaSimpLibros.cantidadLibro(libro)>=cantidad) {
        listaListas.agregarLibro(JSON.parse(nombreUsuairo),libro,cantidad);
    }else if (listaSimpLibros.cantidadLibro(libro)<cantidad) {
        listaListas.agregarLibro(JSON.parse(nombreUsuairo),libro,cantidad);
        let cola=new Cola();
        cola.encolar(JSON.parse(nombreUsuairo),libro,cantidad);
    }
    listaDobleC.mostrarUsuarios()
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
var listaDobleC;

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
            // console.log("entre aqui")
            if (tempUser.nombreUsuario==usuario) {
                let nuevoLibro=new NodoLibroUsuario(nombreLibro,cantidad);
                let primerLibro=tempUser.abajo;
                tempUser.abajo=nuevoLibro;
                nuevoLibro.siguiente=primerLibro;
                tempUser.sizeLibros++;
                alert('Libro Comprado');
                // console.log("Libro: "+nuevoLibro.nombreLibro+" a usuario: "+usuario+" agregado")
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
            if (libro.categoria=="Fantasia") {
                matriz.insercionmatriz(libro.isbn,libro.nombre_autor,libro.nombre_libro,libro.cantidad,libro.fila,libro.columna,libro.paginas,libro.categoria);
            }else if (libro.categoria=="Thriller") {
                matrizD.insertar(libro.columna,libro.fila,libro.isbn,libro.nombre_autor,libro.nombre_libro,libro.cantidad,libro.fila,libro.columna,libro.paginas,libro.categoria)    
            }
                        // matriz.insertarMatriz(libro.isbn,libro.nombre_autor,libro.nombre_libro,libro.cantidad,libro.fila,libro.columna,libro.paginas,libro.categoria,x,y);
        }
        matriz.mostrarmatriz()
        matrizD.mostrarMatriz()
        matrizD.generarGraphviz()
        listaSimpLibros.mostrarLibros();
    }
    
    lector.readAsText(archivo);
    
    alert('You have successfully upload the file!');
    listaDobleC=new ListaDoble()
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
        var temp = new NodoMatrizOrtogonal(isbn, nombreAutor, nombreLibro, cantidad, fila, columna, paginas, categoria,x,1);
        if(this.primero == null){
            this.primero = temp;
            this.ultimo = temp;
        }else{
            this.ultimo.siguiente = temp;
            this.ultimo = temp;
        }

        var aux = this.ultimo
        for (let posy = 25; posy >= 1; posy--) {
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
        for (let index = 1; index < 26; index++) {
            this.listahorizontal.insertarlista("", "", "", "", "", "", "","",index)
        }
    }
    mostrarmatriz(){
        var posx = 1
        var dotMatriz='digraph L{\n node[shape=box fillcolor="#FFEDBB" style=filled]\n subgraph cluster_p{ \n label ="Libros de Fantasia"\n bgcolor="#398D9C"\n edge[dir="both"] \n'
        let uniones=""
        var cabecerax = this.listahorizontal.buscarlista(posx)
        while(cabecerax != null){
            let alineacion="{rank=same;"
            // console.log("**************** x="+posx+"******************")
            var numy = 1
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
        var canvas=d3.select("#matriz").graphviz()
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
                    // console.log("X "+tmp.coordenadaX,"Y "+tmp.coordenadaY,"---"+tmp.nombreLibro);
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
            // console.log("size: "+gg.id)
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
                        graphviz+='nodo'+tmp.coordenadaX+'_'+tmp.coordenadaY+'[label="'+tmp.nombreLibro+'",fillcolor=white,group=0] \n'
                    // # print("X "+tmp.coordenadaX,"Y "+tmp.coordenadaY,"---"+tmp.caracter)
                    dimeny=tmp.coordenadaY
                    tmp = tmp.getDerecha()
                   
                }

            }
            
            gg=gg.siguiente
            
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
        
        // let graphviz='digraph L{ node[shape=box fillcolor="#FFEDBB" style=filled] subgraph cluster_p{ label ="LIBROS THRILLER" bgcolor="#398D9C" edge[dir="none"]'
        let graphviz='digraph L{ \n node[shape=box fillcolor="#FFEDBB" style=filled]\n subgraph cluster_p{\n label ="LIBROS THRILLER" \n'
        graphviz+='bgcolor="#398D9C" \n raiz[label="0,0" group=0] \n edge[dir="both"] \n //AQUI CREAMOS LAS CABECERAS DE LAS FILAS \n'
        /*
        digraph L{ \n node[shape=box fillcolor="#FFEDBB" style=filled]\n subgraph cluster_p{\n label ="Nombre Terreno: '''+nombre+'"' \n
        bgcolor="#398D9C" \n raiz[label="0,0"] \n edge[dir="both"] \n //AQUI CREAMOS LAS CABECERAS // DE LAS FILAS
        */

        let pivote=this.filas.primero;
        let posx=0;
        while (pivote!=null) {
            //creamos los nodos de cabeceras de cada fila
            graphviz+='Fila'+pivote.id+'[label="'+pivote.id+'",group=0]; \n'
            pivote=pivote.siguiente;
            posx++;
        }
        pivote=this.filas.primero;
        while (pivote.siguiente!=null) {
            //enlazamos cada nodo de cabecera fila
            graphviz+='Fila'+pivote.id+'->'+'Fila'+pivote.siguiente.id+'; \n';
            pivote=pivote.siguiente;
        }
        //enlazo la raiz con el primero encabezado fila
        graphviz+='raiz->'+'Fila'+this.filas.primero.id+'; \n';

        //graficar nodos columna
        let pivotey=this.columnas.primero;
        let posy=0;
        while (pivotey!=null) {
            graphviz+='Columna'+pivotey.id+'[label="'+pivotey.id+'",group='+pivotey.id+',fillcolor=yellow]; \n'
            pivotey=pivotey.siguiente;
            posy++;
        }
        pivotey=this.columnas.primero;
        let uniones='{rank=same;raiz,\n'
        while (pivotey.siguiente!=null) {
            // let auxp=pivotey.siguiente
            graphviz+='Columna'+pivotey.id+'->'+'Columna'+pivotey.siguiente.id+'; \n'
            if (pivotey.siguiente==null) {
                // uniones+='Columna'+pivotey.siguiente.id+' \n'
            }else{
                uniones+='Columna'+pivotey.id+', \n'
                uniones+='Columna'+pivotey.siguiente.id+' \n'
            }
            
            pivotey=pivotey.siguiente;
        }
        uniones+='}'
        graphviz+=uniones;
        graphviz+='raiz->'+'Columna'+this.columnas.primero.id+'; \n'

        //CON LAS CABECERAS GRAFICAS, GRAFICAMOS LOS NODOS INTERNOS
        pivote=this.filas.primero;
        posx=0;
        while(pivote!=null){
            let pCelda=pivote.getAcceso();
            while (pCelda!=null) {
                //buscamos posy
                pivotey=this.columnas.primero;
                let posYCelda=0;
                while (pivotey!=null) {
                    if (pivotey.id==pCelda.coordenadaY) {
                        break;
                    }
                    posYCelda++
                    pivotey=pivotey.siguiente;
                }
                graphviz+='nodo'+pCelda.coordenadaX+'_'+pCelda.coordenadaY+'[label="'+pCelda.nombreLibro+'",fillcolor=green,group='+pCelda.coordenadaY+'] \n'
                pCelda=pCelda.getDerecha();
            }
            let pC=pivote.getAcceso()
            console.log("guenas: "+pC.coordenadaX)
            let union='{rank=same; Fila'+pC.coordenadaX+','
            while (pC!=null) {
                // console.log("guenas: "+pC.nombreLibro)
                if (pC.derecha!=null) {
                    graphviz+='nodo'+pC.coordenadaX+'_'+pC.coordenadaY+'->'+'nodo'+pC.derecha.coordenadaX+'_'+pC.derecha.coordenadaY+'; \n //hi \n'
                }
                if (pC.derecha==null) {
                    union+='nodo'+pC.coordenadaX+'_'+pC.coordenadaY+'\n'
                }
                else{
                    union+='nodo'+pC.coordenadaX+'_'+pC.coordenadaY+', \n'
                }
                pC=pC.derecha;
            }
            union+='}'
            graphviz+=union
            /*
            nodo3_4[label="Ulmax",fillcolor=green,group=4] 
            nodo3_5[label="Zoinage",fillcolor=green,group=5] 
            Fila3->nodo3_4; 
            //agregado
            nodo3_4->nodo3_5
            {rank=same;Fila3,nodo3_4,nodo3_5}
            */
            //unimos las filas con las celdas que tienen esa posicion en X
            graphviz+='Fila'+pivote.id+'->'+'nodo'+pivote.getAcceso().coordenadaX+'_'+pivote.getAcceso().coordenadaY+'; \n'
            pivote=pivote.siguiente
            posx++
        }
        
        // aca enlazamos cada nodo con la columan donde pertenece
        pivote=this.columnas.primero;
        while (pivote!=null) {
            let pCelda=pivote.getAcceso()
            while (pCelda!=null) {
                if (pCelda.abajo!=null) {
                    graphviz+='nodo'+pCelda.coordenadaX+'_'+pCelda.coordenadaY+'->nodo'+pCelda.abajo.coordenadaX+'_'+pCelda.abajo.coordenadaY+'; \n'
                }
                pCelda=pCelda.abajo;
            }
            graphviz+='Columna'+pivote.id+'->'+'nodo'+pivote.getAcceso().coordenadaX+'_'+pivote.getAcceso().coordenadaY+'; \n'
            pivote=pivote.siguiente
        }
        graphviz+='}}'
        // console.log(graphviz)
        d3.select("#matrizD").graphviz()
            .width(1500)
            .height(1500)
            .renderDot(graphviz);
     }    
        
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

//--------------------------------------------LISTA DOBLE TOP PERSONAS CON MAS LIBROS COMPRADOS-----------------------

class NodoDoble{
    constructor(nombreUsuario,edad,cantidadLibros){
        this.nombreUsuario=nombreUsuario;
        this.edad=edad;
        this.cantidadLibros=cantidadLibros;
        this.siguiente=null;
        this.anterior=null;
    }

}

class ListaDoble{
    constructor(){
        this.inicio=null;
        this.final=null;
        this.size=0;
    }

    insertar(nombreUsuario,edad,cantidadLibros){
        let nuevo= new NodoDoble(nombreUsuario,edad,cantidadLibros);
        let follow=false
        this.size++;
        if (this.inicio==null) {
            this.inicio=nuevo
        }
        else{
            let tmp=this.inicio;
            console.log("hiri11")
            while (tmp!=null) {
                if (tmp.nombreUsuario==nombreUsuario) {
                    console.log("hiri")
                    tmp.cantidadLibros+=cantidadLibros;
                    follow=true;
                }
                tmp=tmp.siguiente
            }
            if (!follow) {
                tmp=this.inicio
                while (tmp.siguiente!=null) {
                    tmp=tmp.siguiente;
                }
                tmp.siguiente=nuevo;
                nuevo.anterior=tmp;
                this.final=nuevo;
            }
        }
    }
    mostrarUsuarios(){
        this.ordenarTop()
        let tmp=this.inicio;
        let contador=0;
        var menu=document.getElementById("menu")
        menu.innerHTML='<h2 class="header center">Top Usuarios con más compras</h2>'
        let dot='digraph L{ \n node[shape=box fillcolor="#FFEDBB" style=filled] \n subgraph cluster_p{ \n label ="TOP USUARIOS CON MÁS COMPRAS" \n bgcolor="#398D9C" \n edge[dir="both"] \n'
        console.log("-------------------------USUARIOS ORDENADOS-----------------")
        while (tmp!=null && contador<6) {
            dot+='nodo'+contador+'[label="'+tmp.nombreUsuario+' \n Cantidad: '+tmp.cantidadLibros+'",fillcolor=white,group='+contador+'] \n'    
            menu.innerHTML+=        '<div class="col s12 m6 l4" style="padding: 30px 5px;">\n <div class="card">\n <div class="card-image waves-effect waves-block waves-light">\n <img class="activator" src="https://definicion.de/wp-content/uploads/2019/06/perfildeusuario.jpg">\n </div>\n <div class="card-content">\n <span class="card-title activator grey-text text-darken-4" style="font-weight: 500;">'+tmp.nombreUsuario+'<i class="material-icons right">more_vert</i></span>\n </div>\n <div class="card-reveal">\n <span class="card-title grey-text text-darken-4" style="font-size: 2rem; font-weight: 500;">'+tmp.nombreCompleto+'<i class="material-icons right">close</i></span>\n </div>\n </div>\n'
            console.log("usuario: "+tmp.nombreUsuario+" cantidad: "+tmp.cantidadLibros)
            contador++
            tmp=tmp.siguiente;
        }
        for (let index = 0; index < this.size-1; index++) {
                dot+='nodo'+index+'->'+'nodo'+(index+1)+'; \n'
        }
        let rank='{rank=same; \n'
        if (this.size==1) {
            rank+='nodo0 \n'
        }
        for (let index = 0; index < this.size-1; index++) {
            if (index==this.size-2) {
                rank+='nodo'+index+', \n'
                rank+='nodo'+(index+1)+'\n'
            }else{
                rank+='nodo'+index+',   \n'
            }
            
        }


        rank+='}'
        dot+=rank
        dot+='}}'
        console.log(dot)
        d3.select("#topuser").graphviz()
            .width(1500)
            .height(1500)
            .renderDot(dot);
    }

    ordenarTop(){
        if (this.size>1) {
            while (true) {
                let actual=this.inicio;
                let x=null;
                let y=this.inicio.siguiente;
                let cambio=false
                while (y!=null) {
                    if (actual.cantidadLibros<y.cantidadLibros) {
                        cambio=true;
                        if (x!=null) {
                            let tmp=y.siguiente;
                            x.siguiente=y;
                            y.siguiente=actual;
                            actual.siguiente=tmp
                        }else{
                            let tmp2=y.siguiente;
                            this.inicio=y;
                            y.siguiente=actual;
                            actual.siguiente=tmp2
                        }
                        x=y;
                        y=actual.siguiente;
                    }else{
                        x=actual;
                        actual=y;
                        y=y.siguiente
                    }
                }if (!cambio) {
                    break;
                }
            }
        }
    }
}



//--------------------------------------------------------------------------------------------------------------------