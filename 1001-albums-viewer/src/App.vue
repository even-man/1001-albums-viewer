<script setup>
import NavBar from './components/NavBar.vue';
import Toolbar from './components/Toolbar.vue';
import DataTable from './components/DataTable.vue';

import { ref } from 'vue'
import albums from './assets/albums.json'

const headers = [
  { text: "Name", value: "name" },
  { text: "Artist", value: "artist" },
  { text: "Average Rating", value: "averageRating" },
  { text: "Votes", value: "votes" },
  { text: "Controversial Score", value: "controversialScore" },
  { text: "Genres", value: "genres" },
]

const filter = ref('Album');
const filteredAlbums = ref([]);

function handleFilterChanged(newFilter) {
  filter.value = newFilter;
}

function handleFilterTextChanged(newFilterText) {
  if (filter.value === "Album") {
    filteredAlbums.value = albums.albums.filter(album => album.name.toLowerCase().includes(newFilterText.toLowerCase()))
  } else if (filter.value === "Artist") {
    filteredAlbums.value = albums.albums.filter(album => album.artist.toLowerCase().includes(newFilterText.toLowerCase()))
  } else if (filter.value === "Genre") {
    filteredAlbums.value = albums.albums.filter(album => album.genres.toString().toLowerCase().includes(newFilterText.toLowerCase()))
  }

  if (newFilterText === '') {
    filteredAlbums.value === []
  }

}

function visitLink() {
  window.open("https://1001albumsgenerator.com/", '_blank').focus();
}

</script>

<template>
  <NavBar />
  <div id="sign-up-here">
    <h3 @click="visitLink" class="rainbow rainbow_text_animated">JOIN 1001 ALBUMS HERE</h3>
  </div>
  <Toolbar @filter-changed="handleFilterChanged" @filter-text-changed="handleFilterTextChanged" />
  <DataTable :data="filteredAlbums.length === 0 ? albums.albums : filteredAlbums" :headers="headers" />

</template>


<style scoped>
#sign-up-here {
  display: flex;
  justify-content: center;
}

.rainbow {
  text-decoration: underline;
  /* font-size: 32px; */
  font-family: monospace;
  letter-spacing: 5px;
  align-self: center;
  margin-left: 1rem;
  cursor: pointer;
}

.rainbow_text_animated {
  background: linear-gradient(to right, #6666ff, #0099ff, #00ff00, #ff3399, #6666ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: rainbow_animation 6s ease-in-out infinite;
  background-size: 400% 100%;
}

@keyframes rainbow_animation {

  0%,
  100% {
    background-position: 0 0;
  }

  50% {
    background-position: 100% 0;
  }
}
</style>