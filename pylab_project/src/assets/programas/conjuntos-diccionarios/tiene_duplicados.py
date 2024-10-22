def tiene_duplicados(lista):
    valores_unicos = list(set(lista))
    if len(lista) == len(valores_unicos):
        return False
    else:
        return True
 
print(tiene_duplicados([0, 3, 6, 10]))
print(tiene_duplicados([0, 0, 1, 2]))