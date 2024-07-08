<!-- messy messy messy -->

<template>

    <input @click="openDialog()" id="open-dialog" type="submit" value="View Stats"></input>

    <dialog id="stats-dialog">
        <div style="display: flex;">
            <h2>1001 Albums Stats</h2>
            <select v-model="statsOption" class="dropdown">
                <option v-for="dropdownOption in Object.keys(dropdownOptions)">{{ dropdownOption }}</option>
            </select>
            <div class="close-dialog">
                <input @click="closeDialog()" id="open-dialog" type="submit" value="Close"></input>
            </div>
        </div>

        <div v-for="stat in Object.keys(stats[dropdownOptions[statsOption]])" class="stat-row">
            <!-- dont use a table ඞ -->
            <div v-if="statsOption !== 'Genre'">
                <div class="stat-header">{{ stat }}</div>
                <div class="stat-value">{{ stats[dropdownOptions[statsOption]][stat] }}</div>
            </div>
        </div>

        <div v-if="statsOption === 'Genre'">
            <div v-if="statsOption === 'Genre'">
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>Genre</th>
                            <th>Count</th>
                            <th>Rating</th>
                            <th>Controversial Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="genre in Object.keys(stats.genre)">
                            <td>{{ genre }}</td>
                            <td v-for="header in Object.keys(stats.genre[genre])">{{ stats.genre[genre][header] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>



    </dialog>

</template>

<script setup>
import { defineProps, ref, computed } from 'vue';

// PROPS
const props = defineProps({
    albums: Array,
})

// STATS SELECT
const statsOption = ref('General');
const dropdownOptions = {
    'General': 'general',
    'Genre': 'genre',
    'Artist': 'artist',
}

// COMPUTED FROM PROP
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

    return stats
})


// DIALOG CONTROLS
function openDialog() {
    document.getElementById('stats-dialog').showModal();
}
function closeDialog() {
    document.getElementById('stats-dialog').close();
}

</script>


<style scoped>
.stat-row {
    display: block;
    align-items: center;
}

.stat-header {
    font-weight: bold;
}

.stat-value {
    font-style: italic;
    color: aqua;
}

.dropdown {
    margin-left: auto;
    height: 40%;
    align-self: center;
}

dialog::backdrop {
    background: rgba(255, 255, 255, 0.25);
}

#stats-dialog {
    border-radius: 1rem;
    min-width: 40%;
    background-color: #242424;
    min-height: 35%;
    height: 35%;
    overflow-y: scroll;
    position: relative;
}

.close-dialog {
    justify-content: end;
    align-self: center;
    height: 40%;
    margin-left: 1rem;
    ;
}

.styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
    background-color: #646cff;
    color: #ffffff;
    text-align: left;
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
}

.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #646cff;
}

.styled-table tbody tr.active-row {
    font-weight: bold;
    color: #646cff;
}
</style>