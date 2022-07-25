enum FieldType {
    CHASM = -2,
    MARSH = -1,
    GRASSLAND = 0,
    FOREST = 1,
    HILL = 2,
    MOUNTAIN = 3
}

export function getColor(type: FieldType): string {
    const map = new Map()
    map.set(FieldType.CHASM, "#141513")
    map.set(FieldType.MARSH, "#C8CFB2")
    map.set(FieldType.GRASSLAND, "#9DCE50")
    map.set(FieldType.FOREST, "#5F960A")
    map.set(FieldType.HILL, "#B59F52")
    map.set(FieldType.MOUNTAIN, "#6F590B")
    return map.get(type)
}

export function getFieldType(type: string): FieldType {
    const map = new Map()
    map.set("CHASM", FieldType.CHASM)
    map.set("MARSH", FieldType.MARSH)
    map.set("GRASSLAND", FieldType.GRASSLAND)
    map.set("FOREST", FieldType.FOREST)
    map.set("HILL", FieldType.HILL)
    map.set("MOUNTAIN", FieldType.MOUNTAIN)
    return map.get(type)
}

export function getFieldTypeImage(type: FieldType): string {
    const map = new Map()
    map.set(FieldType.CHASM, "chasm.png")
    map.set(FieldType.MARSH, "marsh.png")
    map.set(FieldType.GRASSLAND, "grassland.png")
    map.set(FieldType.FOREST, "forest.png")
    map.set(FieldType.HILL, "hill.png")
    map.set(FieldType.MOUNTAIN, "mountain.png")
    return map.get(type)
}

export function getFieldTypeDesc(type: FieldType): string {
    const map = new Map()
    map.set(FieldType.CHASM, "Abismo")
    map.set(FieldType.MARSH, "Pântano")
    map.set(FieldType.GRASSLAND, "Gramado")
    map.set(FieldType.FOREST, "Floresta")
    map.set(FieldType.HILL, "Colina")
    map.set(FieldType.MOUNTAIN, "Montanha")
    return map.get(type)
}

export default FieldType
