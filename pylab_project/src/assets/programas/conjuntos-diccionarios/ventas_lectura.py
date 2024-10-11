
def precios():

    p = {}
    arch = open ('precios.txt', 'r')

    for línea in arch:
        línea = línea.split()
        p[línea[0]] = float(línea[1])


    arch.close()
    return p

def ventas(nomArch):

    v = {}
    arch = open(nomArch, 'r')

    for línea in arch:
        línea = línea.split()
        if línea[0] in v: v[línea[0]] += int(línea[1])
        else: v[línea[0]] = int(línea[1])


    arch.close()
    return v

def totalizar(ventas, precios):

    total = 0.0
    print('\nCantidad de unidades y monto total de ventas por artículo:')


    for artículo, cantidad in ventas.items():
        total_art = cantidad*precios[artículo]
        print(f'{artículo:4s}{cantidad:4d}{total_art:12.2f}')
        total += total_art

    print(f'\nEl total de ventas es de ${total:0.2f}')

print('Totalizaciones por artículo y general de ventas registradas en un archivo de texto\n')
p = precios()
archVentas = input('Ingrese el nombre del archivo de ventas, incluyendo la extensión .txt: ')
v = ventas(archVentas)

totalizar(v, p)

