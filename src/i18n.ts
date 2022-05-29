import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      test_task_title: "Inomma Test Task",
      community: "Community",
      id: "ID",
      site_admin: "Site Admin",
      role: "Role",
      users_list: "Users List",
      add_to_community: "Add to Community",
      smth_went_wrong: "Something went wrong, please update the page",
      reset_all_checks: "Reset all checks",
      community_list: "Community List",
      delete: "delete",
      user_list_empty: "User list is empty",
      limit_of_community: "Sorry, limit of community 10 users",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
