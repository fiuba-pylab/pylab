palabras={}

palabras['FIUBA']=1

palabras['UBA']=5

boolean = 'UBA' in palabras; 
print(boolean)

palabras['FIUBA']+=1

for clave, valor in palabras.items():
    print(clave, valor)