palabras={}

palabras['FIUBA']=1

palabras['UBA']=5

contieneFiuba = 'UBA' in palabras

print(contieneFiuba)

palabras['FIUBA']+=1

for clave, valor in palabras.items():
    print(clave, valor)