import { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/search";
import icons from "@/constants/icons";
import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {
  const params = useLocalSearchParams<{query? : string; filter?: string}>();
  

  const { data: properties, loading, refetch } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit : 20
    },
    skip:true,
  })


  //Handle the pressing of card
  const handleCardPress = (id:string) => router.push(`/properties/${id}`);


  //Call refetch whenever params or query value changes
  useEffect(() => {
    refetch({
      filter: params.filter === 'All' ? undefined : params.filter!,
      query: params.query!,
      limit : 20
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white h-full">
      {/* <Button title="Seed" onPress={seed}/> */}
      <FlatList
        data={properties}
        renderItem={({ item }) => <Card item={item} onPress={() => handleCardPress(item.$id)} />}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size={"large"} className="text-primary-300 mt-5" /> ) : <NoResults />
          
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row justify-between items-center mt-5">
              <TouchableOpacity onPress={router.back} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>
              <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">Seach for your ideal home</Text>
              <Image source={icons.bell} className="w-6 h-6" />
            </View>

            <Search />

            <View className="mt-5">
              <Filters />
              <Text className="font-rubik-bold text-xl text-black-300 mt-5">Found {properties?.length} properties</Text>
            </View>
          </View>
        }
      />



    </SafeAreaView>
  );
}
