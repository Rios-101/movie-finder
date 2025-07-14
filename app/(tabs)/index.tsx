import MoviesCard from "@/components/card/MoviesCard";
import PopularMoviesCard from "@/components/card/PopularMoviesCard";
import Searchbar from "@/components/general/Searchbar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ReactQuaryOptions } from "@/Services/constants";
import { getPopularMovies } from "@/Services/endpoint";
import { APICall } from "@/utility/functions";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {

  const [query, setQuery] = useState("");

  const fetchMovies = async (sortBy = "popularity.desc") => {
    const response = await APICall(getPopularMovies, [1, sortBy])
    return response.data
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["movies"],
    queryFn: () => fetchMovies("popularity.desc"),
    ...ReactQuaryOptions
  });
  const { data: latestMoviesData, isLoading: latestMoviesIsLoading, error: latestMoviesError } = useQuery({
    queryKey: ["latestMovies"],
    queryFn: () => fetchMovies("release_date.desc"),
    ...ReactQuaryOptions
  });






  return (
    <View className="flex-1 bg-primary-100 ">
      <Image source={images.bg} className="w-full absolute" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
        minHeight: "100%",
        paddingBottom: 10
      }}>
        <Image source={icons.logo} className="mx-auto w-12 h-10 mt-20 mb-5" />


        <View className="flex-1 mt-4 mx-5">
          <Searchbar
            value={query}
            onChangeText={setQuery}
            onClear={() => setQuery("")}
            onPress={() => router.push("/search")}
            placeholder="Search through 300+ movies online"
          />
          <>
            <Text className="text-white text-lg mt-7 mb-3 ">Popular movies</Text>

            {isLoading && (
              <ActivityIndicator
                size={"large"}
                color={"0000ff"}
                className="self-center mt-10"
              />
            )}

            {error && (
              <Text>Error Loading Movie</Text>
            )}

            {!isLoading && data && (
              <FlatList
                data={data?.results}
                renderItem={({ item, index }) => (
                  <PopularMoviesCard {...item} index={index} />
                )}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{
                  paddingHorizontal: 6,
                }}
                ItemSeparatorComponent={() => <View className="w-7" />}
              />
            )}

            <Text className="text-white text-[20px]  mb-3 ">Latest movies</Text>

            {latestMoviesIsLoading && (
              <ActivityIndicator
                size={"large"}
                color={"0000ff"}
                className="self-center mt-10"
              />
            )}

            {latestMoviesError && (
              <Text>Error Loading Movie</Text>
            )}

            {!latestMoviesError && latestMoviesData && (
              <FlatList
                data={latestMoviesData?.results}
                renderItem={({ item, index }) => (
                  <MoviesCard {...item} index={index} />
                )}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                numColumns={3}
                columnWrapperStyle={{
                  gap: 20,
                  justifyContent: "flex-start",

                }}
              />
            )}

          </>
        </View>

      </ScrollView>
    </View>
  );
}
