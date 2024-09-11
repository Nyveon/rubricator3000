// node types:
// categorical: name str, sub arr
// criteria: name str, weight float
// discount: name str, discount float
// bonus: name str, bonus float

interfaceSubrubric = {
    'Menú Principal': {
        'Acceder al nivel': 0.10,
        'Salir del juego': 0.10
    },
    'Menú de pausa': {
        'Continuar': 0.10,
        'Reiniciar': 0.10,
        'Volver a menú': 0.10,
        'Salir del juego': 0.05
    },
    'Créditos': {
        'Mencionar assets': 0.45
    }
}

platformerRubric = {
    'id': 'example-0',
    'name': 'Platformer',
    'rubric': {
        'Jugador': {
            'Movimiento': {
                'Horizontal': 0.50,
                'Salto': 0.50
            },
            'Sonido': {
                'Salto': 0.15
            },
            'Animaciones': {
                'Idle': 0.20,
                'Correr': 0.20,
                'Salto': 0.20
            }
        },
        'Enemigos & Interacciones': {
            'Movimiento': {
                'Rebote del jugador al matar enemigo': 0.40
            },
            'Ataque': {
                'Jugador mata enemigo': 1.00,
                'Enemigo mata jugador': 1.00
            },
            'Sonido': {
                'Ataque direccional': 0.10
            }
        },
        'Nivel': {
            'Diseño': {
                'Nivel con plataformas visibles y colisionables': 0.75
            }
        },
        'Interfaz': interfaceSubrubric
    }
}

shooterRubric = {
    'id': 'example-1',
    'name': 'Shooter',
    'rubric': {
        'Jugador': {
            'Movimiento': {
                'Horizontal': 0.50
            },
            'Animaciones': {
                'Idle': 0.25,
                'Movimiento': 0.25,
                'Disparo': 0.25
            },
            'Proyectil': {
                'Jugador puede disparar (crear un proyectil)': 0.50
            },
            'Sonido': {
                'Disparo': 0.25
            }
        },
        'Enemigo & Interacciones': {
            'Proyectil': {
                'Se mueve': 0.25
            },
            'Ataque': {
                'Proyectil mata enemigo': 1.00,
                'Enemigo mata jugador': 1.00
            },
        },
        'Nivel': {
            'Diseño': {
                'Nivel con bloques visibles y colisionables': 0.75
            }
        },
        'Interfaz': interfaceSubrubric
    }
}

arcadeRubric = {
    'id': 'example-2',
    'name': 'Arcade',
    'rubric': {
        'Jugador': {
            'Movimiento': {
                'Multidireccional': 1.00
            },
            'Animaciones': {
                'Idle': 0.25,
                'Movimiento': 0.25,
                'Recolección': 0.25
            }
        },
        'Enemigo & Interacciones': {
            'Consumible': {
                'Se puede recoger': 1.00
            },
            'Sonido': {
                'Recolección de consumible': 0.25,
                'Muerte de jugador': 0.25
            },
            'Ataque': {
                'Enemigo mata jugador': 1.00
            }
        },
        'Nivel': {
            'Diseño': {
                'Nivel con muros visibles y colisionables': 0.75
            }
        },
        'Interfaz': interfaceSubrubric
    }
}