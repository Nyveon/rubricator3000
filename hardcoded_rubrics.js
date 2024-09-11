const ItemType = {
	REQUIREMENT: "0",
	DISCOUNT: "1",
	BONUS: "2",
};

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
			return "requirement";
		case ItemType.DISCOUNT:
			return "discount";
		case ItemType.BONUS:
			return "bonus";
	}
}

exampleRubric = [
	{
		name: "Categoría 1",
		subcategories: [
			{
				name: "Subcategoría 1.a",
				criteria: [
					{
						name: "Requisito ejemplo",
						desc: "Cuenta para el total posible, suma al total obtenido en la subcategoría",
						value: 1.5,
						type: ItemType.REQUIREMENT,
					},
					{
						name: "Descuento ejemplo",
						desc: "No cuenta para el total posible, resta del puntaje total obtenido en la subcategoría. Piso de 0.",
						value: 0.5,
						type: ItemType.DISCOUNT,
					},
					{
						name: "Bonus ejemplo",
						desc: "No cuenta para el total posible, suma al puntaje total obtenido en la evaluación entera. Techo de nota 7.",
						value: 0.1,
						type: ItemType.BONUS,
					},
				],
			},
			{
				name: "Subcategoría 1.b",
				criteria: [
					{
						name: "Criterio 1.b.1",
						value: 1.5,
						type: ItemType.REQUIREMENT,
					},
				],
			},
		],
	},
	{
		name: "Categoría 2",
		subcategories: [
			{
				name: "Subcategoría 2.a",
				criteria: [
					{
						name: "Criterio 2.a.1",
						value: 0.1,
						type: ItemType.REQUIREMENT,
					},
				],
			},
		],
	},
];

interfaceSubrubric = [
	{
		name: "Menú Principal",
		criteria: [
			{
				name: "Acceder al nivel",
				value: 0.1,
				type: ItemType.REQUIREMENT,
			},
			{
				name: "Salir del juego",
				value: 0.1,
				type: ItemType.REQUIREMENT,
			},
		],
	},
	{
		name: "Menú de pausa",
		criteria: [
			{
				name: "Continuar",
				value: 0.1,
				type: ItemType.REQUIREMENT,
			},
			{
				name: "Reiniciar",
				value: 0.1,
				type: ItemType.REQUIREMENT,
			},
			{
				name: "Volver a menú",
				value: 0.1,
				type: ItemType.REQUIREMENT,
			},
			{
				name: "Salir del juego",
				value: 0.05,
				type: ItemType.REQUIREMENT,
			},
		],
	},
	{
		name: "Créditos",
		criteria: [
			{
				name: "Mencionar assets",
				value: 0.45,
				type: ItemType.REQUIREMENT,
			},
		],
	},
];

platformerRubric = {
	id: "example-0",
	name: "Platformer",
	rubric: [
		{
			name: "Jugador",
			subcategories: [
				{
					name: "Movimiento",
					criteria: [
						{
							name: "Horizontal",
							value: 0.5,
							type: ItemType.REQUIREMENT,
						},
						{
							name: "Salto",
							value: 0.5,
							type: ItemType.REQUIREMENT,
						},
					],
				},
				{
					name: "Sonido",
					criteria: [
						{
							name: "Salto",
							value: 0.15,
							type: ItemType.REQUIREMENT,
						},
					],
				},
				{
					name: "Animaciones",
					criteria: [
						{
							name: "Idle",
							value: 0.2,
							type: ItemType.REQUIREMENT,
						},
						{
							name: "Correr",
							value: 0.2,
							type: ItemType.REQUIREMENT,
						},
						{
							name: "Salto",
							value: 0.2,
							type: ItemType.REQUIREMENT,
						},
					],
				},
			],
		},
		{
			name: "Enemigos & Interacciones",
			subcategories: [
				{
					name: "Movimiento",
					criteria: [
						{
							name: "Rebote del jugador al matar enemigo",
							value: 0.4,
							type: ItemType.REQUIREMENT,
						},
					],
				},
				{
					name: "Ataque",
					criteria: [
						{
							name: "Jugador mata enemigo",
							value: 1.0,
							type: ItemType.REQUIREMENT,
						},
						{
							name: "Enemigo mata jugador",
							value: 1.0,
							type: ItemType.REQUIREMENT,
						},
					],
				},
				{
					name: "Sonido",
					criteria: [
						{
							name: "Ataque direccional",
							value: 0.1,
							type: ItemType.REQUIREMENT,
						},
					],
				},
			],
		},
		{
			name: "Nivel",
			subcategories: [
				{
					name: "Diseño",
					criteria: [
						{
							name: "Nivel con plataformas visibles y colisionables",
							value: 0.75,
							type: ItemType.REQUIREMENT,
						},
					],
				},
			],
		},
		{ name: "Interfaz", subcategories: interfaceSubrubric },
	],
};

shooterRubric = {
	id: "example-1",
	name: "Shooter",
	rubric: [
		{
			name: "Jugador",
			subcategories: [
				{
					name: "Movimiento",
					criteria: [
						{
							name: "Horizontal",
							value: 0.5,
							type: ItemType.REQUIREMENT,
						},
					],
				},
				{
					name: "Animaciones",
					criteria: [
						{
							name: "Idle",
							value: 0.25,
							type: ItemType.REQUIREMENT,
						},
						{
							name: "Movimiento",
							value: 0.25,
							type: ItemType.REQUIREMENT,
						},
						{
							name: "Disparo",
							value: 0.25,
							type: ItemType.REQUIREMENT,
						},
					],
				},
				{
					name: "Proyectil",
					criteria: [
						{
							name: "Jugador puede disparar (crear un proyectil)",
							value: 0.5,
							type: ItemType.REQUIREMENT,
						},
					],
				},
				{
					name: "Sonido",
					criteria: [
						{
							name: "Disparo",
							value: 0.25,
							type: ItemType.REQUIREMENT,
						},
					],
				},
			],
		},
		{
			name: "Enemigo & Interacciones",
			subcategories: [
				{
					name: "Proyectil",
					criteria: [
						{
							name: "Se mueve",
							value: 0.25,
							type: ItemType.REQUIREMENT,
						},
					],
				},
				{
					name: "Ataque",
					criteria: [
						{
							name: "Proyectil mata enemigo",
							value: 1.0,
							type: ItemType.REQUIREMENT,
						},
						{
							name: "Enemigo mata jugador",
							value: 1.0,
							type: ItemType.REQUIREMENT,
						},
					],
				},
			],
		},
		{
			name: "Nivel",
			subcategories: [
				{
					name: "Diseño",
					criteria: [
						{
							name: "Nivel con bloques visibles y colisionables",
							value: 0.75,
							type: ItemType.REQUIREMENT,
						},
					],
				},
			],
		},
		{ name: "Interfaz", subcategories: interfaceSubrubric },
	],
};

arcadeRubric = {
	id: "example-2",
	name: "Arcade",
	rubric: [
		{
			name: "Jugador",
			subcategories: [
				{
					name: "Movimiento",
					criteria: [
						{
							name: "Multidireccional",
							value: 1.0,
							type: ItemType.REQUIREMENT,
						},
					],
				},
				{
					name: "Animaciones",
					criteria: [
						{
							name: "Idle",
							value: 0.25,
							type: ItemType.REQUIREMENT,
						},
						{
							name: "Movimiento",
							value: 0.25,
							type: ItemType.REQUIREMENT,
						},
						{
							name: "Recolección",
							value: 0.25,
							type: ItemType.REQUIREMENT,
						},
					],
				},
			],
		},
		{
			name: "Enemigo & Interacciones",
			subcategories: [
				{
					name: "Consumible",
					criteria: [
						{
							name: "Se puede recoger",
							value: 1.0,
							type: ItemType.REQUIREMENT,
						},
					],
				},
				{
					name: "Sonido",
					criteria: [
						{
							name: "Recolección de consumible",
							value: 0.25,
							type: ItemType.REQUIREMENT,
						},
						{
							name: "Muerte de jugador",
							value: 0.25,
							type: ItemType.REQUIREMENT,
						},
					],
				},
				{
					name: "Ataque",
					criteria: [
						{
							name: "Enemigo mata jugador",
							value: 1.0,
							type: ItemType.REQUIREMENT,
						},
					],
				},
			],
		},
		{
			name: "Nivel",
			subcategories: [
				{
					name: "Diseño",
					criteria: [
						{
							name: "Nivel con muros visibles y colisionables",
							value: 0.75,
							type: ItemType.REQUIREMENT,
						},
					],
				},
			],
		},
		{ name: "Interfaz", subcategories: interfaceSubrubric },
	],
};
