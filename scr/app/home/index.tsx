import { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { Plus, Search } from "lucide-react-native";

import { Button } from "../components/Button";
import { CategoryChips } from "../components/CategoryChips";
import { Input } from "../components/Input";
import { ProductCard } from "../components/ProductCard";
import { CATEGORIES, Category } from "../constants/categories";
import { getProducts, saveProducts } from "../storage/productsStorage";
import { colors } from "../theme/colors";
import { Product } from "../types/Product";
import { formatPrice, normalizeText } from "../utils/format";
import { styles } from "./styles";

const ALL_CATEGORIES = "Todas";
const FILTER_OPTIONS = [ALL_CATEGORIES, ...CATEGORIES];

type FormErrors = {
  name?: string;
  category?: string;
  price?: string;
  quantity?: string;
};

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Formulário
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [feedback, setFeedback] = useState("");
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Busca e filtro
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>(ALL_CATEGORIES);

  // Recupera os produtos salvos ao abrir o aplicativo.
  useEffect(() => {
    async function loadProducts() {
      try {
        setProducts(await getProducts());
      } catch (error) {
        console.log(error);
        Alert.alert("Erro", "Não foi possível carregar os produtos.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();

    return () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    };
  }, []);

  const visibleProducts = useMemo(() => {
    const term = normalizeText(search);

    return products.filter((product) => {
      const matchesName = normalizeText(product.name).includes(term);
      const matchesCategory =
        filterCategory === ALL_CATEGORIES || product.category === filterCategory;

      return matchesName && matchesCategory;
    });
  }, [products, search, filterCategory]);

  const hasActiveFilters = search.trim() !== "" || filterCategory !== ALL_CATEGORIES;

  // Atualiza o estado e grava a nova lista no AsyncStorage.
  async function updateProducts(newProducts: Product[]) {
    setProducts(newProducts);

    try {
      await saveProducts(newProducts);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível salvar os produtos.");
    }
  }

  function validate(): FormErrors {
    const newErrors: FormErrors = {};
    const trimmedQuantity = quantity.trim();
    const trimmedPrice = price.trim();

    if (!name.trim()) {
      newErrors.name = "Informe o nome do produto.";
    }

    if (!category) {
      newErrors.category = "Selecione uma categoria.";
    }

    if (!trimmedQuantity) {
      newErrors.quantity = "Informe a quantidade.";
    } else if (!/^\d+$/.test(trimmedQuantity)) {
      newErrors.quantity = "Use um número inteiro igual ou maior que zero.";
    }

    if (trimmedPrice && !/^\d+([.,]\d{1,2})?$/.test(trimmedPrice)) {
      newErrors.price = "Informe um preço válido (ex.: 12,50).";
    }

    return newErrors;
  }

  function showFeedback(message: string) {
    setFeedback(message);

    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setFeedback(""), 3000);
  }

  async function handleAdd() {
    if (loading) return;

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0 || !category) return;

    const trimmedPrice = price.trim();

    const newProduct: Product = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2, 8),
      name: name.trim(),
      description: description.trim(),
      price: trimmedPrice ? Number(trimmedPrice.replace(",", ".")) : null,
      quantity: Number(quantity.trim()),
      category,
    };

    setName("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setCategory(null);
    setErrors({});
                    // Garante que o novo produto apareça na lista, mesmo com busca/filtro ativos.
    setSearch("");
    setFilterCategory(ALL_CATEGORIES);

    await updateProducts([newProduct, ...products]);
    showFeedback(
      `"${newProduct.name}" cadastrado${
        newProduct.price !== null ? ` por ${formatPrice(newProduct.price)}` : ""
      }.`
    );
  }

  function handleRemove(product: Product) {
    Alert.alert("Remover produto", `Deseja remover "${product.name}"?`, [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        style: "destructive",
        onPress: () => updateProducts(products.filter((item) => item.id !== product.id)),
      },
    ]);
  }

  function clearError(field: keyof FormErrors) {
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function getEmptyMessage() {
    if (loading) return "Carregando produtos...";
    if (products.length === 0) return "Nenhum produto cadastrado ainda.";
    return "Nenhum produto encontrado para a busca ou o filtro selecionado.";
  }

  const header = (
    <View>
      <View style={styles.hero}>
        <Text style={styles.title}>Meus produtos</Text>
        <Text style={styles.subtitle}>Cadastre e encontre seus itens</Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Nome do produto *"
          placeholder="Ex.: Caderno universitário"
          value={name}
          error={errors.name}
          onChangeText={(value) => {
            setName(value);
            clearError("name");
          }}
        />

        <Input
          label="Descrição"
          placeholder="Ex.: 200 folhas, capa dura"
          value={description}
          onChangeText={setDescription}
        />

        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Input
              label="Preço (R$)"
              placeholder="0,00"
              keyboardType="decimal-pad"
              value={price}
              error={errors.price}
              onChangeText={(value) => {
                setPrice(value);
                clearError("price");
              }}
            />
          </View>

          <View style={styles.rowItem}>
            <Input
              label="Quantidade *"
              placeholder="0"
              keyboardType="number-pad"
              value={quantity}
              error={errors.quantity}
              onChangeText={(value) => {
                setQuantity(value);
                clearError("quantity");
              }}
            />
          </View>
        </View>

        <View>
          <Text style={styles.fieldLabel}>Categoria *</Text>
          <CategoryChips
            wrap
            options={CATEGORIES}
            selected={category}
            onSelect={(option) => {
              setCategory(option as Category);
              clearError("category");
            }}
          />
          {errors.category ? (
            <Text style={styles.fieldError}>{errors.category}</Text>
          ) : null}
        </View>

        <Button
          title="Cadastrar produto"
          icon={<Plus size={20} color={colors.white} />}
          disabled={loading}
          onPress={handleAdd}
        />

        {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
      </View>

      <Text style={styles.sectionTitle}>Buscar produtos</Text>

      <View style={styles.searchBox}>
        <Search size={20} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar pelo nome..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
          returnKeyType="search"
        />
      </View>

      <CategoryChips
        options={FILTER_OPTIONS}
        selected={filterCategory}
        onSelect={setFilterCategory}
      />

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Produtos cadastrados ({products.length})</Text>
        {hasActiveFilters ? (
          <Text style={styles.listCount}>
            Exibindo {visibleProducts.length} de {products.length}
          </Text>
        ) : null}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        data={visibleProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard data={item} onRemove={() => handleRemove(item)} />
        )}
        ListHeaderComponent={header}
        ListEmptyComponent={<Text style={styles.empty}>{getEmptyMessage()}</Text>}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
  );
}
