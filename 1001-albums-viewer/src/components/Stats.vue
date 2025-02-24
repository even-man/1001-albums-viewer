<template>

    <v-btn @click="openStats = true" append-icon="mdi-chart-bar" color="primary" variant="flat" tile>Stats</v-btn>
    <v-dialog scrollable v-model="openStats" height="100%">
        <v-card flat tile>
            <v-card-title class="d-flex">
                <div>Album Stats</div> 
                <v-spacer></v-spacer>
                <v-icon @click="openStats = false">mdi-close</v-icon>
            </v-card-title>
            <v-card-text>
                <v-tabs v-model="tabSelection">
                    <v-tab color="secondary" value="General">General</v-tab>
                    <v-tab color="secondary" value="Genre">Genre</v-tab>
                    <v-tab color="secondary" value="Artist">Artist</v-tab>
                </v-tabs>
                <v-tabs-window v-model="tabSelection">
                    <v-tabs-window-item value="General">
                        <v-table>
                            <thead>
                                <tr>
                                    <th>Stat</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="key in Object.keys(stats.general)">
                                    <td>{{ key }}</td>
                                    <td>{{stats.general[key]}}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-tabs-window-item>
                    <v-tabs-window-item value="Genre">
                        <v-table>
                            <thead>
                                <tr>
                                    <th>Genre</th>
                                    <th>Album Count</th>
                                    <th>Avg. Controversial Score</th>
                                    <th>Avg. Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="genre in Object.keys(stats.genre)">
                                    <td>{{ genre }}</td>
                                    <td>{{stats.genre[genre]["albumCount"]}}</td>
                                    <td>{{stats.genre[genre]["averageControversialScore"]}}</td>
                                    <td>{{stats.genre[genre]["averageRating"]}}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-tabs-window-item>
                    <v-tabs-window-item value="Artist">
                        Coming Soon...
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card-text>
        </v-card>
    </v-dialog>


</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    albums: Array,
})
const openStats = ref(false);
const tabSelection = ref("General");

const stats = computed(() => {
    let stats = {
        general: {
            "Album Count": 0,
            "Average Rating": 0,
            "Average Controversial Score": 0,
            "Total Votes": 0,
        },
        genre: {
            // load in genre counts here
        },
        artist: {
            "Coming Soon...": ""
        }
    }

    let ratingsSum = 0;
    let controversialSum = 0;

    props.albums.forEach((album) => {
        // General stats
        stats.general["Album Count"]++;
        ratingsSum += album.averageRating
        controversialSum += album.controversialScore
        stats.general["Total Votes"] += album.votes

        album.genres.forEach(genre => {
            if (stats.genre.hasOwnProperty(genre)) {
                stats.genre[genre].albumCount++;
                stats.genre[genre].averageRating += album.averageRating;
                stats.genre[genre].averageControversialScore += album.controversialScore;
            } else {
                stats.genre[genre] = {}
                stats.genre[genre].albumCount = 1;
                stats.genre[genre].averageRating = album.averageRating;
                stats.genre[genre].averageControversialScore = album.controversialScore;
            }
        })

    })

    stats.general["Average Rating"] = Math.round((ratingsSum / props.albums.length) * 1000) / 1000;
    stats.general["Average Controversial Score"] = Math.round((controversialSum / props.albums.length) * 1000) / 1000;

    Object.keys(stats.genre).forEach((genre) => {
        stats.genre[genre].averageRating = Math.round(stats.genre[genre].averageRating / stats.genre[genre].albumCount * 100) / 100
        stats.genre[genre].averageControversialScore = Math.round(stats.genre[genre].averageControversialScore / stats.genre[genre].albumCount * 100) / 100
    })
    console.log(stats);
    return stats
})


</script>

<style scoped>

</style>