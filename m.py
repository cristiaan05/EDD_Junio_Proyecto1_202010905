class Nodo_O:
    
    def __init__(self, dato, fila, columna):
        self.dato = dato
        self.fila = fila
        self.columna = columna
        self.ant = None
        self.sig = None
        self.arr = None
        self.aba = None

class Matriz_O:
    def __init__(self):
        self.cabeza = None
        self.contador = 0

    def vacio(self):
        return self.cabeza==None

    def ingresardatos(self, data, fila, columna):
        if self.vacio():
            nuevoprin = Nodo_O(data, fila, columna)
            self.cabeza = nuevoprin
            self.contador+=1
        else:
            aux = self.cabeza
            while aux.aba!=None:
                aux = aux.aba
            if self.contador!=fila:
                self.contador+=1
                nuevoprin = Nodo_O(data, fila, columna)
                aux.aba = nuevoprin
                nuevoprin.arr = aux
            else:
                while aux.sig!=None:
                    aux = aux.sig
                nuevoprin = Nodo_O(data, fila, columna)
                aux.sig = nuevoprin
                nuevoprin.ant = aux
                if self.contador>1:
                    aux2 = aux.arr.sig
                    aux2.aba = nuevoprin
                    nuevoprin.arr = aux2

    def mostrarMatriz(self):
        aux = self.cabeza
        img =""
        while (aux.aba!=None) | (aux.sig!=None):
            img = img + " " +aux.dato
            if aux.sig !=None:
                aux = aux.sig
            else:
                img = img + "\n"
                if aux.aba!=None:
                    aux = aux.aba
                    while aux.ant!=None:
                        aux = aux.ant
        img = img+" "+aux.dato
        return img


fila = 3
columna = 3
Matrix = Matriz_O()
dato ="BBWWWBBW "
lista = list()
cont =0
for i in dato:
    lista.append(i)
    cont+=1
    print(i)

# lista = list(dato)

##cont=0

for i in range(1,fila+1):
    for j in range(1,columna+1):
        ##Matrix.ingresardatos(lista.pop(cont),i,j)
        ##cont+=1
        Matrix.ingresardatos(lista.pop(0),i,j)
        print(str(i)+" ",str(j)+" ",str(i+j))
print("------------------------------------------------------------")
print(Matrix.mostrarMatriz())