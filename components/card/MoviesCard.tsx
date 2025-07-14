import { getGenreNameById } from '@/Services/constants';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const MoviesCard = ({ title, id, poster_path, genre_ids, vote_average }: Movie) => {

    const imageUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : `https://placehold.co/600x400/1a1a1a/ffffff.png`;


    return (
        <Link className='mb-5' href={`/movies/${id}`} asChild>
            <TouchableOpacity className='w-[30%]'>
                <View className='relative'>
                    <Image
                        source={{ uri: imageUrl }}
                        transition={1000}
                        contentFit="cover"
                        cachePolicy="disk"
                        // className='w-[116px] h-[167px] rounded'
                        style={{ width: "100%", height: 167, borderRadius: 8 }}
                    />
                </View>
                <Text className='font-bold text-xs mt-2 text-white'>{title}</Text>
                <View className='flex-row gap-1 items-center'>
                    <AntDesign name="star" size={10} color="#FFCD1A" />
                    <Text className='font-bold text-[10px] text-white'>{vote_average.toFixed(1)}</Text>
                </View>
                <View className="flex-row items-center flex-wrap">
                    {genre_ids.map((id, index) => (
                        <React.Fragment key={id}>
                            <Text className="text-[10px] text-primary-500">{getGenreNameById(id)}</Text>
                            {index < genre_ids.length - 1 && (
                                <Entypo
                                    name="dot-single"
                                    size={16}
                                    color="#9CA4AB"
                                    style={{ marginHorizontal: 1 }}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </View>


            </TouchableOpacity>
        </Link>
    )
}

export default MoviesCard