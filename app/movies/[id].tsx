import { ReactQuaryOptions } from '@/Services/constants'
import { getMovie } from '@/Services/endpoint'
import { APICall, convertMinutesToHoursMinutes, formatDateLong, formatToMillionUSD, getYearFromDate } from '@/utility/functions'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams } from 'expo-router'
import React, { useMemo } from 'react'
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native'


const MovieDetails = () => {

    const { id } = useLocalSearchParams()

    const fetchMovie = async (movieId: string | string[]): Promise<MovieDetailResponse> => {
        const response = await APICall(getMovie, [movieId])
        return response.data as MovieDetailResponse
    }

    const { data, isLoading, error } = useQuery<MovieDetailResponse>({
        queryKey: ["movie", id],
        queryFn: () => fetchMovie(id),
        enabled: Array.isArray(id) ? id.length > 0 : !!id,
        ...ReactQuaryOptions
    });

    const imageUrl = useMemo(() => {
        if (data?.poster_path) {
            return `https://image.tmdb.org/t/p/w500${data.poster_path}`;
        }
    }, [data?.poster_path]);

    if (isLoading) {
        // Skeleton Loading State
        return (
            <ScrollView
                contentContainerStyle={{
                    minHeight: '100%',
                    padding: 16
                }}
                className="bg-primary-100"
            >
                <View style={{ width: '100%', height: 447, backgroundColor: '#333', borderRadius: 8 }} />
                <View style={{ height: 20 }} />
                <View style={{ width: '60%', height: 24, backgroundColor: '#444', borderRadius: 4 }} />
                <View style={{ height: 12 }} />
                <View style={{ width: '40%', height: 16, backgroundColor: '#444', borderRadius: 4 }} />
                <View style={{ height: 20 }} />
                <View style={{ width: '80%', height: 16, backgroundColor: '#444', borderRadius: 4 }} />
                <View style={{ height: 8 }} />
                <View style={{ width: '90%', height: 16, backgroundColor: '#444', borderRadius: 4 }} />
                <View style={{ height: 8 }} />
                <View style={{ width: '75%', height: 16, backgroundColor: '#444', borderRadius: 4 }} />
            </ScrollView>
        )
    }

    if (error) {
        // Error State
        return (
            <View className="flex-1 bg-primary-100 justify-center items-center px-4">
                <Text className="text-white text-center text-base font-semibold">
                    Something went wrong while fetching the movie details.
                </Text>
                <TouchableOpacity
                    onPress={() => Linking.openURL('https://www.themoviedb.org/')}
                    className="mt-4 px-4 py-2 bg-primary-800 rounded"
                >
                    <Text className="text-white text-sm">Go to TMDB</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View className="flex-1 bg-primary-100">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    minHeight: '100%',
                    paddingBottom: 80
                }}
            >
                <Image
                    source={{ uri: imageUrl }}
                    transition={1000}
                    contentFit="cover"
                    cachePolicy="disk"
                    // className='w-[116px] h-[167px] rounded'
                    style={{ width: "100%", height: 447, borderRadius: 8 }}
                />
                <View className='px-4'>
                    <Text className='mt-6 text-white font-bold text-[20px]'>{data?.title}</Text>
                    <View className='flex-row mt-3 '>
                        <Text className='text-sm text-primary-900'>{getYearFromDate(data?.release_date ?? "")}</Text>
                        <Entypo
                            name="dot-single"
                            size={16}
                            color="#9CA4AB"
                            style={{ marginHorizontal: 2 }}
                        />
                        <Text className='text-sm text-primary-900'>{convertMinutesToHoursMinutes(data?.runtime ?? 0)}</Text>
                    </View>
                    <View
                        className='mt-4 gap-1 h-[30px] flex-row justify-center items-center px-3 bg-primary-800 rounded-md'
                        style={{
                            alignSelf: "flex-start", // shrink to fit content
                        }}
                    >
                        <AntDesign name="star" size={14} color="#FFCD1A" />
                        <Text className='font-semibold text-white text-xs'>{data?.vote_average}<Text className='text-xs text-primary-900'>/10({data?.vote_count})</Text></Text>
                    </View>

                    <View className='mt-8'>
                        <Text className='text-xs text-primary-900'>Overview</Text>
                        <Text className="mt-2 text-sm text-white">{data?.overview}</Text>
                    </View>

                    <View className='mt-6 flex-row items-center justify-between'>
                        <View>
                            <Text className='text-xs text-primary-900'>Release date</Text>
                            <Text className='text-sm text-secoundry-100 font-semibold'>{formatDateLong(data?.release_date ?? "")}</Text>
                        </View>
                        <View className='mr-5'>
                            <Text className='text-xs text-primary-900'>Status</Text>
                            <Text className='text-sm text-secoundry-100 font-semibold'>{data?.status}</Text>
                        </View>
                    </View>

                    <View className="mt-6">
                        <Text className='text-xs text-primary-900'>Generes</Text>
                        <View className='flex-row items-center gap-3'>
                            {data?.genres.map((ele, index) => (
                                <View
                                    key={index}
                                    className='mt-2 gap-1 h-[30px] flex-row justify-center items-center px-3 bg-primary-800 rounded-md'
                                    style={{
                                        alignSelf: "flex-start", // shrink to fit content
                                    }}
                                >
                                    <Text className='text-xs text-white'>{ele?.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View className="mt-6">
                        <Text className='text-xs text-primary-900'>Countries</Text>
                        <View className='flex-row mt-1 items-center flex-wrap'>
                            {data?.production_countries.map((ele, index) => (
                                <React.Fragment key={index}>
                                    <Text className="text-sm font-semibold text-secoundry-100">{ele?.name}</Text>
                                    {index < data?.production_countries.length - 1 && (
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
                    </View>

                    <View className="mt-6 flex-row items-center gap-8">
                        <View className=''>
                            <Text className='text-xs text-primary-900 '>Budget</Text>
                            <Text className='text-sm text-secoundry-100 mt-1 font-semibold'>{formatToMillionUSD(data?.budget ?? 0)}</Text>
                        </View>
                        <View className=''>
                            <Text className='text-xs text-primary-900'>Revenue</Text>
                            <Text className='text-sm text-secoundry-100 mt-1 font-semibold'>{formatToMillionUSD(data?.revenue ?? 0)}</Text>
                        </View>
                    </View>

                    <View className="mt-6">
                        <Text className='text-xs text-primary-900'>Tagline</Text>
                        <Text className='text-sm text-secoundry-100 mt-1 font-semibold'>{data?.tagline}</Text>

                    </View>

                    <View className="mt-6">
                        <Text className='text-xs text-primary-900'>Production Companies</Text>
                        <View className='flex-row mt-1 items-center flex-wrap'>
                            {data?.production_companies.map((ele, index) => (
                                <React.Fragment key={index}>
                                    <Text className="text-sm pb-1 font-semibold text-secoundry-100">{ele?.name}</Text>
                                    {index < data?.production_companies.length - 1 && (
                                        <Entypo
                                            name="dot-single"
                                            size={16}
                                            color="#9CA4AB"
                                            style={{ marginHorizontal: 2, paddingBottom: 4 }}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </View>

                        <TouchableOpacity
                            className="w-full mt-10 h-9 rounded-md overflow-hidden"
                            onPress={() => Linking.openURL(data?.homepage ?? "")}
                        >
                            <LinearGradient
                                colors={['#D6C7FF', '#AB8BFF']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <View className="flex-row items-center justify-center gap-1">
                                    <Text className="text-xs font-semibold text-black">Visit Homepage</Text>
                                    <AntDesign name="arrowright" size={10} color="#121212" />
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default MovieDetails