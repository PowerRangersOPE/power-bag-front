<template>
<q-layout view="lHh Lpr lFf" class="bg-white">
    <component-nav />
    <q-page-container class="q-ma-xl" style="max-width: 1400px;">
        <router-view />
    </q-page-container>
    <div class="row">
        <component-footer />
    </div>
</q-layout>
</template>

<script src="./Index.js">
