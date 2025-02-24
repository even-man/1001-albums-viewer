<template>
    <div>
        <div class="d-flex">
            <v-expansion-panels>
                <v-expansion-panel
                    title="Filters"
                    color="primary"
                    elevation="0"
                    tile
                >
                    <v-expansion-panel-text>
                        <v-text-field v-model="filter" variant="underlined" class="mx-2 mt-2" label="Filter data"></v-text-field>
                        <div class="d-flex align-items-center">
                            <v-select v-model="genreFilter" multiple :disabled="showAllGenres" :items="genres" variant="underlined" class="mx-2 mt-2" label="Genres"></v-select>
                            <v-checkbox v-model="showAllGenres" label="Show All" ></v-checkbox>
                        </div>
                        
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
            <div class="mx-2 mt-1">
                <Stats :albums="albums"></Stats>
            </div>
            
        </div>
        
        <v-data-table :headers="headers"
                      :items="albums"
                      :search="filter">
            <template v-slot:item.controversialScore="{value}">
                {{ Math.round(value * 1000) / 1000 }}
            </template>
            <template v-slot:item.genres="{value}">
                <div class="genres">
                    <v-chip class="ma-1" size="small" label color="secondary" variant="flat" v-for="genre in value">{{ genre }}</v-chip>
                </div>
            </template>
                      
        </v-data-table>
    </div>
    
</template>

<script setup>
import { onMounted, ref } from 'vue';
import albumsFile from '../assets/albums.json'
import Stats from './Stats.vue';

const albums = ref([])
const filter = ref("");
const headers = [
  { title: "Name", key: "name" },
  { title: "Artist", key: "artist" },
  { title: "Average Rating", key: "averageRating" },
  { title: "Votes", key: "votes" },
  { title: "Controversial Score", key: "controversialScore" },
  { title: "Genres", key: "genres" },
]

const genres = ref([]);
const genreFilter = ref([]);
const showAllGenres = ref(true);

onMounted(() => {
    try {
        albums.value = albumsFile.albums;
        genres.value = []
        albums.value.forEach(album => {
            album.genres.forEach(genre => {
                if (!genres.value.includes(genre)) {
                    genres.value.push(genre);
                }
            })
        })
    } catch {
        console.error("Error loading albums data.");
    }
})


</script>

<style scoped>

.genres {
    display: flex;
}

</style>