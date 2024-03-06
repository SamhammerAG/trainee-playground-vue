import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "@/styles/v-show.scss";
import "@/styles/v-input.scss";

import { createVuetify } from "vuetify";
import dateAdapter from "@/plugins/DateAdapter";
import i18n from "@/i18n";
import { de, en } from "vuetify/locale";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    date: {
        adapter: dateAdapter
    },
    locale: {
        messages: { de: de, en: en },
        locale: i18n.global.locale.value
    },
    theme: {
        defaultTheme: "light",
        // https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/composables/theme.ts#L128
        themes: {
            light: {
                colors: {
                    primary: "#303A4E",
                    "primary-lighten-1": "#636B7A",
                    "primary-lighten-2": "#969BA5",
                    "primary-lighten-3": "#E4E5E8",
                    secondary: "#8098A7",
                    "secondary-lighten-1": "#9FB1BD",
                    "secondary-lighten-2": "#BFCBD2",
                    "secondary-lighten-3": "#DEE4E8",
                    "secondary-lighten-4": "#F2F5F6",
                    tertiary: "#599B8B",
                    "tertiary-lighten-1": "#82B4A8",
                    "tertiary-lighten-2": "#ABCCC4",
                    "tertiary-lighten-3": "#D4E5E1",
                    background: "#F9FAFC",
                    surface: "#FFFFFF",
                    "on-surface": "#1C1C1C",
                    error: "#E52727",
                    "error-lighten-1": "#DCBABA",
                    warning: "#DC8B22",
                    "warning-lighten-1": "#E2D4C1",
                    success: "#7D9E39",
                    "success-lighten-1": "#D7E1C2",
                    info: "#2196F3",
                    // Don't use the workflow colors anywhere
                    // they are just for the workflow nodes
                    workflow: "#3b5381",
                    "workflow-lighten-1": "#8c9dbb"
                },
                variables: {
                    "border-color": "#000000"
                }
            }
        }
    },
    defaults: {
        VSnackbar: {
            timeout: 5000,
            color: "info",
            location: "bottom right"
        },
        VBanner: {
            style: "flex: unset",
            rounded: true,
            border: true,
            elevation: 1
        },
        VSwitch: {
            color: "primary",
            hideDetails: "auto"
        },
        VTextField: {
            variant: "outlined",
            hideDetails: "auto",
            persistentPlaceholder: true
        },
        VSelect: {
            variant: "outlined",
            hideDetails: "auto",
            persistentPlaceholder: true
        },
        VCombobox: {
            variant: "outlined",
            hideDetails: "auto",
            persistentPlaceholder: true
        },
        VAutocomplete: {
            variant: "outlined",
            autoSelectFirst: true,
            hideDetails: "auto",
            persistentPlaceholder: true
        },
        VTextarea: {
            variant: "outlined",
            hideDetails: "auto",
            persistentPlaceholder: true
        },
        VField: {
            variant: "outlined"
        },
        VTable: {
            VPagination: {
                density: "comfortable",
                showFirstLastPage: true,
                totalVisible: 6
            }
        },
        VDataTable: {
            density: "comfortable",
            hover: true
        },
        VDataTableServer: {
            density: "comfortable",
            hover: true
        },
        VChip: {
            color: "primary",
            variant: "elevated"
        },
        VCard: {
            class: "d-flex flex-column",

            VCardTitle: {
                class: "text-medium-emphasis font-weight-light d-flex align-center"
            }
        },
        VNavigationDrawer: {
            class: "elevation-1",
            railWidth: "72",
            width: "210",
            rounded: true,

            VListItem: {
                rounded: true,
                class: "mx-3 px-3 my-1",
                VListItemTitle: {
                    class: "ml-1 text-caption"
                }
            }
        },
        VProgressCircular: {
            size: 20
        },
        VProgressLinear: {
            height: 2,
            color: "secondary"
        },
        VTabs: {
            density: "compact",
            color: "primary",

            VTab: {
                class: "font-weight-bold px-2"
            }
        },
        VExpansionPanel: {
            VExpansionPanelText: {
                class: "pt-2"
            }
        }
    }
});
