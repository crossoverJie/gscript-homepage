let defaultCode = [
  {
    value:'0',
    label: 'Hello World',
    code:'void fib(){\n' +
        '    int a = 0;\n' +
        '    int b = 1;\n' +
        '    int fibonacci(){\n' +
        '        int c = a;\n' +
        '        a = b;\n' +
        '        b = a+c;\n' +
        '        return c;\n' +
        '    }\n' +
        '    return fibonacci;\n' +
        '}\n' +
        'func int() f = fib();\n' +
        'for (int i = 0; i < 10; i++){\n' +
        '    print(f()+" ");\n' +
        '}'
  }
]

export {defaultCode}
