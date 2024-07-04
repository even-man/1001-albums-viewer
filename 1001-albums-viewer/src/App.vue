<script setup>
import NavBar from './components/NavBar.vue';
import Toolbar from './components/Toolbar.vue';
import DataTable from './components/DataTable.vue';

import { ref, onMounted } from 'vue'
import albumsFile from './assets/albums.json'

const headers = [
  { text: "Name", value: "name" },
  { text: "Artist", value: "artist" },
  { text: "Average Rating", value: "averageRating" },
  { text: "Votes", value: "votes" },
  { text: "Controversial Score", value: "controversialScore" },
  { text: "Genres", value: "genres" },
]

const filter = ref('Album');
const filterText = ref('');
const numericSort = ref({
  field: "None",
  ascending: false,
})
const filteredAlbums = ref([]);

function handleFilterChanged(newFilter) {
  filter.value = newFilter;
  doFilterSearch();
}

function handleFilterTextChanged(newFilterText) {
  filterText.value = newFilterText;
  doFilterSearch();
}

function handleNumericSort(newNumericSort) {
  numericSort.value = newNumericSort;
  console.log('app ', numericSort.value)
  doFilterSearch();
}

function doFilterSearch() {

  // no filter text, filtered ablums should be empty
  // no sorting, filtred albums should be empty
  // just display raw albums
  if (filterText.value === '' && numericSort.value.field === "None") {
    filteredAlbums.value = [];
    return;
  }

  const keyFilterNames = {
    "Album": "name",
    "Artist": "artist",
    "Genre": "genres",
  }
  const keyFilter = keyFilterNames[filter.value];

  filteredAlbums.value =
    albums.albums.filter(album => (keyFilter === "genres" ? album[keyFilter].join(" ") : album[keyFilter]).toLowerCase().includes(filterText.value.toLowerCase()));


  const keySortNames = {
    "Average Rating": "averageRating",
    "Votes": "votes",
    "Controversial Score": "controversialScore"
  }
  const sortKey = keySortNames[numericSort.value.field];

  filteredAlbums.value.sort((a, b) => {
    if (numericSort.value.ascending) return a[sortKey] - b[sortKey]
    return b[sortKey] - a[sortKey]
  })


}

function visitLink() {
  window.open("https://1001albumsgenerator.com/", '_blank').focus();
}

const albums = ref({ albums: [] })
const errors = ref('');

onMounted(async () => {
  try {

    errors.value = '';

    let url = process.env.NODE_ENV === "production" ? 'https://1001albumsfunction20240703203050.azurewebsites.net/api/getAlbums' : 'http://localhost:7168/api/GetAlbums'
    let apiResponse = await fetch(url)

    if (apiResponse.status !== 200) {
      throw new Error()
    }
    let albumsResponse = await apiResponse.json()

    // handle soft errors
    if (albumsResponse.hasErrors) {
      albumsResponse.errors.forEach(error => errors.value = errors.value + error + ' ');
      albums.value.albums = albumsFile.albums;
    } else {
      albums.value.albums = albumsResponse.albums;
    }




  } catch (ex) {
    console.log(ex);
    albums.value.albums = albumsFile.albums;
  }
})

</script>

<template>
  <NavBar />
  <div id="sign-up-here">
    <h3 @click="visitLink" class="rainbow rainbow_text_animated">JOIN 1001 ALBUMS HERE</h3>
  </div>
  <div style="color: red;" v-if="errors !== ''">
    {{ errors }}
  </div>
  <Toolbar @filter-changed="handleFilterChanged" @filter-text-changed="handleFilterTextChanged"
    @numeric-sort-changed="handleNumericSort" />
  <DataTable :data="filteredAlbums.length > 0 ? filteredAlbums : albums.albums" :headers="headers" />

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