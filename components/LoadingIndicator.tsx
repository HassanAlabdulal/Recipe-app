import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

interface LoadingIndicatorProps {
  showText?: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  showText = true,
}) => {
  return (
    <View style={styles.loadingContainer}>
      <Progress.Circle
        size={30}
        indeterminate={true}
        thickness={3}
        borderColor={"#F6A028"}
        borderWidth={2}
      />
      {showText && (
        <Text style={styles.loadingText}>Getting recipes for you...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default LoadingIndicator;
