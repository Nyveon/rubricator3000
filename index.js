const ItemType = {
	REQUIREMENT: "0",
	DISCOUNT: "1",
	BONUS: "2",
};

const ItemTypeName = {
	[ItemType.REQUIREMENT]: "Requisito",
	[ItemType.DISCOUNT]: "Descuento",
	[ItemType.BONUS]: "Bonus",
};

const itemTemplate = {
	value: "",
	name: "",
	type: ItemType.REQUIREMENT,
    checked: false
};

const subcategoryTemplate = {
	name: "",
	criteria: [],
};

const categoryTemplate = {
	name: "",
	subcategories: [],
};

function formatTypeAndValue(type, value) {
	const formattedValue = parseFloat(value).toFixed(2);

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


function subcategoryTotalPossible(subcategory) {
    return subcategory.criteria.reduce((acc, criterion) => {
        if (criterion.type === ItemType.REQUIREMENT) {
            return acc + parseFloat(criterion.value);
        } else {
            return acc;
        }
    }, 0);
}

function subcategoryTotal(subcategory) {
    const possible = subcategoryTotalPossible(subcategory);

    return subcategory.criteria.reduce((acc, criterion) => {
        if (criterion.checked) {
            const parsed = parseFloat(criterion.value);

            switch (criterion.type) {
                case ItemType.REQUIREMENT:
                    return acc + parsed;
                case ItemType.DISCOUNT:
                    return Math.max(acc - parsed, 0);
                case ItemType.BONUS:
                    return acc + parsed;
            }
        }
        return acc;
    }, 0);
}

function categoryTotalPossible(category) {
    return category.subcategories.reduce((acc, subcategory) => {
        return acc + subcategoryTotalPossible(subcategory);
    }, 0);
}

function categoryTotal(category) {
    return category.subcategories.reduce((acc, subcategory) => {
        return acc + subcategoryTotal(subcategory);
    }, 0);
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
                        checked: false,
					},
					{
						name: "Descuento ejemplo",
						desc: "No cuenta para el total posible, resta del puntaje total obtenido en la subcategoría. Piso de 0.",
						value: 0.5,
						type: ItemType.DISCOUNT,
                        checked: false,
					},
					{
						name: "Bonus ejemplo",
						desc: "No cuenta para el total posible, suma al puntaje total obtenido en la evaluación entera. Techo de nota 7.",
						value: 0.1,
						type: ItemType.BONUS,
                        checked: false,
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
                        checked: false,
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
                        checked: false,
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
                checked: false,
			},
			{
				name: "Salir del juego",
				value: 0.1,
				type: ItemType.REQUIREMENT,
                checked: false,
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
                checked: false,
			},
			{
				name: "Reiniciar",
				value: 0.1,
				type: ItemType.REQUIREMENT,
                checked: false,
			},
			{
				name: "Volver a menú",
				value: 0.1,
				type: ItemType.REQUIREMENT,
                checked: false,
			},
			{
				name: "Salir del juego",
				value: 0.05,
				type: ItemType.REQUIREMENT,
                checked: false,
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
                checked: false,
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
                            checked: false,
						},
						{
							name: "Salto",
							value: 0.5,
							type: ItemType.REQUIREMENT,
                            checked: false,
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
                            checked: false,
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
                            checked: false,
						},
						{
							name: "Correr",
							value: 0.2,
							type: ItemType.REQUIREMENT,
                            checked: false,
						},
						{
							name: "Salto",
							value: 0.2,
							type: ItemType.REQUIREMENT,
                            checked: false,
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
                            checked: false,
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
                            checked: false,
						},
						{
							name: "Enemigo mata jugador",
							value: 1.0,
							type: ItemType.REQUIREMENT,
                            checked: false,
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
                            checked: false,
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
                            checked: false,
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
                            checked: false,
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
                            checked: false,
						},
						{
							name: "Movimiento",
							value: 0.25,
							type: ItemType.REQUIREMENT,
                            checked: false,
						},
						{
							name: "Disparo",
							value: 0.25,
							type: ItemType.REQUIREMENT,
                            checked: false,
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
                            checked: false,
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
                            checked: false,
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
                            checked: false,
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
                            checked: false,
						},
						{
							name: "Enemigo mata jugador",
							value: 1.0,
							type: ItemType.REQUIREMENT,
                            checked: false,
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
                            checked: false,
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
                            checked: false,
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
                            checked: false,
						},
						{
							name: "Movimiento",
							value: 0.25,
							type: ItemType.REQUIREMENT,
                            checked: false,
						},
						{
							name: "Recolección",
							value: 0.25,
							type: ItemType.REQUIREMENT,
                            checked: false,
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
                            checked: false,
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
                            checked: false,
						},
						{
							name: "Muerte de jugador",
							value: 0.25,
							type: ItemType.REQUIREMENT,
                            checked: false,
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
                            checked: false,
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
                            checked: false,
						},
					],
				},
			],
		},
		{ name: "Interfaz", subcategories: interfaceSubrubric },
	],
};
