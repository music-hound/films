
/* Экшены */

export const MENU_OPEN = 'MENU_OPEN';
export const CHANGE_THEME = 'CHANGE_THEME';
export const SWITCH_LANG = 'SWITCH_LANG';
export const SWITCH_DESC = 'SWITCH_DESC';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const CHANGE_YEAR = 'CHANGE_YEAR';
export const CHANGE_SORT = 'CHANGE_SORT';
export const CHANGE_GENRE = 'CHANGE_GENRE';
export const LOAD_FAVORITE = 'LOAD_FAVORITE';
export const USER_STATUS_CHANGE = 'USER_STATUS_CHANGE';
export const SEARCH_INPUT = 'SEARCH_INPUT';
export const RESET_FILTERS = 'RESET_FILTERS';

/* Генераторы экшенов */

export function resetFilters() {
    return { type: RESET_FILTERS }
}
export function switchTheme(isLight) {
    return { type: CHANGE_THEME, isLight }
}
export function menuOpen() {
    return { type: MENU_OPEN }
}
export function switchLang(lang) {
    return { type: SWITCH_LANG, lang }
}
export function switchDesc() {
    return { type: SWITCH_DESC }
}
export function changePage(page) {
    return { type: CHANGE_PAGE, page }
}
export function changeYear(year) {
    return { type: CHANGE_YEAR, year }
}
export function changeSort(sort) {
    return { type: CHANGE_SORT, sort }
}
export function changeGenre(genre) {
    return { type: CHANGE_GENRE, genre }
}
export function loadFavorite(favorite) {
    return { type: LOAD_FAVORITE, favorite }
}
export function userStatusChange(status) {
    return { type: USER_STATUS_CHANGE, status }
}
export function searchInput(input) {
    return { type: SEARCH_INPUT, input }
}