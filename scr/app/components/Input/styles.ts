import { StyleSheet } from "react-native";

import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        gap: 6,
    },
    label: {
        fontSize: 13,
        fontWeight: "700",
        color: colors.text,
    },
    input: {
        backgroundColor: colors.white,
        paddingHorizontal: 14,
        height: 46,
        width: "100%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        fontSize: 15,
        color: colors.text,
    },
    inputError: {
        borderColor: colors.danger,
    },
    error: {
        fontSize: 12,
        color: colors.danger,
    },
});
