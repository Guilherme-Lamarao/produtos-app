import { Text, TextInput, TextInputProps, View } from "react-native";

import { colors } from "../../theme/colors";
import { styles } from "./styles";

type Props = TextInputProps & {
    label?: string
    error?: string
}

export function Input({ label, error, ...rest }: Props) {
    return (
        <View style={styles.wrapper}>
            {label ? <Text style={styles.label}>{label}</Text> : null}

            <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                placeholderTextColor={colors.textMuted}
                {...rest}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}
