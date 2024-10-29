frutas = {'manzana', 'naranja', 'manzana ', 'pera', 'naranja', 'banana'}

print('naranja' in frutas)
print('ciruela' in frutas)

frutas |= {'ciruela'}
frutas |= {'naranja'}
frutas -= {'pera'}

A={'Juan', 'Esteban', 'Laura', 'Federico', 'Lorena'}
B={'Agustín', 'Alejo', 'Esteban', 'Ana', 'Laura'}

print(A-B)
print(B-A)
print(A|B)
print(A&B)
print(A^B)
print((A-B)|(B-A))
print((A|B)-(A&B))