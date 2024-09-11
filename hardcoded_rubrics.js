// node types:
// criteria: name str, weight float
// discount: name str, discount float
// bonus: name str, bonus float

const ItemType = {
    REQUIREMENT: 0,
    DISCOUNT: 1,
    BONUS: 2
}

function formatTypeAndValue(type, value) {
    const formattedValue = value.toFixed(2);

    switch (type) {
        case ItemType.REQUIREMENT:
            return `[${formattedValue}]`;
        case ItemType.DISCOUNT:
            return `-${formattedValue} `;
        case ItemType.BONUS:
            return `+${formattedValue} `;
    }
}

function typeToClass(type) {
    switch (type) {
        case ItemType.REQUIREMENT:
            return 'requirement';
        case ItemType.DISCOUNT:
            return 'discount';
        case ItemType.BONUS:
            return 'bonus';
    }
}

exampleRubric = {
    'Categoría 1': {
        'Subcategoría 1.a': [
            {
                name: 'Requisito ejemplo',
                desc: 'Cuenta para el total posible, suma al total obtenido en la subcategoría',
                value: 1.50,
                type: ItemType.REQUIREMENT
            },
            {
                name: 'Descuento ejemplo',
                desc: 'No cuenta para el total posible, resta del puntaje total obtenido en la subcategoría. Piso de 0.',
                value: 0.50,
                type: ItemType.DISCOUNT
            },
            {
                name: 'Bonus ejemplo',
                desc: 'No cuenta para el total posible, suma al puntaje total obtenido en la evaluación entera. Techo de nota 7.',
                value: 0.10,
                type: ItemType.BONUS
            },
        ],
        'Subcategoría 1.b': [
            {
                name: 'Criterio 1.b.1',
                value: 1.50,
                type: ItemType.REQUIREMENT
            },
        ]
    },
    'Categoría 2': {
        'Subcategoría 2.a': [
            {
                name: 'Criterio 2.a.1',
                value: 0.10,
                type: ItemType.REQUIREMENT
            }
        ]
    }
}


interfaceSubrubric = {
    'Menú Principal': [
        {
            name: 'Acceder al nivel',
            value: 0.10,
            type: ItemType.REQUIREMENT
        },
        {
            name: 'Salir del juego',
            value: 0.10,
            type: ItemType.REQUIREMENT
        }
    ],
    'Menú de pausa': [
        {
            name: 'Continuar',
            value: 0.10,
            type: ItemType.REQUIREMENT
        },
        {
            name: 'Reiniciar',
            value: 0.10,
            type: ItemType.REQUIREMENT
        },
        {
            name: 'Volver a menú',
            value: 0.10,
            type: ItemType.REQUIREMENT
        },
        {
            name: 'Salir del juego',
            value: 0.05,
            type: ItemType.REQUIREMENT
        }
    ],
    'Créditos': [
        {
            name: 'Mencionar assets',
            value: 0.45,
            type: ItemType.REQUIREMENT
        }
    ]
}

platformerRubric = {
    'id': 'example-0',
    'name': 'Platformer',
    'rubric': {
        'Jugador': {
            'Movimiento': [
                {
                    'name': 'Horizontal',
                    'value': 0.50,
                    'type': ItemType.REQUIREMENT
                },
                {
                    'name': 'Salto',
                    'value': 0.50,
                    'type': ItemType.REQUIREMENT
                }
            ],
            'Sonido': [
                {
                    'name': 'Salto',
                    'value': 0.15,
                    'type': ItemType.REQUIREMENT
                }
            ],
            'Animaciones': [
                {
                    'name': 'Idle',
                    'value': 0.20,
                    'type': ItemType.REQUIREMENT
                },
                {
                    'name': 'Correr',
                    'value': 0.20,
                    'type': ItemType.REQUIREMENT
                },
                {
                    'name': 'Salto',
                    'value': 0.20,
                    'type': ItemType.REQUIREMENT
                }
            ]
        },
        'Enemigos & Interacciones': {
            'Movimiento': [
                {
                    'name': 'Rebote del jugador al matar enemigo',
                    'value': 0.40,
                    'type': ItemType.REQUIREMENT
                }
            ],
            'Ataque': [
                {
                    'name': 'Jugador mata enemigo',
                    'value': 1.00,
                    'type': ItemType.REQUIREMENT
                },
                {
                    'name': 'Enemigo mata jugador',
                    'value': 1.00,
                    'type': ItemType.REQUIREMENT
                }
            ],
            'Sonido': [
                {
                    'name': 'Ataque direccional',
                    'value': 0.10,
                    'type': ItemType.REQUIREMENT
                }
            ]
        },
        'Nivel': {
            'Diseño': [
                {
                    'name': 'Nivel con plataformas visibles y colisionables',
                    'value': 0.75,
                    'type': ItemType.REQUIREMENT
                }
            ]
        },
        'Interfaz': interfaceSubrubric
    }
}

shooterRubric = {
    'id': 'example-1',
    'name': 'Shooter',
    'rubric': {
        'Jugador': {
            'Movimiento': [
                {
                    'name': 'Horizontal',
                    'value': 0.50,
                    'type': ItemType.REQUIREMENT
                }
            ],
            'Animaciones': [
                {
                    'name': 'Idle',
                    'value': 0.25,
                    'type': ItemType.REQUIREMENT
                },
                {
                    'name': 'Movimiento',
                    'value': 0.25,
                    'type': ItemType.REQUIREMENT
                },
                {
                    'name': 'Disparo',
                    'value': 0.25,
                    'type': ItemType.REQUIREMENT
                }
            ],
            'Proyectil': [
                {
                    'name': 'Jugador puede disparar (crear un proyectil)',
                    'value': 0.50,
                    'type': ItemType.REQUIREMENT
                }
            ],
            'Sonido': [
                {
                    'name': 'Disparo',
                    'value': 0.25,
                    'type': ItemType.REQUIREMENT
                }
            ]
        },
        'Enemigo & Interacciones': {
            'Proyectil': [
                {
                    'name': 'Se mueve',
                    'value': 0.25,
                    'type': ItemType.REQUIREMENT
                }
            ],
            'Ataque': [
                {
                    'name': 'Proyectil mata enemigo',
                    'value': 1.00,
                    'type': ItemType.REQUIREMENT
                },
                {
                    'name': 'Enemigo mata jugador',
                    'value': 1.00,
                    'type': ItemType.REQUIREMENT
                }
            ]
        },
        'Nivel': {
            'Diseño': [
                {
                    'name': 'Nivel con bloques visibles y colisionables',
                    'value': 0.75,
                    'type': ItemType.REQUIREMENT
                }
            ]
        },
        'Interfaz': interfaceSubrubric
    }
}


arcadeRubric = {
    'id': 'example-2',
    'name': 'Arcade',
    'rubric': {
        'Jugador': {
            'Movimiento': [
                {
                    'name': 'Multidireccional',
                    'value': 1.00,
                    'type': ItemType.REQUIREMENT
                }
            ],
            'Animaciones': [
                {
                    'name': 'Idle',
                    'value': 0.25,
                    'type': ItemType.REQUIREMENT
                },
                {
                    'name': 'Movimiento',
                    'value': 0.25,
                    'type': ItemType.REQUIREMENT
                },
                {
                    'name': 'Recolección',
                    'value': 0.25,
                    'type': ItemType.REQUIREMENT
                }
            ]
        },
        'Enemigo & Interacciones': {
            'Consumible': [
                {
                    'name': 'Se puede recoger',
                    'value': 1.00,
                    'type': ItemType.REQUIREMENT
                }
            ],
            'Sonido': [
                {
                    'name': 'Recolección de consumible',
                    'value': 0.25,
                    'type': ItemType.REQUIREMENT
                },
                {
                    'name': 'Muerte de jugador',
                    'value': 0.25,
                    'type': ItemType.REQUIREMENT
                }
            ],
            'Ataque': [
                {
                    'name': 'Enemigo mata jugador',
                    'value': 1.00,
                    'type': ItemType.REQUIREMENT
                }
            ]
        },
        'Nivel': {
            'Diseño': [
                {
                    'name': 'Nivel con muros visibles y colisionables',
                    'value': 0.75,
                    'type': ItemType.REQUIREMENT
                }
            ]
        },
        'Interfaz': interfaceSubrubric
    }
}
