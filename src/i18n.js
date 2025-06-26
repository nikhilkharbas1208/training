
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next) 
    .init({
        resources: {

            en: {
                translation: {
                    ticketid: "Ticket ID",
                    created: "Created",
                    title: "Title",
                    issue: "Issue",
                    summary: "Summary",
                    type: "Type",
                    status: "Status",
                    assignee: "Assignee",
                    priority: "Priority",
                    description: "Description",
                    back: "Back",
                    save: "Save",
                    delete: "Delete",
                    edit: "Edit",
                    create: "Create",
                    cancel: "Cancel",
                    jiraTicket: "Jira Ticket"
                }
            },
            hi: {
                translation: {
                    issue: "मुद्दा",
                    created: "बनाया गया",
                    
                    title: "शीर्षक",
                    summary: "सारांश",
                    type: "प्रकार",
                    status: "स्थिति",
                    assignee: "निर्धारित व्यक्ति",
                    priority: "प्राथमिकता",
                    description: "विवरण",
                    back: "वापस",
                    save: "सहेजें",
                    delete: "हटाएँ",
                    edit: "संपादित करें",
                    create: "बनाएँ",
                    cancel: "रद्द करें",
                    jiraTicket: "जीरा टिकट"
                }
            },
            mr: {
                translation: {
                    ticketid: "तिकीट आयडी",
                    created: "तयार केले",
                    title: "शीर्षक",
                    issue: "समस्या",
                    summary: "सारांश",
                    type: "प्रकार",
                    status: "स्थिती",
                    assignee: "प्रत्यायोजित",
                    priority: "प्राथमिकता",
                    description: "वर्णन",
                    back: "मागे",
                    save: "जतन करा",
                    delete: "हटवा",
                    edit: "संपादित करा",
                    create: "तयार करा",
                    cancel: "रद्द करा",
                    jiraTicket: "जीरा तिकीट"
                }
            },
            fr: {
                translation: {
                    issue: "Problème",
                    created: "Créé",
                    title: "Titre",
                    summary: "Résumé",
                    type: "Type",
                    status: "Statut",
                    assignee: "Assigné à",
                    priority: "Priorité",
                    description: "Description",
                    back: "Retour",
                    save: "Sauvegarder",
                    delete: "Supprimer",
                    edit: "Modifier",
                    create: "Créer",
                    cancel: "Annuler",
                    jiraTicket: "Ticket Jira"
                }
            }

        },
        lng: 'en',
        fallbackLng: 'en',
        
    });

export default i18n;



