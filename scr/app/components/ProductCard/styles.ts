import { StyleSheet } from "react-native";

import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        borderRadius: 14,
        padding: 14,
        gap: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
    },
    name: {
        flex: 1,
        fontSize: 17,
        fontWeight: "700",
        color: colors.text,
    },
    category: {
        alignSelf: "flex-start",
        backgroundColor: colors.primarySoft,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    categoryText: {
        fontSize: 12,
        fontWeight: "700",
        color: colors.primaryDark,
    },
    description: {
        fontSize: 14,
        color: colors.textMuted,
    },
    footer: {
        flexDirection: "row",
        gap: 8,
    },
    info: {
        flex: 1,
        backgroundColor: colors.background,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    infoLabel: {
        fontSize: 11,
        color: colors.textMuted,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.text,
    },
});
