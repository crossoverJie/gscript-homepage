let defaultCode = [
  {
    value:'0',
    label: 'Hello World',
    code:'println("hello world");'
  },
  {
    value:'1',
    label: 'Fibonacci Closure',
    code:'func int() fib(){\n' +
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
  },
  {
    value:'2',
    label: 'YangHui triangle',
    code:'int num(int x,int y){\n' +
        '\tif (y==1 || y ==x) {\n' +
        '\t\treturn 1;\n' +
        '\t}\n' +
        '    int v1 = num(x - 1, y - 1);\n' +
        '    int v2 = num(x - 1, y);\n' +
        '\tint c = v1+v2;\n' +
        '    // int c = num(x - 1, y - 1)+num(x - 1, y);\n' +
        '\treturn c;\n' +
        '}\n' +
        '\n' +
        'printTriangle(int row){\n' +
        '\tfor (int i = 1; i <= row; i++) {\n' +
        '        for (int j = 1; j <= row - i; j++) {\n' +
        '           print(" ");\n' +
        '        }\n' +
        '        for (int j = 1; j <= i; j++) {\n' +
        '            print(num(i, j) + " ");\n' +
        '        }\n' +
        '        println("");\n' +
        '    }\n' +
        '}\n' +
        '\n' +
        'printTriangle(7);'
  },
  {
    value:'3',
    label: 'Cycle linkedList',
    code:'class ListNode{\n' +
        '    int value;\n' +
        '    ListNode next;\n' +
        '    ListNode(int v, ListNode n){\n' +
        '        value =v;\n' +
        '        next = n;\n' +
        '    }\n' +
        '}\n' +
        '\n' +
        '// 两个对象比较需要实现运算符重载\n' +
        'bool operator == (ListNode p1, ListNode p2){\n' +
        '    return p1.value == p2.value;\n' +
        '}\n' +
        '\n' +
        'bool hasCycle(ListNode head){\n' +
        '    if (head == nil){\n' +
        '        return false;\n' +
        '    }\n' +
        '    if (head.next == nil){\n' +
        '        return false;\n' +
        '    }\n' +
        '\n' +
        '    ListNode fast = head.next;\n' +
        '    ListNode slow = head;\n' +
        '    // bool ret = false;\n' +
        '    for (fast.next != nil){\n' +
        '\n' +
        '        if (fast == slow){\n' +
        '            return true;\n' +
        '        }\n' +
        '\n' +
        '        if (fast.next == nil){\n' +
        '            return false;\n' +
        '        }\n' +
        '        if (fast.next.next == nil){\n' +
        '            return false;\n' +
        '        }\n' +
        '        if (slow.next == nil){\n' +
        '            return false;\n' +
        '        }\n' +
        '\n' +
        '        fast = fast.next.next;\n' +
        '        slow = slow.next;\n' +
        '    }\n' +
        '    return false;\n' +
        '}\n' +
        '\n' +
        'ListNode l1 = ListNode(1, nil);\n' +
        'bool b1 =hasCycle(l1);\n' +
        'println(b1);\n' +
        'assertEqual(b1, false);\n' +
        '\n' +
        'ListNode l4 = ListNode(4, nil);\n' +
        'ListNode l3 = ListNode(3, l4);\n' +
        'ListNode l2 = ListNode(2, l3);\n' +
        'bool b2 = hasCycle(l2);\n' +
        'println(b2);\n' +
        'assertEqual(b2, false);\n' +
        '\n' +
        'l4.next = l2;\n' +
        'bool b3 = hasCycle(l2);\n' +
        'println(b3);\n' +
        'assertEqual(b3, true);'
  }
]

export {defaultCode}
