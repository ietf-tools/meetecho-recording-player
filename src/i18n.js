import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: false,
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          str_fetchAborted: "the fetch was aborted",
          str_notFetchingData: "Could not fetch the data",
          str_loading: "Loading",
          str_chat: "Chat",
          str_lightTheme: "Light Theme",
          str_darkTheme: "Dark Theme",
          str_themeIcon: "dark/light toggle icon",
          str_showPanels: "Show Panels",
          str_showChat: "Show Chat",
          str_panelChatToggleIcon: "panel/chat toggle icon",
          str_date: "Date",
          str_pollStartTime: "Go to Poll Start Time",
          str_goTo: "Go to",
          str_pollsUnavailable: "Polls not available",
          str_raise: "Raised Hands",
          str_doNotRaise: "Not Raised Hands",
          str_yes: "Yes",
          str_no: "No",
          str_noOpinion: "No Opinion",
          str_transcriptsUnavailable: "Transcripts not available",
          str_totalParticipants: "Total Participants",
        },
      },
    },
  });