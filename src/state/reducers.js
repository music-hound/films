import { combineReducers } from "@reduxjs/toolkit";
import { CHANGE_GENRE, CHANGE_PAGE, CHANGE_SORT, CHANGE_THEME, CHANGE_YEAR, LOAD_FAVORITE, MENU_OPEN, RESET_FILTERS, SEARCH_INPUT, SWITCH_DESC, SWITCH_LANG, USER_STATUS_CHANGE, } from "./actions";

const deviceTheme = window.matchMedia('(prefers-color-scheme:light)').matches
function isLight(state=deviceTheme, action){
    switch (action.type) {
        case CHANGE_THEME:
            return !action.isLight
        default:
            return state
    }
}
function menuIsOpen(state=true, action){
    switch (action.type) {
        case MENU_OPEN:
            return !state
        default:
            return state
    }
}
function switchLang(state='ru', action){
    switch (action.type) {
        case SWITCH_LANG:
            return action.lang
        default:
            return state
    }
}
function switchDesc(state=true, action){
    switch (action.type) {
        case RESET_FILTERS:
            return true
        case SWITCH_DESC:
            return !state
        default:
            return state
    }
}
function changePage(state=1, action){
    switch (action.type) {
        case RESET_FILTERS:
            return 1
        case CHANGE_PAGE:
            return action.page
        default:
            return state
    }
}

export const yearMax = 2050;
export const yearMin = 1950;
function changeYear(state=[yearMin,yearMax], action){
    switch (action.type) {
        case RESET_FILTERS:
            return [yearMin,yearMax]
        case CHANGE_YEAR:
            return action.year
        default:
            return state
    }
}
function changeSort(state='popular', action){
    switch (action.type) {
        case RESET_FILTERS:
            return 'popular'
        case CHANGE_SORT:
            return action.sort
        default:
            return state
    }
}
function changeGenre(state=[], action){
    switch (action.type) {
        case RESET_FILTERS:
            return []
        case CHANGE_GENRE:
            return action.genre
        default:
            return state
    }
}
function loadFavorite(state=[], action){
    switch (action.type) {
        case LOAD_FAVORITE:
            return action.favorite
        default:
            return state
    }
}
function userStatusChange(state='logged_out', action){
    switch (action.type) {
        case USER_STATUS_CHANGE:
            return action.status
        default:
            return state
    }
}
function searchInput(state='', action){
    switch (action.type) {
        case RESET_FILTERS:
            return ''
        case SEARCH_INPUT:
            return action.input
        default:
            return state
    }
}

const reducer = combineReducers({
    isLight,
    menuIsOpen,
    switchLang,
    switchDesc,
    changePage,
    changeYear,
    changeSort,
    changeGenre,
    loadFavorite,
    userStatusChange,
    searchInput,
  });
  
  export default reducer;