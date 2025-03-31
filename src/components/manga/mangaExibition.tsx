import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const MangaCard = ({
  title,
  img,
  chapters,
}: {
  title: string;
  img: string;
  chapters?: string;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: img }} style={styles.image} resizeMode="cover" />
        {chapters && (
          <View style={styles.chaptersIndicator}>
            <Text style={styles.chaptersText}>{chapters}</Text>
          </View>
        )}
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 190,
    margin: 5,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#1E1E1E",
  },
  imageContainer: {
    width: "100%",
    height: 150,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  chaptersIndicator: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "rgba(0, 123, 255, 0.8)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  chaptersText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  titleContainer: {
    padding: 6,
    justifyContent: "center",
    height: 40,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 12,
    textAlign: "center",
  },
});

export default MangaCard;
