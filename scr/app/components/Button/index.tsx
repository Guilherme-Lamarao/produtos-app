import { ReactNode } from "react";
import { TouchableOpacity, Text } from "react-native";

import { styles } from "./styles";

type Props = {
    title: string
    onPress?: () => void
    activeOpacity?: number
    disabled?: boolean
    icon?: ReactNode
}

export function Button({ title, onPress, activeOpacity = 0.8, disabled = false, icon }: Props) {
    return (
        <TouchableOpacity
            style={[styles.container, disabled && styles.disabled]}
            activeOpacity={activeOpacity}
            onPress={onPress}
            disabled={disabled}
        >
            {icon}
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}
