frutas = ["manzana 2", "banana 3", "naranja 3", "manzana 4"]
dict = {}
for fruta in frutas:
    fruta_split = fruta.split(' ')
    nombre = fruta_split[0]
    cantidad = fruta_split[1]
    if nombre in dict:
        dict[nombre] += cantidad
    else:
        dict[nombre] = cantidad

print(dict)