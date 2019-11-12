import router from "../router";

/**
* Navigates back to previous page
*/
export function goBack() {
    router.go(-1);
}