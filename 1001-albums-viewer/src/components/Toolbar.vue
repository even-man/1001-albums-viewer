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

    </div>

</template>

<script setup>

import { ref, watch } from 'vue';
const emit = defineEmits(['filter-changed', 'filter-text-changed'])

const filterTypes = [
    'Album',
    'Artist',
    'Genre'
]

const filter = ref('Album');
const filterText = ref('');

watch(filter, () => {
    emit('filter-changed', filter.value);
})

watch(filterText, () => {
    emit('filter-text-changed', filterText.value);
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
}

label {
    margin: 5px;
    font-weight: 500;
    font-family: inherit;
}

select {}
</style>