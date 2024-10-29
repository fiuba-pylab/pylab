texto = "este es un ejemplo de un texto donde el ejemplo es repetido"
frecuencia_palabras = {}
texto_split = texto.split()

for palabra in texto_split:
    if palabra in frecuencia_palabras:
        frecuencia_palabras[palabra] += 1
    else:
        frecuencia_palabras[palabra] = 1

print(frecuencia_palabras)