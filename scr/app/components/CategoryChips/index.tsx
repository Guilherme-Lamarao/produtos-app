import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

type Props = {
    options: readonly string[]
    selected: string | null
    onSelect: (option: string) => void
    // true: chips quebram linha (formulário). false: rolagem horizontal (filtro).
    wrap?: boolean
}

export function CategoryChips({ options, selected, onSelect, wrap = false }: Props) {
    const chips = options.map((option) => {
        const isActive = option === selected;

        return (
            <TouchableOpacity
                key={option}
                style={[styles.chip, isActive && styles.chipActive]}
                activeOpacity={0.8}
                onPress={() => onSelect(option)}
            >
                <Text style={[styles.text, isActive && styles.textActive]}>{option}</Text>
            </TouchableOpacity>
        );
    });

    if (wrap) {
        return <View style={styles.wrap}>{chips}</View>;
    }

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.row}
        >
            {chips}
        </ScrollView>
    );
}
