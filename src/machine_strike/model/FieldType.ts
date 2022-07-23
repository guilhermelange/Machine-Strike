enum FieldType {
    CHASM = -2,
    MARSH = -1,
    GRASSLAND = 0,
    FOREST = 1,
    HILL = 2,
    MOUNTAIN = 3
}

export function getColor(type: FieldType): string {
    var map = new Map()
    map.set(FieldType.CHASM, "#141513")
    map.set(FieldType.MARSH, "#C8CFB2")
    map.set(FieldType.GRASSLAND, "#9DCE50")
    map.set(FieldType.FOREST, "#5F960A")
    map.set(FieldType.HILL, "#B59F52")
    map.set(FieldType.MOUNTAIN, "#6F590B")
    return map.get(type)
}

export function getFieldType(type: string): FieldType {
    var map = new Map()
    map.set("CHASM", FieldType.CHASM)
    map.set("MARSH", FieldType.MARSH)
    map.set("GRASSLAND", FieldType.GRASSLAND)
    map.set("FOREST", FieldType.FOREST)
    map.set("HILL", FieldType.HILL)
    map.set("MOUNTAIN", FieldType.MOUNTAIN)
    return map.get(type)
}

export default FieldType
