frutas = ["manzana 2", "banana 3", "naranja 3", "manzana 4"]
dict = {}
for fruta in frutas:
    nombre = fruta.split(' ')[0]
    cantidad = fruta.split(' ')[1]
    if dict[nombre]:
        dict[nombre] += cantidad
    else:
        dict[nombre] = cantidad