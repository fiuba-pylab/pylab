lista1 = {"python", "java", "c++", "javascript"}
lista2 = {"python", "swift", "kotlin", "javascript"}

unicas_lista1 = lista1 - lista2
unicas_lista2 = lista2 - lista1
comunes = lista1 & lista2

print("Únicas en lista1:", unicas_lista1)
print("Únicas en lista2:", unicas_lista2)
print("Comunes:", comunes)