<template>
    <v-app id="inspire">
        <v-navigation-drawer
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        fixed
        app
        width="200"
        >
        <v-list dense>
            <template v-for="item in items">
                <v-layout
                v-if="item.heading"
                :key="item.heading"
                row
                align-center
                >
                <v-flex xs6>
                    <v-subheader v-if="item.heading">
                        {{ item.heading }}
                    </v-subheader>
                </v-flex>
                <v-flex xs6 class="text-xs-center">
                    <a href="#!" class="body-2 black--text">EDIT</a>
                </v-flex>
            </v-layout>
            <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
            >
            <v-list-tile slot="activator">
                <v-list-tile-content>
                    <v-list-tile-title>
                        {{ item.text }}
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
            v-for="(child, i) in item.children"
            :key="i"
            @click="link_to(child.path)"
            >
            <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>
                    {{ child.text }}
                </v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list-group>
    <v-list-tile v-else :key="item.text" @click="link_to(item.path)">
        <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
            <v-list-tile-title>
                {{ item.text }}
            </v-list-tile-title>
        </v-list-tile-content>
    </v-list-tile>
</template>
</v-list>
</v-navigation-drawer>

<v-toolbar
:clipped-left="$vuetify.breakpoint.lgAndUp"
color="#002c4c"
dark
app
fixed
>
<v-toolbar-title style="width: 300px" class="ml-0 pl-0">
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <span class="hidden-sm-and-down"><router-link to="/">App Name</router-link></span>
</v-toolbar-title>
<v-spacer></v-spacer>

<!-- header icons -->
<!-- <v-btn icon>
<v-icon>apps</v-icon>
</v-btn>
<v-btn icon>
<v-icon>notifications</v-icon>
</v-btn> -->

</v-toolbar>

<v-content>
    <v-container fluid ma-0 pa-10>
        <router-view></router-view>
    </v-container>
</v-content>

</v-app>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        drawer: null,
        items: [
            {
                icon: 'contacts',
                text: '顧客情報',
                path: '/customers'
            },
            { icon: 'list_alt', text: 'メモ', path: '/memos' },
            {
                icon: 'keyboard_arrow_up',
                'icon-alt': 'keyboard_arrow_down',
                text: 'More',
                model: false,
                children: [
                    { text: 'Import', path: '/' },
                    { text: 'Export', path: '/' },
                    { text: 'Print', path: '/' },
                    { text: 'Undo changes', path: '/' },
                    { text: 'Other contacts', path: '/' }
                ]
            },
            { icon: 'settings', text: '設定', path: '/settings' },
        ]
    }),
    props: {
        source: String
    },
    methods: {
        link_to(path) {
            this.$router.push(path)
        }
    }
}
</script>

<style lang="scss">
.theme--light.application {
    background: #FFF!important;
}
.theme--light.v-navigation-drawer {
    background-color: #fafafa!important;
}
.v-toolbar__title {
    a {
        text-decoration: none;
        color: #FFF;
    }
}
.dt-group {
    padding-bottom: 10px;
    .v-text-field__details {
        display: none!important;
    }
    .v-btn {
        margin-left: 0!important;
    }
}
.dt-input-group {
    margin-bottom: 10px;
}
/**
 * h
 */
.h-1 {
    margin-bottom: 10px;
}
.h-2 {
    margin-bottom: 15px;
}
/**
 * table
 */
table {
    border-spacing: 0;
    border-collapse: collapse;
}
.table-1 {
    width: 100%;
    th, td {
        padding: 5px;
        text-align: left;
        vertical-align: top;
        border-top: 1px solid #ddd;
    }
    th {
        width: 120px;
    }
}
.table-striped {
    tr:nth-child(even) {
        background-color: #FFF;
    }
}
/**
 * btn
 */
.btn-add {
    background-color: #2196f3 !important;
    border-color: #2196f3 !important;
    color: #FFF!important;
}
.btn-save {
    background-color: #2196f3 !important;
    border-color: #2196f3 !important;
    color: #FFF!important;
}
.btn-edit {
    background-color: #4caf50!important;
    border-color: #4caf50!important;
    color: #FFF!important;
}
/**
 * view
 */
.view-btn-group {
    padding-bottom: 25px;
    .v-btn {
        margin-left: 0;
    }
}
/**
 * form
 */
form {
    .submit-area {
        margin-top: 25px;
        .v-btn {
            margin-left: 0;
        }
    }
}
</style>
