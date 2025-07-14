import { images } from '@/constants/images'
import { getGenreNameById } from '@/Services/constants'
import { AntDesign, Entypo } from '@expo/vector-icons'
import MaskedView from '@react-native-masked-view/masked-view'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React from 'react'
import { Image as RiosImage, Text, TouchableOpacity, View } from 'react-native'

const PopularMoviesCard = ({ title, id, poster_path, genre_ids, vote_average, index }: Movie & { index: number }) => {
    const imageUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : `https://placehold.co/600x400/1a1a1a/ffffff.png`;


    return (
        <Link className='mb-5' href={`/movies/${id}`} asChild>
            <TouchableOpacity className='w-[116px]'>
                <View className='relative'>
                    <Image
                        source={{ uri: imageUrl }}
                        transition={1000}
                        contentFit="cover"
                        cachePolicy="disk"
                        // className='w-[116px] h-[167px] rounded'
                        style={{ width: "100%", height: 167, borderRadius: 8 }}
                    />
                    <View className='absolute -bottom-4  -left-2'>
                        <MaskedView maskElement={
                            <Text className="font-bold text-primary-600  text-6xl">
                                {index + 1}
                            </Text>
                        }>
                            <RiosImage source={images.rankingGradient} className='size-14' resizeMode='cover' />
                        </MaskedView>
                    </View>


                    <View className='flex-row absolute top-0 rounded m-1 right-0 gap-1 items-center bg-[#FFFFFF4D] p-1'>
                        <AntDesign name="star" size={8} color="#FFCD1A" />
                        <Text className='font-bold text-[8px] text-white'>{vote_average.toFixed(1)}</Text>
                    </View>
                </View>
                <Text className='font-bold text-xs mt-2 text-white'>{title}</Text>
                <View className="flex-row items-center flex-wrap">
                    {genre_ids.map((id, index) => (
                        <React.Fragment key={id}>
                            <Text className="text-[10px] text-primary-500">{getGenreNameById(id)}</Text>
                            {index < genre_ids.length - 1 && (
                                <Entypo
                                    name="dot-single"
                                    size={16}
                                    color="#9CA4AB"
                                    style={{ marginHorizontal: 2 }}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </View>


            </TouchableOpacity>
        </Link>
    )
}

export default PopularMoviesCard