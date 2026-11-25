import { StyleSheet } from "react-native";

import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        gap: 8,
    },
    wrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    chip: {
        paddingHorizontal: 14,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.primarySoft,
        alignItems: "center",
        justifyContent: "center",
    },
    chipActive: {
        backgroundColor: colors.primary,
    },
    text: {
        fontSize: 13,
        fontWeight: "600",
        color: colors.primaryDark,
    },
    textActive: {
        color: colors.white,
    },
});
