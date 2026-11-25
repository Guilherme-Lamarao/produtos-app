import { StyleSheet } from "react-native";

import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        height: 48,
        width: "100%",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    disabled: {
        opacity: 0.6,
    },
    text: {
        color: colors.white,
        fontSize: 15,
        fontWeight: "700",
    },
});
