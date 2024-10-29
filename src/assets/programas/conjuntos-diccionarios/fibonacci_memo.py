def fibonacci(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    fibo1 = fibonacci(n-1, memo)
    fibo2 = fibonacci(n-2, memo)
    memo[n] = fibo1 + fibo2
    return memo[n]


n = input('ingrese número para realizar la sucesión de Fibonacci')
fibo = fibonacci(n)
print(f'{fibo}')