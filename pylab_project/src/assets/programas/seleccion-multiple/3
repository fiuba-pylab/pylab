precio_por_unidad = float(input("Ingrese el precio por unidad: "))
cantidad = int(input("Ingrese la cantidad: "))
metodo_pago = input("Ingrese el método de pago (efectivo o qr): ")
costo_base = precio_por_unidad * cantidad
if metodo_pago == 'efectivo':
   if cantidad > 20:
      costo_total = costo_base * 0.90
   else:
       costo_total = costo_base
elif metodo_pago == 'qr':
    if cantidad <= 20:
       costo_total = costo_base * 1.15
    else:
        costo_total = costo_base
else:
    costo_total = costo_base

print(f'El costo total es: {round(costo_total, 2)}')