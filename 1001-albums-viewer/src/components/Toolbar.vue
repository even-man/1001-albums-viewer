<template>

    <div id="toolbar">
        <div class="input-field">
            <label for="filterText">Filter</label>
            <input v-model="filterText" id="filterText" type="text" :placeholder="'Filter by '">
        </div>
        <div class="input-field">
            <label for="filter">Filter On</label>
            <select v-model="filter" id="filter">
                <option v-for="filter in filterTypes">{{ filter }}</option>
            </select>
        </div>
        <div class="input-field">
            <label for="sort">Sort On</label>
            <select v-model="numericSort.field" id="sort">
                <option v-for="filter in numericSorts">{{ filter.field }}</option>
            </select>
        </div>
        <div class="input-field">
            <label for="ascending">Ascending</label>
            <input :disabled="numericSort.field === 'None'" v-model="numericSort.ascending" type="checkbox">
        </div>
    </div>

</template>

<script setup>

import { ref, watch } from 'vue';
const emit = defineEmits(['filter-changed', 'filter-text-changed', 'numeric-sort-changed'])

const filterTypes = [
    'Album',
    'Artist',
    'Genre',
]

const numericSorts = [
    { field: 'None', ascending: false },
    { field: 'Average Rating', ascending: false },
    { field: 'Votes', ascending: false },
    { field: 'Controversial Score', ascending: false },
]

const filter = ref('Album');
const filterText = ref('');

const numericSort = ref({
    field: 'None',
    ascending: false,
})

watch(filter, () => {
    emit('filter-changed', filter.value);
})

watch(filterText, () => {
    emit('filter-text-changed', filterText.value);
})

watch(numericSort, () => {
    emit('numeric-sort-changed', numericSort.value);
})


</script>


<style scoped>
#toolbar {
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
}

.input-field {
    margin: 1rem;
    align-self: center;
}

label {
    margin: 5px;
    font-weight: 500;
    font-family: inherit;
}
</style>