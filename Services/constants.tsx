export const ReactQuaryOptions = {
    staleTime: 1000 * 60 * 10, // 10 minutes (data stays "fresh" for 10 min)
    cacheTime: 1000 * 60 * 60, // 1 hour (kept in cache even if unused)
    refetchOnMount: true, // refetch when screen mounts if stale
    refetchOnWindowFocus: false, // disable refetch when app goes foreground
}

export const GENRES: Record<number, string> = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
};

export function getGenreNameById(id: number) {
    return GENRES[id] || "Unknown";
}


