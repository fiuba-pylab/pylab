def secuencia_collatz(n):
    secuencia = set()
    while n != 1:
        secuencia.add(n)
        if n % 2 == 0: 
            n = n // 2 
        else:
            n = 3 * n + 1
    secuencia.add(1)  # Incluir el 1 al final de la secuencia
    return secuencia

n = input('ingrese numero para la secuencia collatz')
secuencia = secuencia_collatz(n)
print(f'{secuencia}')