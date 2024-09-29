inicio = int(input('\nIngrese año y mes de inicio laboral como un número aaaamm: ')) 
fin = int(input('Ingrese año y mes de cese laboral como un número aaaamm: '))

año_i = inicio // 100 
año_f = fin // 100
mes_i = inicio % 100 
mes_f = fin % 100
años = año_f - año_i
meses = (mes_f - 1) - mes_i
if meses < 0:
    años -= 1 
    meses += 12
print(f'\nLa antigüedad laboral es de {años} años')
if meses > 0: 
    print(f'y {meses} meses.')