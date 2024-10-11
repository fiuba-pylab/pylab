
def precios():

    p = {}
    dict = ["15 23700", 
        "23 219990",
        "32 47600",
        "44 129900"]

    for línea in dict: 
        línea = línea.split() 
        p[línea[0]] = float(línea[1]) 

    dict.close()
    return p

def ventas():

    v = {}
    dict = ["23 1", "15 2", "44 1", "32 2", "15 3", "44 1"]

    for línea in dict:
        línea = línea.split()
        if línea[0] in v: v[línea[0]] += int(línea[1])
        else: v[línea[0]] = int(línea[1])

    dict.close()
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
v = ventas()

totalizar(v, p)
