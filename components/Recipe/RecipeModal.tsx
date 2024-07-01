import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import RecipeDetails from "./recipeDetails";
import { RecipeData } from "../../types";

interface RecipeModalProps {
  visible: boolean;
  recipe: RecipeData | null;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({
  visible,
  recipe,
  onClose,
  onToggleFavorite,
}) => {
  const [localRecipe, setLocalRecipe] = useState<RecipeData | null>(recipe);

  useEffect(() => {
    setLocalRecipe(recipe);
  }, [recipe]);

  const handleToggleFavorite = () => {
    if (localRecipe) {
      onToggleFavorite(localRecipe.id);
      setLocalRecipe({ ...localRecipe, favorite: !localRecipe.favorite });
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Recipe Details</Text>
          {localRecipe && (
            <RecipeDetails
              recipe={localRecipe}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    height: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  closeButton: {
    alignSelf: "center",
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#F6A028",
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default RecipeModal;
