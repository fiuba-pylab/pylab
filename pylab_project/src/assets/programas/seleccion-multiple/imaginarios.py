import math

real = int(input("ingrese el real: "))
imaginario = int(input("ingrese el imaginario: "))
if(real > 0 and imaginario > 0):
    print(180 * math.asin(imaginario/math.sqrt(real * real + imaginario        * imaginario)))
elif(real < 0 and imaginario > 0):
    print(180 * (math.asin(real/math.sqrt(real * real + imaginario *      imaginario)) + 1/2))
elif(real < 0 and imaginario < 0):
    print(180 * (math.asin(imaginario/math.sqrt(real * real + imaginario * imaginario)) + 1))
else:
    print(180 * (math.asin(real/math.sqrt(real * real + imaginario * imaginario)) + 3/2))