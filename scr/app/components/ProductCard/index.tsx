import { Text, TouchableOpacity, View } from "react-native";
import { Trash2 } from "lucide-react-native";

import { Product } from "../../types/Product";
import { colors } from "../../theme/colors";
import { formatPrice } from "../../utils/format";
import { styles } from "./styles";

type Props = {
    data: Product
    onRemove: () => void
}

export function ProductCard({ data, onRemove }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.name}>{data.name}</Text>

                <TouchableOpacity activeOpacity={0.7} onPress={onRemove} hitSlop={10}>
                    <Trash2 size={23} color={colors.danger} />
                </TouchableOpacity>
            </View>

            <View style={styles.category}>
                <Text style={styles.categoryText}>{data.category}</Text>
            </View>

            {data.description ? (
                <Text style={styles.description}>{data.description}</Text>
            ) : null}

            <View style={styles.footer}>
                <View style={styles.info}>
                    <Text style={styles.infoLabel}>Preço</Text>
                    <Text style={styles.infoValue}>
                        {data.price === null ? "Não informado" : formatPrice(data.price)}
                    </Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.infoLabel}>Quantidade</Text>
                    <Text style={styles.infoValue}>{data.quantity}</Text>
                </View>
            </View>
        </View>
    )
}
