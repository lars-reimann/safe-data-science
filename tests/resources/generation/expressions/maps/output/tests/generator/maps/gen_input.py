# Pipelines --------------------------------------------------------------------

def test():
    g1({})
    g1({'a': 1.2, 'b': 1.0})
    g1({h2(): -0.5, 'b': h1()})
    g2({1.2: 'a', 1.0: 'b'})
    g2({5.6: 'c', h1(): h2()})
