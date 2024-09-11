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
	checked: false,
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

function rubricTotalPossible(rubric) {
	return rubric.rubric.reduce((acc, category) => {
		return acc + categoryTotalPossible(category);
	}, 0);
}

function rubricTotal(rubric) {
	return rubric.rubric.reduce((acc, category) => {
		return acc + categoryTotal(category);
	}, 0);
}

function getDiscountSummary(rubric) {
	let descuentos = [];
	for (const category of rubric.rubric) {
		let categoryDescuentos = "";
		let categoryHasDescuentos = false;

		for (const subcategory of category.subcategories) {
			let subcategoryDescuentos = "";
			let subcategoryHasDescuentos = false;

			for (const criteria of subcategory.criteria) {
				if (!criteria.checked && criteria.type === ItemType.REQUIREMENT) {
					subcategoryDescuentos += `  -${criteria.value.toFixed(2)} | ${
						criteria.name
					}\n`;
					subcategoryHasDescuentos = true;
				} else if (criteria.checked && criteria.type === ItemType.DISCOUNT) {
                    subcategoryDescuentos += `  -${criteria.value.toFixed(2)} | ${
                        criteria.name
                    }\n`;
                    subcategoryHasDescuentos = true;
                }
			}

			if (subcategoryHasDescuentos) {
				categoryDescuentos += `• ${subcategory.name} (${categoryTotal(
					category
				).toFixed(2)}/${categoryTotalPossible(category).toFixed(
					2
				)}):\n${subcategoryDescuentos}`;
				categoryHasDescuentos = true;
			}
		}

		if (categoryHasDescuentos) {
			descuentos.push(`${category.name}:\n${categoryDescuentos}`);
		}
	}

	if (descuentos.length === 0) {
		return "";
	}

	return "\nDescuentos:\n" + descuentos.join("\n");
}

function getBonusSummary(rubric) {
	let bonos = [];
	for (const category of rubric.rubric) {
		let categoryBonos = "";
		let categoryHasBonos = false;

		for (const subcategory of category.subcategories) {
			let subcategoryBonos = "";
			let subcategoryHasBonos = false;

			for (const criteria of subcategory.criteria) {
				if (criteria.checked && criteria.type === ItemType.BONUS) {
					subcategoryBonos += `  +${criteria.value.toFixed(2)} | ${
						criteria.name
					}\n`;
					subcategoryHasBonos = true;
				}
			}

			if (subcategoryHasBonos) {
				categoryBonos += `• ${subcategory.name} (${categoryTotal(
					category
				).toFixed(2)}/${categoryTotalPossible(category).toFixed(
					2
				)}):\n${subcategoryBonos}`;
				categoryHasBonos = true;
			}
		}

		if (categoryHasBonos) {
			bonos.push(`${category.name}:\n${categoryBonos}`);
		}
	}

	if (bonos.length === 0) {
		return "";
	}

	return "\nBonos:\n" + bonos.join("\n");
}

function getNota(rubric) {
	const totalPossible = rubricTotalPossible(rubric);
	const totalAchieved = rubricTotal(rubric);
	return Math.min((totalAchieved / totalPossible) * 7, 7);
}

/*
Nota: <span x-text="getNota()"></span>/7.00
<!--             -->Puntaje: <span x-text="rubricTotal(rubrics[selectedRubric]).toFixed(2)"></span>/<span x-text="rubricTotalPossible(rubrics[selectedRubric]).toFixed(2)"></span>
<!--             -->Rúbrica: <span x-text="rubrics[selectedRubric].name"></span>                    
<!--             --><template x-if="getDiscountSummary(rubrics[selectedRubric])"><div x-text="getDiscountSummary(rubrics[selectedRubric])"></div></template>
<!--             --><template x-if="getBonusSummary(rubrics[selectedRubric])"><div x-text="getBonusSummary(rubrics[selectedRubric])"></div></template>
<!--             --><template x-if="comentarios"><div>Comentarios: <span x-text="comentarios"></span></div></template>
<!--             -->Revisado por: <span x-text="revisadoPor"></span></code></pre>
*/

function buildOutput(rubric, revisadoPor) {

    let output = '';
    output += `Nota: ${getNota(rubric).toFixed(2)}/7.00\n`;
    output += `Puntaje: ${rubricTotal(rubric).toFixed(2)}/${rubricTotalPossible(rubric).toFixed(2)}\n`;
    output += `Rúbrica: ${rubric.name}\n`;

    const discountSummary = getDiscountSummary(rubric);
    if (discountSummary) {
        output += discountSummary;
    }

    const bonusSummary = getBonusSummary(rubric);
    if (bonusSummary) {
        output += bonusSummary;
    }

    if (rubric.comentarios) {
        output += `\nComentarios: ${rubric.comentarios}\n`;
    }

    output += `\nRevisado por: ${revisadoPor}`;


	return output;
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
    comentarios: "",
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
    comentarios: "",
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
    comentarios: "",
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
