# Pipelines --------------------------------------------------------------------

def test():
    f([])
    f([1, 2, 3])
    f([1, h1(), (h1()) + (5)])
    g({})
    g({'a': 1.2, 'b': 1.0})
    g({h3(): -0.5, 'b': h2()})
    g2({1.2: 'a', 1.0: 'b'})
    g2({5.6: 'c', h2(): h3()})
