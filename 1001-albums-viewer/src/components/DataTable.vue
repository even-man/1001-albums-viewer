<template>
    <div id="data-table">
        <EasyDataTable table-class-name="customize-table" :headers="headers" :items="props.data" theme-color="#242424">
            <template #item-controversialScore="item">
                {{ Math.round(item.controversialScore * 1000) / 1000 }}
            </template>

            <template #item-genres="item">
                <span v-for="genre in item.genres">{{ genre + ' ' }}</span>
            </template>
        </EasyDataTable>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    headers: Array,
    data: Array
})

const headers = ref(props.headers);

</script>

<style scoped>
#data-table {
    margin-bottom: 5rem;
}

.customize-table {
    --easy-table-border: 1px solid #445269;
    --easy-table-row-border: 1px solid #445269;

    --easy-table-header-font-size: 14px;
    --easy-table-header-height: 50px;
    --easy-table-header-font-color: #c1cad4;
    --easy-table-header-background-color: #646cff;

    --easy-table-header-item-padding: 10px 15px;

    --easy-table-body-even-row-font-color: #fff;
    --easy-table-body-even-row-background-color: #4c5d7a;

    --easy-table-body-row-font-color: #c0c7d2;
    --easy-table-body-row-background-color: #3f3e3e;
    --easy-table-body-row-height: 50px;
    --easy-table-body-row-font-size: 14px;

    --easy-table-body-row-hover-font-color: #2d3a4f;
    --easy-table-body-row-hover-background-color: #eee;

    --easy-table-body-item-padding: 10px 15px;

    --easy-table-footer-background-color: #646cff;
    --easy-table-footer-font-color: #c0c7d2;
    --easy-table-footer-font-size: 14px;
    --easy-table-footer-padding: 0px 10px;
    --easy-table-footer-height: 50px;

    --easy-table-rows-per-page-selector-width: 70px;
    --easy-table-rows-per-page-selector-option-padding: 10px;
    --easy-table-rows-per-page-selector-z-index: 1;


    --easy-table-scrollbar-track-color: #2d3a4f;
    --easy-table-scrollbar-color: #2d3a4f;
    --easy-table-scrollbar-thumb-color: #4c5d7a;
    ;
    --easy-table-scrollbar-corner-color: #2d3a4f;

    --easy-table-loading-mask-background-color: #2d3a4f;
}

span {
    background-color: #646cff;
    border-radius: 1rem;
    margin: 5px;
    padding: 4px;
}
</style>
